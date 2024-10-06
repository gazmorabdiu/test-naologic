import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor } from 'src/utils/interfaces';
import { faker } from '@faker-js/faker';

@Injectable()
export class VendorService {
  constructor(@InjectModel('Vendor') private vendorModel: Model<Vendor>) {}

  async getRandomVendors(limit: number) {
    return this.vendorModel.aggregate([
      { $sample: { size: limit } }, // Fetch 'limit' number of random vendors
    ]);
  }

  // Function to generate 100 random vendors
  async createRandomVendors(): Promise<any> {
    const vendors = [];

    for (let i = 0; i < 100; i++) {
      const vendor = new this.vendorModel({
        name: faker.company.name(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        address: faker.location.streetAddress(),
      });
      vendors.push(vendor);
    }

    return this.vendorModel.insertMany(vendors); // Bulk insert the vendors into the database
  }
}
