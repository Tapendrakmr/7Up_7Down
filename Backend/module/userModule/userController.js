import { getToken } from "../../utils/auth.js";
import { addUser, readUser } from "../../db/db.js";
import { v4 as uuidv4 } from "uuid";

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = readUser();
    const emailExists = userDB.find((user) => user.email === email);
    if (emailExists) {
      throw Error("The user account already exists.");
    }

    const newUser = {
      id: uuidv4(),
      email: email,
      password: password,
      gameBalance: 5000,
      createdAt: Date.now(),
    };
    // userDB.push({ id: userId, email: email, password: password });
    const token = getToken({ id: newUser.id, email: email });

    const data = readUser();
    data.push(newUser);
    addUser(data);
    res.json({
      status: "success",
      message: "The user has been successfully created.",
      data: { token },
    });
  } catch (err) {
    return res.json({
      status: "failed",
      message: err.message,
      error: err,
    });
  }
};
const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // const token=getToken({userId:user._id})
    const userDB = readUser();
    const emailExists = userDB.find((user) => user.email === email);
    if (!emailExists) {
      throw Error("The user could not be found.");
    }
    if (emailExists.password != password) {
      throw Error("The password entered does not match");
    }
    const token = getToken({ id: emailExists.id, email: email });
    res.json({
      status: "success",
      message: "User logged in successfully.",
      data: { token },
      //   token: `Bearer ${token}`,
    });
  } catch (err) {
    return res.json({
      status: "failed",
      message: err.message,
      error: err,
    });
  }
};

const profile = async (req, res, next) => {
  try {
    const userId = req.body.loggedInUserId;
    // const token=getToken({userId:user._id})
    const userDB = readUser();
    const userDetails = userDB.find((user) => user.id === userId);
    if (!userDetails) {
      throw Error("The user could not be found.");
    }
    delete userDetails["password"];
    userDetails["createdAt"] = new Date(userDetails["createdAt"]);
    res.json({
      status: "success",
      message: "The user details were fetched successfully.",
      data: { userDetails },
      //   token: `Bearer ${token}`,
    });
  } catch (err) {
    return res.json({
      status: "failed",
      message: err.message,
      error: err,
    });
  }
};

export { signup, signIn, profile };
