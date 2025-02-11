
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import crypto from "crypto";
import multer from "multer";
import bcrypt from "bcryptjs";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "$2a$10$zPzE9zKRU8P1mLbq5yCG4.HUu0XF0h8GiDR6qiTc6lHmhAyGmxuku"; // default: admin123
import { insertPhotoSchema, insertDonationSchema } from "@shared/schema";
import express from "express";
import { requireAuth } from "./auth";

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || "your_webhook_secret";
const upload = multer();

export function registerRoutes(app: Express): Server {
  app.get("/api/photos", async (req, res) => {
    const photos = await storage.getPhotos();
    res.json(photos);
  });

  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    
    if (username !== ADMIN_USERNAME) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Logged in successfully" });
  });

  app.post("/api/photos", upload.single("photo"), async (req, res) => {
    const { title, date } = req.body;
    const imageData = req.file?.buffer.toString("base64");
    
    if (!imageData) {
      return res.status(400).json({ message: "No photo uploaded" });
    }

    const photo = await storage.addPhoto({ title, imageData, date });
    res.json(photo);
  });

  app.get("/api/donations", async (req, res) => {
    const donations = await storage.getDonations();
    res.json(donations);
  });

  app.post("/api/donations", async (req, res) => {
    const parsed = insertDonationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid donation data" });
    }

    try {
      const donation = await storage.addDonation(parsed.data);
      
      if (parsed.data.email) {
        try {
          await sendThankYouEmail(parsed.data.name, parsed.data.email);
        } catch (error) {
          console.error('Failed to send email:', error);
          // Continue with the donation even if email fails
        }
      }
      
      res.json(donation);
    } catch (error) {
      res.status(500).json({ message: "Failed to process donation" });
    }
  });

  app.post("/api/razorpay-webhook", express.raw({ type: 'application/json' }), async (req, res) => {
    const shasum = crypto.createHmac("sha256", RAZORPAY_WEBHOOK_SECRET);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    const razorpaySignature = req.headers["x-razorpay-signature"];

    if (digest === razorpaySignature) {
      const payment = req.body.payload.payment.entity;
      
      if (payment.status === "captured") {
        const donation = {
          amount: payment.amount / 100,
          paymentId: payment.id,
          name: payment.notes?.name || "Anonymous",
          date: new Date().toISOString()
        };

        await storage.addDonation(donation);
        res.json({ status: "success" });
      }
    } else {
      res.status(400).json({ error: "Invalid signature" });
    }
  });

  app.get("/api/trustees", async (req, res) => {
    const trustees = await storage.getTrustees();
    res.json(trustees);
  });

  const httpServer = createServer(app);
  return httpServer;
}
