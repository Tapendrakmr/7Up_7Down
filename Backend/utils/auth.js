import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
const getToken = (userData) => {
  return (
    "Bearer" +
    " " +
    jwt.sign(userData, config.JWT.SECRET_KEY, { expiresIn: "8h" })
  );
};

const verifyToken = (token) => {
  const newToken = token.split(" ")[1];
  return jwt.verify(newToken, config.JWT.SECRET_KEY);
};
export { getToken, verifyToken };
