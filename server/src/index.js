import express from "express";
import cors from "cors";
import "dotenv/config";

import { db } from "./client";
import { connectDb } from "./models";

import routes from "./routes";

const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// Routes

app.use("/games", routes.game);

// app.listen(process.env.PORT, () => {
//   console.log("Listening on " + process.env.PORT);
// });

// async function connectDb() {

// try {
//   const connected = await client.connect()
//   if (connected) {
//     console.log("connected to Mongo");
//   }
// } finally {
//   client.close();
// }
// }

// connectDb().catch(console.error);

// db.once("open", () => {
//   console.log("connected to database");
// });

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
