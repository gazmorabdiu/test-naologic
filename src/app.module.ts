/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { VendorModule } from './vendor/vendor.module';
import { OpenAiService } from './open-ai/open-ai.service';
import { OpenAiModule } from './open-ai/open-ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://gazmorabdiu:KvNNOcrcvQsAAElN@cluster0.zpz6c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    ProductsModule,
    VendorModule,
    OpenAiModule,
  ],
  controllers: [AppController],
  providers: [AppService, OpenAiService],
})
export class AppModule {}
