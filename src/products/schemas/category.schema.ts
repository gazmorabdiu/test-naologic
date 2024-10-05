import { Schema } from 'mongoose';
import { Category } from 'src/utils/interfaces';

export const CategorySchema = new Schema<Category>({
  categoryId: { type: String, required: true, unique: true },
  categoryName: { type: String, default: '' },
});
