import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || process.env.API_PORT || 5002;
const app = express();

/*Middlewares */
//Allow parsing JSON
app.use(express.json());
//Handle CORS Errors
app.use(cors());
/***********/

/*Routes */
import authRouter from "./routes/auth.routes";

app.use("/api/v1/auth", authRouter);
/*****************/





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
