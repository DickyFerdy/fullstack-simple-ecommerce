import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const accessToken = process.env.ACCESS_SECRET_TOKEN;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized: Token not provided"
    }).end();
  }

  jwt.verify(token, accessToken, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: "Unauthorized: Invalid token"
      }).end();
    }

    req.user = decoded;
    next();
  });
};
