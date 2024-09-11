import express from "express";
import connect from "./config/database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import uploadRoutes from "./routes/upload.js"
import statusRoutes from "./routes/status.js";
import Arena from "bull-arena";
import Bull from 'bull';



dotenv.config();
const app = express();
const PORT = process.env.PORT;


// const arenaConfig = Arena({
//   Bull,
//   queues: [
//     {
//       name: 'image-processing',
//       hostId: 'Queue Server',
//       redis: {
//         host: '127.0.0.1',
//         port: 6379
//       }
//     }
//   ]
// });

// app.use('/arena', arenaConfig);


app.use("/api", uploadRoutes);
app.use("/api", statusRoutes);

const startAndPrepareServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, async () => {
    console.log(`Server started at port : ${PORT}`);
    await connect();
  });
};

startAndPrepareServer();


