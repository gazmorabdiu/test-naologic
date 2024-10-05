import { Document, Types } from 'mongoose';

export interface Vendor extends Document {
  _id: Types.ObjectId; // Include _id in the interface
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: Date;
}
