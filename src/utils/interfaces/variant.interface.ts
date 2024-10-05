import { Document } from 'mongoose';

export interface Variant extends Document {
  id: string;
  available: boolean;
  attributes: {
    packaging: string;
    description: string;
  };
  cost: number;
  currency: string;
  depth: number | null;
  description: string;
  dimensionUom: string | null;
  height: number | null;
  width: number | null;
  manufacturerItemCode: string;
  manufacturerItemId: string;
  packaging: string;
  price: number;
  volume: number | null;
  volumeUom: string | null;
  weight: number | null;
  weightUom: string | null;
  optionName: string;
  optionsPath: string;
  optionItemsPath: string;
  sku: string;
  active: boolean;
  images: {
    fileName: string;
    cdnLink: string | null;
    i: number;
    alt: string | null;
  }[];
  itemCode: string;
}
