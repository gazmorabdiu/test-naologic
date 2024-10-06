## Install npm package

```
npm i
```

## Run app

```
npm run start
```

# Naologic Task

### Scenario:

##### Every day, we pull a large CSV file (images40.txt) with products, parse the file into our format and insert, update or delete products from our database. (the delete step must have a flag and be an option)

##### Import a very large CSV file, convert the data to the JSON format indicated in the sample-products.json and save it to Mongo. DO NOT import sample-products.json. That serves as an example of the format we are expecting you to convert images40.txt to.

##### Before saving a product, you need to make sure that all vendors are up to date and you will use the document ids for vendorId and manufacturerId.

##### At the end of each

###### Tech:

- Typescript
- Mongo
- Nestjs + Schedulers
- LangChanTS

###### Prerequisites:

- Understand what products with variants is
- Check what data needs to be saved before
- You are the owner of the task, you decide
- If you see a value that is referenced from somewhere else, unknown, just simulate it.
- Deduct the data format based on sample

###### Information:

- There are 2 variants: ItemDescription → description and Packaging → packaging fields
  docId is a internal id we generate with nanoid v4
- Options[].id is just a random string
- There are 100k+ rows that should turn into 13k products (if variants are generated correctly)
- You only have 2GB of RAM available
- Each ProductID must be unique across all records.
- The ItemID must be unique within the context of its respective ProductID group.
- During imports, product data may be modified, requiring updates or deletions of existing products based on the new information.
- When deleting products, consider handling cases where products might already be associated with existing orders and determine the appropriate action.
- To retrieve comprehensive information for a specific product, group all related records by ProductID.

###### Ignore:

- Categories
- Everything that is not in the data{} in the JSON

### Your task:

#### Import all the products and vendors using a scheduled task that runs once per day.

#### All products must have their description field enhanced using OpenAI by passing the name and category. If the product has a description, pass it for enhancement. Some products are missing descriptions, so use only name and category.

- unset

  - You are an expert in medical sales. Your specialty is medical consumables used by hospitals on a daily basis.
    Your task to enhance the description of a product based on the information provided.

    - Product name: $name
    - Product description: $description
    - Category: $nameOfCategory
    - New Description:

### What did I do?

#### Based on the samples I had and my understanding of the task, here’s a step-by-step overview:

- I implemented HTTP endpoints to upload CSV files (the sample text file was too large, so I only used a few lines from it).
- I created Swagger documentation to display the available endpoints for this task.
- While I worked on converting the data as requested, I encountered some issues with the requirements.
- The productID was supposed to be unique, but during debugging, I found products with the same ID but different manufacturers in the text file. In the sample JSON, not all variants had the same itemId. Due to this, I opted not to convert based on variants. Instead, I structured the data into models for product, vendor, item, category, and manufacturer.
- During CSV import, the data is converted into my model structure and stored as documents in MongoDB (using Mongoose).
- I initially tried to use LangChainTS, but after extensive research, I decided to go with the standard OpenAI integration.
- I also created a daily scheduled task that calls OpenAI to generate descriptions based on productName and category. However, I couldn't test this fully, as each model I used requires a billing plan.

##### !NOTE

- openAI service may crash your app because no token and model have been added.

#### This was a different challenge for me, and a completely new experience. I may not have completed the task perfectly, but I recognize that I have a lot to learn, and I’m eager to improve. Thank you for your time
