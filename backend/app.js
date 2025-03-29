import express, { json } from "express";
import routes from "./src/routes/index.js";
import globalErrorHandler from "./src/middlewares/error.js";
import config from "./config/config.js";
import connectDB from "./src/connections/db.js";
import morganLogger from "morgan";
import cors from "cors";

const app = express();

app.use(json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(morganLogger("dev"));

app.use("/", routes);

app.use(globalErrorHandler);

const port = config.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
