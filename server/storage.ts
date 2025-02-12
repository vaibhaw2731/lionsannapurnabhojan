import { type Photo, type InsertPhoto, type Donation, type InsertDonation, type Trustee, type InsertTrustee } from "@shared/schema";
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { photos, donations, trustees, users } from '../shared/schema';
import type { InsertPhoto, InsertDonation, InsertTrustee, Photo, Donation, Trustee } from '../shared/schema';
import { eq } from 'drizzle-orm';

const poolUrl = process.env.DATABASE_URL?.replace('.us-east-2', '-pooler.us-east-2');
const pool = new Pool({ 
  connectionString: poolUrl,
  max: 10 
});
const db = drizzle(pool);

export class Storage {
  async getPhotos(): Promise<Photo[]> {
    return db.select().from(photos).orderBy(photos.date);
  }

  async addPhoto(photo: InsertPhoto): Promise<Photo> {
    const [newPhoto] = await db.insert(photos).values(photo).returning();
    return newPhoto;
  }

  async getDonations(): Promise<Donation[]> {
    return db.select().from(donations).orderBy(donations.date);
  }

  async addDonation(donation: InsertDonation): Promise<Donation> {
    const [newDonation] = await db.insert(donations).values(donation).returning();
    return newDonation;
  }

  async getTrustees(): Promise<Trustee[]> {
    return db.select().from(trustees);
  }

  async addTrustee(trustee: InsertTrustee): Promise<Trustee> {
    const [newTrustee] = await db.insert(trustees).values(trustee).returning();
    return newTrustee;
  }

  async validateCredentials(username: string, passwordHash: string): Promise<boolean> {
    const user = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return user.length > 0 && user[0].passwordHash === passwordHash;
  }
}

export const storage = new Storage();