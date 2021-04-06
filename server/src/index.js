import express from "express";
import cors from "cors";
import "dotenv/config";
const ParseServer = require("parse-server").ParseServer;

import routes from "./routes";

const app = express();

// Config ParseServer
const parseAPI = new ParseServer({
  databaseURI: "mongodb+srv://user1:user1@cluster0.skdbh.mongodb.net/golfbet",
  appId: "1234",
  masterKey: "1234",
  serverURL: "http://localhost:1337/parse",
});

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Parse API
app.use("/parse", parseAPI);

// listen

app.listen(process.env.PORT, () => {
  console.log("listening on port: " + process.env.PORT);
});
