import express from "express";
import "dotenv/config";
import cors from "cors";

import routes from "./routes/routes";

const app = express();

app.use(cors());
app.use("/supa", routes.supa);

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
