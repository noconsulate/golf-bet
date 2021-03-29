import mongoose from "mongoose";
import "dotenv/config";

import Game from "./game";

const { VPS_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD } = process.env;

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${VPS_IP}:${MONGO_PORT}`;

const connectDb = () => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const models = { Game };

export { connectDb };
export default models;
