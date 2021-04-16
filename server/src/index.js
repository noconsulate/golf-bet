import express from "express";
import cors from "cors";
import "dotenv/config";

import routes from "./routes";

const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

// listen

// normal way to listen to server
app.listen(process.env.PORT, () => {
  console.log("listening on port: " + process.env.PORT);
});
