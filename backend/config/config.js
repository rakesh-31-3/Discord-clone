import dotenv from "dotenv";
dotenv.config();

export default {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  JWT_ACCESS_EXPIRATION_HOURS: process.env.JWT_ACCESS_EXPIRATION_HOURS,
  JWT_SECRET: process.env.JWT_SECRET,
};
