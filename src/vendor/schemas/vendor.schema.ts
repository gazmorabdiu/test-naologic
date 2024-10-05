import { Schema, Types } from 'mongoose';

export const VendorSchema = new Schema({
  _id: { type: Types.ObjectId, auto: true }, // Explicitly adding the _id field
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
