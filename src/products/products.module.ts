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
import { VendorModule } from 'src/vendor/vendor.module';
import { VendorService } from 'src/vendor/vendor.service';
import { VendorSchema } from 'src/vendor/schemas';
import { OpenAiService } from 'src/open-ai/open-ai.service';

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
      { name: 'Vendor', schema: VendorSchema },
    ]),
    VendorModule,
    MulterModule.register({
      dest: './uploads', // Set upload destination
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, VendorService, OpenAiService],
})
export class ProductsModule {}
