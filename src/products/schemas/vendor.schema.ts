import { Schema } from 'mongoose';
import { Vendor } from 'src/utils/interfaces';

export const VendorSchema = new Schema<Vendor>({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  address: { type: String, default: '' },
  createdAt: { type: Date, default: new Date() },
});
