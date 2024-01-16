import userService from "../service/user-service.js";


const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json({
      data: result
    });
  } catch (error) {
    next(error);
  }
}


const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      //secure: true
    });
    res.status(200).json({
      data: {
        accessToken: result.accessToken
      }
    });
  } catch (error) {
    next(error);
  }
}


const get = async (req, res, next) => {
  try {
    const username = req.user.username;
    const result = await userService.get(username);
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  }
}


const update = async (req, res, next) => {
  try {
    const username = req.user.username;
    const request = req.body;
    request.username = username;
    const result = await userService.update(request);
    res.status(200).json({
      message: "Update Success",
      data: result
    });
  } catch (error) {
    next(error);
  }
}


const refreshToken = async (req, res, next) => {
  try {
    const cookieToken = req.cookies.refreshToken;
    const refreshSecretKey = process.env.REFRESH_SECRET_TOKEN;
    
    const result = await userService.refreshToken(cookieToken, refreshSecretKey);
    res.status(200).json({
      data: {
        accessToken: result
      }
    });
  } catch (error) {
    res.clearCookie('refreshToken');
    next(error);
  }
}


const logout = async (req, res, next) => {
  try {
    const cookieToken = req.cookies.refreshToken;

    await userService.logout(cookieToken);
    res.clearCookie('refreshToken');
    res.status(200).json({
      message: "Logout Success"
    });
  } catch (error) {
    next(error);
  }
}


export default {
  register,
  login,
  get,
  update,
  refreshToken,
  logout
}