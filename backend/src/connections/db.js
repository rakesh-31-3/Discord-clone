import mongoose from "mongoose";
import config from "../../config/config.js";
const ConnectDB = async () => {
  try {
    const { connection } = await mongoose.connect(config.MONGO_URI);
    if (connection) {
      console.log(`Connected to Database ${connection.host} `);
    } else {
      throw new Error("Connection Failed");
    }
  } catch (error) {
    console.log("Error connecting to Database", error);
  }
};
export default ConnectDB;
