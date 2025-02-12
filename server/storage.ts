
import type { InsertPhoto, InsertDonation, InsertTrustee, Photo, Donation, Trustee } from '../shared/schema';

// In-memory storage
const photos: Photo[] = [];
const donations: Donation[] = [];
const trustees: Trustee[] = [];
const users = [{ username: 'admin', passwordHash: '$2a$10$zPzE9zKRU8P1mLbq5yCG4.HUu0XF0h8GiDR6qiTc6lHmhAyGmxuku' }];

export class Storage {
  async getPhotos(): Promise<Photo[]> {
    return photos;
  }

  async addPhoto(photo: InsertPhoto): Promise<Photo> {
    const newPhoto = { id: photos.length + 1, ...photo };
    photos.push(newPhoto);
    return newPhoto;
  }

  async getDonations(): Promise<Donation[]> {
    return donations;
  }

  async addDonation(donation: InsertDonation): Promise<Donation> {
    const newDonation = { id: donations.length + 1, ...donation };
    donations.push(newDonation);
    return newDonation;
  }

  async getTrustees(): Promise<Trustee[]> {
    return trustees;
  }

  async addTrustee(trustee: InsertTrustee): Promise<Trustee> {
    const newTrustee = { id: trustees.length + 1, ...trustee };
    trustees.push(newTrustee);
    return newTrustee;
  }

  async validateCredentials(username: string, passwordHash: string): Promise<boolean> {
    const user = users.find(u => u.username === username);
    return user?.passwordHash === passwordHash;
  }
}

export const storage = new Storage();
