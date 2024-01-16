import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessSecretKey = process.env.ACCESS_SECRET_TOKEN;
const refreshSecretKey = process.env.REFRESH_SECRET_TOKEN;


const getAccessToken = (payload) => {
  return jwt.sign(payload, accessSecretKey, { expiresIn: '1h' });
}

const getRefreshToken = (payload) => {
  return jwt.sign(payload, refreshSecretKey, { expiresIn: '6h' });
}


export {
  getAccessToken,
  getRefreshToken
}