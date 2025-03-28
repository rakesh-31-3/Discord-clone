import bcrypt from "bcrypt";
import User from "../models/user.model";

export const createUserService = async (formData) => {

  const {displayName, username, email, password, phone, DateOfBirth, profilePic} = formData;

  //Check whether each and every field is present
  if (!username || !email || !password || !DateOfBirth) {
    throw new Error("Missing credentials");
  }

  try {
    //Find user in the db with particular username
    const user = await User.findOne({ where: { username } });

    //If the user is found, then the username cannot be used. A different username 
    //alongwith email and password has to be created for registration.
    if (user) {
      throw new Error("User already exists");
    }

    //Store the password in the db using bcrypt hashing.
    const encryptedPassword = await bcrypt.hash(password, 10);

    //create new user in the db alongwith hashed password.
    const createdUser = await User.create({
      username,
      email,
      password: encryptedPassword,
      DateOfBirth,
      displayName,
      phone,
      profilePic,
    });

    return createdUser;
  } catch (err) {

    //log and throw error if there was an issue in creating the user in the db.
    console.log("Error in creating the user", err);
    throw err;
  }
};

export const verifyUserService = async (userData) => {

  const { email, phone, password } = userData;

  try {
    // Check if either email or phone exists, and query the database accordingly
    let user;
    if (email) {
      user = await User.findOne({ where: { email } });
    } else if (phone) {
      user = await User.findOne({ where: { phone } });
    }
    
    //If the user is not found, then throw error saying invalid email id
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      throw error;
    }

    //Check password matching
    const isMatch = bcrypt.compare(password, user.password);

    //If the password does not match, then throw error saying invalid password
    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      throw error;
    }

    return user;
  } catch (err) {
    console.log("Error in verifying the user", err);
    throw err;
  }
};
