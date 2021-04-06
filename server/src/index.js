import express from "express";
import cors from "cors";
import "dotenv/config";
const ParseServer = require("parse-server").ParseServer;
import ParseDashboard from "parse-dashboard";

import routes from "./routes";

const app = express();

// Config ParseServer
const parseAPI = new ParseServer({
  databaseURI: "mongodb+srv://user1:user1@cluster0.skdbh.mongodb.net/golfbet",
  appId: "1234",
  masterKey: "1234",
  serverURL: `http://localhost:${process.env.PORT}/parse`,
  liveQuery: {
    classNames: ["Game"],
  },
});

// Parse dashboard (needs security)
const options = { allowInsecureHTTP: false };

const dashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL: "mongodb+srv://user1:user1@cluster0.skdbh.mongodb.net/test",
        appId: "1234",
        masterKey: "1234",

        serverURL: `http://localhost:${process.env.PORT}/parse`,
        appName: "MyApp",
      },
    ],
  },
  options
);

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Parse API
app.use("/parse", parseAPI);

// Serve parse dashboard
app.use("/dashboard", dashboard);
// listen

// normal way to listen to server
// app.listen(process.env.PORT, () => {
//   console.log("listening on port: " + process.env.PORT);
// });

let httpServer = require("http").createServer(app);
httpServer.listen(2000);
var parseLiveQueryServer = ParseServer.createLiveQueryServer(httpServer);
