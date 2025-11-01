import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const PORT = process.env.PORT || process.env.API_PORT || 5002;
const app = express();

/*Middlewares */
//Allow parsing JSON
app.use(express.json());
//Handle CORS Errors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//Allow cookie parsing
app.use(cookieParser());
/***********/

/*Routes */
import authRouter from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";

app.use("/api/v1/auth", authRouter);
/*****************/



//Error handler must be last
app.use(errorHandler)
//Using HTTP to handle real-time communication effectively.
const server = http.createServer(app);
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Connected to MONGO");
    server.listen(PORT, () => {
      console.log("Server is listening on", PORT);
    });
  })
  .catch((e) => {
    console.log("Connection to mongo failed:", e);
  });
