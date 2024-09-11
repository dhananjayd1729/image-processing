import { parse } from "csv-parse";
import fs from "fs";
import Product from "../models/product.js";

export const processCSV = async (filePath, requestId) => {
  const results = [];
  try {
    const fileStream = fs.createReadStream(filePath).pipe(parse());

    for await (const data of fileStream) {
      results.push(data);
    }

    for (let i = 1; i < results.length; i++) {
      const [serialNumber, productName, inputImageUrls] = results[i];

      await Product.create({
        serialNumber,
        productName,
        inputImageUrls: inputImageUrls.split(','),
        requestId,
      })
    }
    console.log("All products inserted successfully.");
  } catch (error) {
    console.error("Error processing CSV or inserting into DB:", error);
    throw error; 
  }
};
