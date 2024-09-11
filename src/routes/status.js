import express from "express";
import Product from "../models/product.js"; 

const router = express.Router();

router.get('/status/:requestId', async (req, res) => {
  try {
    const { requestId } = req.params;
    const products = await Product.find({ requestId });

    if (products.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }

    const status = products.every(p => p.status === 'completed') ? 'completed' :
                   products.some(p => p.status === 'failed') ? 'failed' : 'processing';

    res.json({ requestId, status });
  } catch (error) {
    res.status(500).json({ error: 'Error checking status' });
  }
});

export default router;