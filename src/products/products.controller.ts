import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { Product } from 'src/utils/interfaces';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('uploads')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data') // Specifies that the endpoint accepts form-data
  @ApiBody({
    // Defines the structure of the request body
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'], // Makes file a required parameter
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  async uploadCsv(@UploadedFile() file: Express.Multer.File) {
    const csvFilePath = `./uploads/${file.filename}`;
    const products = await this.productsService.convertCsvToJson(csvFilePath);

    // After conversion, you can now do whatever you want with the `products` array, like saving them to a database
    return {
      total: products.length,
      data: products,
    };
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Patch()
  async updateProduct(id: string, product: UpdateProductDto) {
    return this.productsService.updateProduct(id, product);
  }
}
