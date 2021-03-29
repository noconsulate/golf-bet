import express from "express";
import cors from "cors";
import "dotenv/config";

import models, { connectDb } from "./models";
import routes from "./routes";

const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// put models into request

app.use((req, res, next) => {
  req.context = { models };
  next();
});

// routes

app.use("/games", routes.game);

// start db and listen

connectDb()
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port: " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
