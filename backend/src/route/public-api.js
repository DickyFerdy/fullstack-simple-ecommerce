import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();

publicRouter.post('/api/v1/register', userController.register);
publicRouter.post('/api/v1/login', userController.login);
publicRouter.get('/api/v1/token', userController.refreshToken);


export {
  publicRouter
}