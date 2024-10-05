import { Schema } from 'mongoose';
import { Variant } from 'src/utils/interfaces';

export const VariantSchema = new Schema<Variant>({
  id: { type: String, required: true },
  available: { type: Boolean, required: true },
  attributes: {
    packaging: { type: String, required: true },
    description: { type: String, required: true },
  },
  cost: { type: Number, required: true },
  currency: { type: String, required: true },
  depth: { type: Number, default: null },
  description: { type: String, required: true },
  dimensionUom: { type: String, default: null },
  height: { type: Number, default: null },
  width: { type: Number, default: null },
  manufacturerItemCode: { type: String, required: true },
  manufacturerItemId: { type: String, required: true },
  packaging: { type: String, required: true },
  price: { type: Number, required: true },
  volume: { type: Number, default: null },
  volumeUom: { type: String, default: null },
  weight: { type: Number, default: null },
  weightUom: { type: String, default: null },
  optionName: { type: String, required: true },
  optionsPath: { type: String, required: true },
  optionItemsPath: { type: String, required: true },
  sku: { type: String, required: true },
  active: { type: Boolean, required: true },
  images: [
    {
      fileName: { type: String, required: true },
      cdnLink: { type: String, default: null },
      i: { type: Number, required: true },
      alt: { type: String, default: null },
    },
  ],
  itemCode: { type: String, required: true },
});
