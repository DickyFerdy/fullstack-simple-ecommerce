import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";


const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get("/api/v1/users", userController.get);
userRouter.patch("/api/v1/users", userController.update);
userRouter.delete("/api/v1/logout", userController.logout);

export {
  userRouter
}