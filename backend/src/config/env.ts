import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.API_PORT || "5002",
  MONGO_URI: process.env.MONGO_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
};
