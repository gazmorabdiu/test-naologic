import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ItemSchema,
  ProductSchema,
  CategorySchema,
  ManufacturerSchema,
} from './schemas';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
      },
      {
        name: 'Item',
        schema: ItemSchema,
      },
      {
        name: 'Category',
        schema: CategorySchema,
      },
      {
        name: 'Manufacturer',
        schema: ManufacturerSchema,
      },
    ]),
    MulterModule.register({
      dest: './uploads', // Set upload destination
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
