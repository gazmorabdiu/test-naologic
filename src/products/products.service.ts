import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as parse from 'csv-parser';
import { Item } from 'src/utils/interfaces/item.interface';
import { Manufacturer } from 'src/utils/interfaces/manufacturer.interface';
import { Category } from 'src/utils/interfaces/category.interface';
import { Types } from 'mongoose';
import { Vendor } from 'src/utils/interfaces';
import { VendorService } from 'src/vendor/vendor.service';
import { OpenAiService } from 'src/open-ai/open-ai.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Item') private readonly itemModel: Model<Item>,
    @InjectModel('Manufacturer')
    private readonly manufacturerModel: Model<Manufacturer>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly vendorService: VendorService,
    private readonly openAIService: OpenAiService,
  ) {}

  convertCsvToJson(filePath: string): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(parse())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            const formattedProducts = await this.convertToProductSchema(
              results,
            );
            resolve(formattedProducts);
          } catch (error) {
            reject(error);
          } finally {
            fs.unlinkSync(filePath);
          }
        });
    });
  }

  // Function to map CSV data to the desired product schema
  async convertToProductSchema(csvData: any[]): Promise<Product[]> {
    const formattedProducts = [];

    for (const row of csvData) {
      if (!row.CategoryName) {
        continue;
      }
      const category = await this.findOrCreateCategory({
        categoryId: row.CategoryID,
        categoryName: row.CategoryName,
      });

      const manufacturer = await this.findOrCreateManufacturer({
        manufacturerId: row.ManufacturerID,
        manufacturerCode: row.ManufacturerCode,
        manufacturerName: row.ManufacturerName,
        manufacturerItemCode: row.ManufacturerItemCode,
      });

      const item = await this.findOrCreateItem({
        itemId: row.ItemID,
      });

      const vendor = await this.vendorService.getRandomVendors(1);

      const productData = {
        productId: row.ProductID,
        productName: row.ProductName,
        productDescription: row.ProductDescription,
        category: {
          _id: category._id,
          categoryId: category.categoryId,
          categoryName: category.categoryName,
        },
        vendor: {
          _id: vendor[0]._id,
          email: vendor[0].email,
          phoneNumber: vendor[0].phoneNumber,
          address: vendor[0].address,
          createdAt: vendor[0].createdAt,
        },
        manufacturer: {
          _id: manufacturer._id,
          manufacturerID: manufacturer.manufacturerId,
          manufacturerCode: manufacturer.manufacturerCode,
          manufacturerName: manufacturer.manufacturerName,
          manufacturerItemCode: manufacturer.manufacturerItemCode,
        },
        item: {
          _id: item._id,
          itemId: item.itemId,
        },
        itemDescription: row.ItemDescription,
        imageFileName: row.ImageFileName,
        itemImageURL: row.ItemImageURL,
        nDCItemCode: row.NDCItemCode,
        pKG: row.PKG,
        unitPrice: parseFloat(row.UnitPrice),
        quantityOnHand: parseInt(row.QuantityOnHand),
        priceDescription: row.PriceDescription || '',
        availability: row.Availability,
        isRX: row.IsRX,
        isTBD: row.IsTBD,
      };
      const product = await this.upsertProduct(productData);
      formattedProducts.push(product);
    }

    return formattedProducts;
  }

  // Helper function to upsert product (update if exists, create if not)
  async upsertProduct(productData: any): Promise<Product> {
    const existingProduct = await this.productModel
      .findOne({
        productID: productData.productId,
        'manufacturer._id': productData.manufacturer._id,
        'item._id': productData.item._id,
      })
      .exec();

    if (existingProduct) {
      // Update the existing product with new data
      await this.productModel
        .updateOne(
          {
            productID: productData.productId,
            'manufacturer._id': productData.manufacturer._id,
            'item._id': productData.item._id,
          },
          productData,
        )
        .exec();
      return this.productModel
        .findOne({ productID: productData.productId })
        .exec(); // Return the updated product
    } else {
      // Create a new product if not found
      const newProduct = new this.productModel(productData);
      return await newProduct.save();
    }
  }

  // Helper method to find or create Category
  private async findOrCreateCategory(
    categoryDto: Category,
  ): Promise<Category & { _id: Types.ObjectId }> {
    let category = await this.categoryModel
      .findOne({ categoryId: categoryDto.categoryId })
      .exec();
    if (!category) {
      category = new this.categoryModel(categoryDto);
      await category.save();
    }
    return category;
  }

  // Helper method to find or create Manufacturer
  private async findOrCreateManufacturer(
    manufacturerDto: Manufacturer,
  ): Promise<Manufacturer & { _id: Types.ObjectId }> {
    let manufacturer = await this.manufacturerModel
      .findOne({ manufacturerId: manufacturerDto.manufacturerId })
      .exec();
    if (!manufacturer) {
      manufacturer = new this.manufacturerModel(manufacturerDto);
      await manufacturer.save();
    }
    return manufacturer;
  }

  // Helper method to find or create Item
  private async findOrCreateItem(
    itemDto: Item,
  ): Promise<Item & { _id: Types.ObjectId }> {
    let item = await this.itemModel.findOne({ itemId: itemDto.itemId }).exec();
    if (!item) {
      item = new this.itemModel(itemDto);
      await item.save();
    }
    return item;
  }

  async findAll(): Promise<any[]> {
    return this.productModel
      .find({})
      .populate('category')
      .populate('manudacturer')
      .populate('item')
      .exec();
  }

  async updateProduct(id: string, product: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, product);
  }
}
