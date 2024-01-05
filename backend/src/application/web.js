import express from "express";
import { publicRouter } from "../route/public-api.js";
import { userRouter } from "../route/api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";


export const web = express();

web.use(cookieParser());
web.use(express.json());
web.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);