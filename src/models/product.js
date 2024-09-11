import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  serialNumber: { type: Number, required: true },
  productName: { type: String, required: true },
  inputImageUrls: [{ type: String }],
  outputImageUrls: [{ type: String }],
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
  requestId: { type: String },
});
productSchema.index({ requestId: 1 });
const Product = mongoose.model("Product", productSchema);
export default Product;
