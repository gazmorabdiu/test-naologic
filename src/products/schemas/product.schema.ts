import { Schema, Types } from 'mongoose';
import { Product } from 'src/utils/interfaces';
import mongoose from 'mongoose';
import { CategorySchema } from './category.schema';
import { ManufacturerSchema } from './manufacturer.schema';
import { ItemSchema } from './item.schema';

// const ProductSchema = new Schema<Product>({
//   id: { type: Types.ObjectId, auto: true },
//   docId: { type: String, required: true },
//   data: DataSchema,
//   immutable: { type: Boolean, required: true },
//   deploymentId: { type: String, required: true },
//   docType: { type: String, required: true },
//   namespace: { type: String, required: true },
//   companyId: { type: String, required: true },
//   status: { type: String, required: true },
//   info: InfoSchema,
// });

export const ProductSchema = new Schema<Product>({
  productId: { type: String, required: true }, // Custom ID
  productName: { type: String, default: '' },
  productDescription: { type: String, default: '' },

  // Embedding Category and Manufacturer schemas
  category: { type: Types.ObjectId, ref: 'Category', required: true },
  manufacturer: { type: Types.ObjectId, ref: 'Manufacturer', required: true },
  item: { type: Types.ObjectId, ref: 'Item', required: true },
  vendor: { type: Types.ObjectId, ref: 'Vendor', required: true },
  itemDescription: { type: String, default: '' },
  imageFileName: { type: String, default: '' },
  itemImageURL: { type: String, default: '' },
  nDCItemCode: { type: String, default: '' },
  pKG: { type: String, default: '' },
  unitPrice: { type: Number, default: 0 },
  quantityOnHand: { type: Number, default: 0 },
  priceDescription: { type: String, default: '' },
  availability: { type: String, default: '' },
  isRX: { type: String, default: '' },
  isTBD: { type: String, default: '' },
});

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);
