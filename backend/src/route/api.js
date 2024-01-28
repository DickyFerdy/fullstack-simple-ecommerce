import express from "express";
import userController from "../controller/user-controller.js";
import addressController from "../controller/address-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import productController from "../controller/product-controller.js";
import categoryController from "../controller/category-controller.js";


const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get("/api/v1/users", userController.get);
userRouter.patch("/api/v1/users", userController.update);
userRouter.delete("/api/v1/logout", userController.logout);

// Address API
userRouter.post("/api/v1/addresses", addressController.create);
userRouter.get("/api/v1/addresses", addressController.list);
userRouter.get("/api/v1/addresses/:addressId", addressController.get);
userRouter.put("/api/v1/addresses/:addressId", addressController.update);
userRouter.delete("/api/v1/addresses/:addressId", addressController.remove);

// Product API
userRouter.post("/api/v1/products", productController.create);
userRouter.get("/api/v1/products", productController.search);
userRouter.get("/api/v1/products/category/:categoryName", productController.category);

// Category API
userRouter.get("/api/v1/categories", categoryController.get);

export {
  userRouter
}