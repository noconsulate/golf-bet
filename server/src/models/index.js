import mongoose from "mongoose";
import "dotenv/config";

import Game from "./game";

const { VPS_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD } = process.env;

// mongodb://myUserAdmin:floofer@165.232.158.150:27017

const uri =
  "mongodb+srv://janssen:janssen@cluster0.skdbh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${VPS_IP}:${MONGO_PORT}`;

const connectDb = () => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "golf-bet",
  });
};

const models = { Game };

export { connectDb };
export default models;

// posgresql connection string
// uri = "postrgres://golfbet:golfbet@165.232.158.150:5432/golfbet"
