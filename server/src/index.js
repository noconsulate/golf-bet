import express from "express";
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

import routes from "./routes";

const app = express();

const prisma = new PrismaClient();

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = { prisma };
  next();
});

// routes

app.use("/games", routes.game);

// listen

app.listen(process.env.PORT, () => {
  console.log("listening on port: " + process.env.PORT);
});
