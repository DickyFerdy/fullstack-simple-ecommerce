import { validate } from "../validation/validation.js";
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { getAccessToken, getRefreshToken } from "../utils/token-util.js";
import jwt from "jsonwebtoken";


const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const existingUser = await prismaClient.user.findFirst({
    where: {
      OR: [
        { username: user.username },
        { email: user.email }
      ],
    },
    select: {
      username: true,
      email: true
    }
  });

  if (existingUser) {
    if (existingUser.username === user.username) {
      throw new ResponseError(409, "Username already taken");
    } else if (existingUser.email === user.email) {
      throw new ResponseError(409, "Email is already in use");
    }
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      name: true,
      username: true,
      email: true
    }
  });
};


const login = async (request) => {
  const user = validate(loginUserValidation, request);

  const existingUser = await prismaClient.user.findFirst({
    where: {
      username: user.username
    },
    select: {
      user_id: true,
      name: true,
      username: true,
      email: true,
      password: true
    }
  });

  if (!existingUser) {
    throw new ResponseError(404, "Invalid Username or Password");
  }

  const isPasswordValid = await bcrypt.compare(user.password, existingUser.password);

  if (!isPasswordValid) {
    throw new ResponseError(401, "Invalid Username or Password");
  }

  const payload = ({
    user_id: existingUser.user_id,
    name: existingUser.name,
    username: existingUser.username,
    email: existingUser.email
  });

  const accessToken = getAccessToken(payload);
  const refreshToken = getRefreshToken(payload);

  const updateUser = await prismaClient.user.update({
    where: {
      user_id: existingUser.user_id,
      username: existingUser.username
    },
    data: {
      refresh_token: refreshToken
    },
    select: {
      refresh_token: true
    }
  });

  return {
    accessToken: accessToken,
    refreshToken: updateUser.refresh_token
  }
};


const get = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findFirst({
    where: {
      username: username
    },
    select: {
      name: true,
      username: true,
      email: true
    }
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return user;
};


const update = async (request) => {
  const user = validate(updateUserValidation, request);

  if (user.email) {
    const existingEmail = await prismaClient.user.count({
      where: {
        email: user.email
      }
    });
    
    if (existingEmail === 1) {
      throw new ResponseError(409, "Email already in use");
    }
  }

  const existingUser = await prismaClient.user.findFirst({
    where: {
      username: user.username
    },
    select: {
      user_id: true,
      email: true
    }
  });

  const data = {};
  
  if (user.name) {
    data.name = user.name
  }

  if (user.email) {
    data.email = user.email
  }

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.user.update({
    where: {
      user_id: existingUser.user_id
    },
    data: data,
    select: {
      name: true,
      username: true,
      email: true
    }
  });
};


const refreshToken = async (cookieToken, refreshSecretKey) => {
  if (!cookieToken) {
    throw new ResponseError(401, "Unauthorized: Token not provided");
  }

  const user = await prismaClient.user.findFirst({
    where: {
      refresh_token: cookieToken
    }
  });

  if (!user) {
    throw new ResponseError(404, "Unauthorized: User is not found");
  }

  const token = jwt.verify(cookieToken, refreshSecretKey, (err, decoded) => {
    if (err) {
      throw new ResponseError(401, "Unauthorized: Invalid Token");
    }
    
    const payload = ({
      user_id: decoded.user_id,
      name: decoded.name,
      username: decoded.username,
      email: decoded.email
    });

    const accessToken = getAccessToken(payload);
    return accessToken;
  });

  return token;
};


const logout = async (cookieToken) => {
  if (!cookieToken) {
    throw new ResponseError(401, "Unauthorized: Token not provided");
  }

  const user = await prismaClient.user.findFirst({
    where: {
      refresh_token: cookieToken
    },
    select: {
      user_id: true
    }
  });

  if (!user) {
    throw new ResponseError(400, "Invalid Request");
  }

  return prismaClient.user.update({
    where: {
      user_id: user.user_id
    },
    data: {
      refresh_token: null
    }
  });
}


export default {
  register,
  login,
  get,
  update,
  refreshToken,
  logout
}