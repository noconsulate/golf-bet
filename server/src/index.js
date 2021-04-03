import express from "express";
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

import models, { connectDb } from "./models";
import routes from "./routes";

const app = express();

const prisma = new PrismaClient();

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// put models into request

// app.use((req, res, next) => {
//   req.context = { models };
//   next();
// });

app.use(async (req, res, next) => {
  // const prisma = await new PrismaClient();
  req.context = { prisma };
  next();
});

// routes

app.use("/games", routes.game);

// start db and listen

// connectDb()
//   .then(async () => {
//     app.listen(process.env.PORT, () => {
//       console.log("listening on port: " + process.env.PORT);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   app.listen(process.env.PORT, () => {
//     console.log("listening on port: " + process.env.PORT);
//   });
// }

// main().catch((e) => {
//   throw e;
// });
app.listen(process.env.PORT, () => {
  console.log("listening on port: " + process.env.PORT);
});
