import { Schema } from 'mongoose';
import { Item } from 'src/utils/interfaces';

export const ItemSchema = new Schema<Item>({
  itemId: { type: String, required: true, unique: true },
});
