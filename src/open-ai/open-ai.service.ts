import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OpenAI } from 'openai';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OpenAiService {
  private openAI: OpenAI;
  constructor(private readonly productsService: ProductsService) {
    this.openAI = new OpenAI({
      apiKey: 'API KEY',
    });
  }

  async generateDescription(category: string, productName: string) {
    const prompt = `Generate a creative product description for a product named "${productName}" in the category "${category}".`;

    const response = await this.openAI.completions.create({
      model: 'model', // You can choose the model, like GPT-4 or GPT-3.5
      prompt,
      max_tokens: 100,
    });

    return response.choices[0].text.trim();
  }

  // Scheduled task: Runs every day at 10 AM
  // this is not tested because openAI model is not working
  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  async handleCron() {
    console.log('Running daily task to enhance product descriptions');

    const products = await this.productsService.findAll(); // Fetch products

    for (let product of products) {
      const { category, manufacturer, item, productName, _id } = product;
      const description = await this.generateDescription(
        category.categoryName,
        productName,
      );

      await this.productsService.updateProduct(_id, {
        productDescription: description,
      });
    }

    console.log('Product descriptions updated successfully');
  }
}
