import { Schema } from 'mongoose';
import { Manufacturer } from 'src/utils/interfaces';

export const ManufacturerSchema = new Schema<Manufacturer>({
  manufacturerId: { type: String, required: true },
  manufacturerCode: { type: String, default: '' },
  manufacturerName: { type: String, default: '' },
  manufacturerItemCode: { type: String, default: '' },
});
