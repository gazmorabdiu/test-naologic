import { Document, Types } from 'mongoose';
import { Category } from './category.interface';
import { Manufacturer } from './manufacturer.interface';
import { Item } from './item.interface';
import { Vendor } from 'src/vendor/entities/vendor.entity';

export interface Product extends Document {
  productId: string;
  productName: string;
  productDescription: string;
  category: Category;
  manufacturer: Manufacturer;
  item: Item;
  itemDescription: string;
  vendor: Vendor;
  imageFileName: string;
  itemImageURL: string;
  nDCItemCode: string;
  pKG: string;
  unitPrice: number;
  quantityOnHand: number;
  priceDescription?: string;
  availability: string;
  isRX: string;
  isTBD: string;
}
