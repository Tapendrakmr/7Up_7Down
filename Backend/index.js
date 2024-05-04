import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";
import { config } from "./config/config.js";

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());
app.use("/api/v1", router);
app.listen(config.serverConfig.PORT, () => {
  console.log("Server is running at port", config.serverConfig.PORT);
});
