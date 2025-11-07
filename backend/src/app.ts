import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import friendsRouter from "./routes/friends.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

/*Middleware */
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
/*--- */

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/friends", friendsRouter);


// Error handler last
app.use(errorHandler);

export default app;
