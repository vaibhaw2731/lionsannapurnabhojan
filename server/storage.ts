import { type Photo, type InsertPhoto, type Donation, type InsertDonation, type Trustee, type InsertTrustee } from "@shared/schema";

export interface IStorage {
  getPhotos(): Promise<Photo[]>;
  addPhoto(photo: InsertPhoto): Promise<Photo>;
  getDonations(): Promise<Donation[]>;
  addDonation(donation: InsertDonation): Promise<Donation>;
  getTrustees(): Promise<Trustee[]>;
  addTrustee(trustee: InsertTrustee): Promise<Trustee>;
}

export class MemStorage implements IStorage {
  private photos: Map<number, Photo>;
  private donations: Map<number, Donation>;
  private trustees: Map<number, Trustee>;
  private currentPhotoId: number;
  private currentDonationId: number;
  private currentTrusteeId: number;

  constructor() {
    this.photos = new Map();
    this.donations = new Map();
    this.trustees = new Map();
    this.currentPhotoId = 1;
    this.currentDonationId = 1;
    this.currentTrusteeId = 1;

    // Add initial trustees
    this.addTrustee({
      name: "John Smith",
      role: "Chairman",
      bio: "20+ years of experience in social service",
      imageUrl: "https://images.unsplash.com/photo-1576558656222-ba66febe3dec"
    });
    this.addTrustee({
      name: "Sarah Johnson",
      role: "Secretary",
      bio: "Former NGO director with passion for helping others",
      imageUrl: "https://images.unsplash.com/photo-1554774853-b415df9eeb92"
    });
  }

  async getPhotos(): Promise<Photo[]> {
    return Array.from(this.photos.values());
  }

  async addPhoto(photo: InsertPhoto): Promise<Photo> {
    const id = this.currentPhotoId++;
    const newPhoto = { ...photo, id };
    this.photos.set(id, newPhoto);
    return newPhoto;
  }

  async getDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values());
  }

  async addDonation(donation: InsertDonation): Promise<Donation> {
    const id = this.currentDonationId++;
    const newDonation = { ...donation, id };
    this.donations.set(id, newDonation);
    return newDonation;
  }

  async getTrustees(): Promise<Trustee[]> {
    return Array.from(this.trustees.values());
  }

  async addTrustee(trustee: InsertTrustee): Promise<Trustee> {
    const id = this.currentTrusteeId++;
    const newTrustee = { ...trustee, id };
    this.trustees.set(id, newTrustee);
    return newTrustee;
  }
}

export const storage = new MemStorage();
