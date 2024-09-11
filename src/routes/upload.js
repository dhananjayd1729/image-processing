import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { processCSV }  from "../controllers/csv-controller.js";
import { processImage } from "../controllers/imageProcessing-controller.js";
import { sendWebhook } from "../controllers/webhook-controller.js"; 
import Product from "../models/product.js";
import imageQueue from '../queues/imageQueue.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const uploadStorage = multer({ storage: storage })

router.post('/upload', uploadStorage.single("file"), async (req, res) => {
  try {
    const requestId = uuidv4();
    await processCSV(req.file.path, requestId);
    res.json({ requestId });

    // Process images asynchronously
    processImagesAsync(requestId);
  } catch (error) {
    res.status(500).json({ error: 'Error processing CSV' });
  }
});

const processImagesAsync = async (requestId) => {
  try {
    const products = await Product.find({ requestId });
    let outputImageUrls = [];
    for (const product of products) {
      
      for (const inputUrl of product.inputImageUrls) {
        const outputUrl = await processImage(inputUrl);
        outputImageUrls.push(outputUrl);
      }

      product.outputImageUrls = outputImageUrls;
      product.status = 'completed';
      await product.save();
    }
    // Send webhook notification
    await sendWebhook(requestId, 'completed', products);
  } catch (error) {
    console.error('Error processing images:', error);
    await Product.updateMany({ requestId }, { status: 'failed' });
    await sendWebhook(requestId, 'failed', null);
  }
};

export default router;