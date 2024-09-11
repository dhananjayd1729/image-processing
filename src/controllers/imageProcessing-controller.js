import sharp from 'sharp';
import axios from 'axios';
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const processImage = async (inputUrl) => {
  try {
    const response = await axios.get(inputUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    
    const processedBuffer = await sharp(buffer)
      .jpeg({ quality: 50 }) 
      .toBuffer();

    const outputFilename = `processed_${Date.now()}.jpg`;
    const outputPath = path.join(__dirname, '..', 'public', 'images', outputFilename);
    
    await fs.promises.writeFile(outputPath, processedBuffer);
    
    return `/images/${outputFilename}`;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

