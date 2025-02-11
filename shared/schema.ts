
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageData: text("image_data").notNull(),
  date: text("date").notNull(),
});

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  amount: integer("amount").notNull(),
  paymentId: text("payment_id").notNull(),
  date: text("date").notNull(),
});

export const trustees = pgTable("trustees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  passwordHash: text("password_hash").notNull(),
});

export const insertPhotoSchema = createInsertSchema(photos).omit({ id: true });
export const insertDonationSchema = createInsertSchema(donations).omit({ id: true });
export const insertTrusteeSchema = createInsertSchema(trustees).omit({ id: true });

export type InsertPhoto = z.infer<typeof insertPhotoSchema>;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type InsertTrustee = z.infer<typeof insertTrusteeSchema>;

export type Photo = typeof photos.$inferSelect;
export type Donation = typeof donations.$inferSelect;
export type Trustee = typeof trustees.$inferSelect;
