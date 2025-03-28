import express from "express";
import connectDB from "./src/connections/db.js";
import config from "./config/config.js";

const app = express();

app.get("/", (req, res) => {
  res.end("Hello there");
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port http://localhost:${config.PORT}`);
  connectDB();
});
