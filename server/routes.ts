import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { insertPhotoSchema, insertDonationSchema } from "@shared/schema";

const upload = multer();

export function registerRoutes(app: Express): Server {
  app.get("/api/photos", async (req, res) => {
    const photos = await storage.getPhotos();
    res.json(photos);
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

    const donation = await storage.addDonation(parsed.data);
    res.json(donation);
  });

  app.get("/api/trustees", async (req, res) => {
    const trustees = await storage.getTrustees();
    res.json(trustees);
  });

  const httpServer = createServer(app);
  return httpServer;
}
