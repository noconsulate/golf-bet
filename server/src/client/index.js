import "dotenv/config";
import mongoose from "mongoose";

const { VPS_IP, MONGO_PORT, MONGO_USER, MONGO_PW } = process.env;

const uri = `mongodb://${MONGO_USER}:${MONGO_PW}@${VPS_IP}:27017/`;

// const uri = `mongodb://myUserAdmin:floofer@${VPS_IP}:27017/`;

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

export const db = mongoose.connection;
