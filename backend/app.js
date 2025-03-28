import express from "express";
import routes from "./src/routes/index.js";
import errorHandler from "./src/middlewares/error.js";
import config from "./config/config.js";
import connectDB from "./src/connections/db.js";
import morganLogger from "morgan";


const app  = express();

app.use(express.json());

app.use(morganLogger("dev"));

app.use("/", routes);

app.use(errorHandler);

const port = config.PORT;

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
  connectDB();
});