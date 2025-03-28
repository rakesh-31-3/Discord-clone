import {
  createUserService,
  verifyUserService,
} from "../services/auth.service.js";
import config from "../../config/config.js";
import logger from "../utils/logger.js";

export const registerUser = async (req, res, next) => {
  try {

    const data = req.body;

    logger.info("Registration request received", 
      { reqMethod: req.method, reqUrl: req.originalUrl });

    //create a new user
    const newUser = await createUserService(data);

    //send a success response with created status code on creating a user
    res
      .status(201)
      .json({ message: "Registration was successful", user: newUser });
    
    logger.info("User registered successfully", 
      { reqMethod: req.method, reqUrl: req.originalUrl });

  } catch (err) {

    // Log error before passing it to the next middleware
    logger.error("Registration failed", {
      reqMethod: req.method, reqUrl: req.originalUrl, stack: err.stack,
    });

    //Pass the error to next middleware (which is a error handler)
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {

    const data = req.body;

    logger.info("Login request received", 
      { reqMethod: req.method, reqUrl: req.originalUrl });

    //verify the user credentials stored in the db
    const verifiedUser = await verifyUserService(data);

    const userData = {
      email: verifiedUser.email,
    };
    
    //Generate a new token using the user details like id and username
    const token = jwt.sign(userData, config.JWT_SECRET, { expiresIn: `${config.JWT_ACCESS_EXPIRATION_HOURS}`} );

    res.status(200).json({ message: "Login Successful!", token });

    logger.info("User logged in successfully", 
      { reqMethod: req.method, reqUrl: req.originalUrl });

  } catch (err) {
    
    logger.error("Login failed", {
      reqMethod: req.method, reqUrl: req.originalUrl, stack: err.stack,
    });

    next(err);
  }
};
