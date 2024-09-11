import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

const connect = async () => {
  await mongoose.connect(DB_CONNECTION_STRING);
  console.log("Mongo DB connected");
};

export default connect;