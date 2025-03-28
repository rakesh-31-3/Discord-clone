import config from "../../config/config.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import AppError from "../middlewares/appError.js";
import catchAsync from "../middlewares/catchAsync.js";

export const registerUser = catchAsync(async (req, res, next) => {
  try {
    const data = req.body;

    logger.info("Registration request received", {
      reqMethod: req.method,
      reqUrl: req.originalUrl,
    });

    const {
      displayName,
      username,
      email,
      password,
      DateOfBirth,
      profilePic,
    } = data;

    // Check whether each and every field is present
    if (!username || !email || !password || !DateOfBirth) {
      return next(new AppError("Missing credentials", 400));
    }

    // Find user in the db with particular email
    const user = await User.findOne({ email });

    // If the user is found, then the username cannot be used. A different username
    // alongwith email and password has to be created for registration.
    if (user) {
      return next(new AppError("User already exists", 400));
    }

    // Store the password in the db using bcrypt hashing.
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create new user in the db alongwith hashed password.
    const createdUser = await User.create({
      username,
      email,
      password: encryptedPassword,
      DateOfBirth,
      displayName: displayName || null,
      profilePic: profilePic || null,
    });

    logger.info("User registered successfully", {
      reqMethod: req.method,
      reqUrl: req.originalUrl,
    });

    // send a success response with created status code on creating a user
    return res.status(200).send({
      status: true,
      message: "User created successfully",
      data: createdUser,
    });
  } catch (err) {
    // Log error before passing it to the next middleware
    logger.error("Registration failed", {
      reqMethod: req.method,
      reqUrl: req.originalUrl,
      stack: err.stack,
    });

    // Pass the error to next middleware (which is a error handler)
    next(err);
  }
});

export const loginUser = catchAsync(async (req, res, next) => {
  try {
    const { email, phone, password } = req.body;

    logger.info("Login request received", {
      reqMethod: req.method,
      reqUrl: req.originalUrl,
    });

    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phone) {
      user = await User.findOne({ phone });
    }

    // If the user is not found, then throw error saying invalid email id
    if (!user) {
      logger.error("Invalid credentials", {
        reqMethod: req.method,
        reqUrl: req.originalUrl,
      });
      return next(new AppError("Invalid credentials", 400));
    }

    // Check password matching
    const isMatch = await bcrypt.compare(password, user.password);

    // If the password does not match, then throw error saying invalid password
    if (!isMatch) {
      logger.error("Invalid credentials", {
        reqMethod: req.method,
        reqUrl: req.originalUrl,
      });
      return next(new AppError("Invalid credentials", 400));
    }

    const userData = {
      email: user.email,
    };

    // Generate a new token using the user details like id and username
    const token = jwt.sign(userData, config.JWT_SECRET, {
      expiresIn: `${config.JWT_ACCESS_EXPIRATION_HOURS}`,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    logger.info("User logged in successfully", {
      reqMethod: req.method,
      reqUrl: req.originalUrl,
    });

    return res.cookie("token", token, cookieOptions).status(200).send({
      // setting the token in the cookies and sending the user data
      // and cookie as response
      status: true,
      message: "User logged in successfully",
      token: token,
    });
  } catch (err) {
    logger.error("Login failed", {
      reqMethod: req.method,
      reqUrl: req.originalUrl,
      stack: err.stack,
    });

    next(err);
  }
});
