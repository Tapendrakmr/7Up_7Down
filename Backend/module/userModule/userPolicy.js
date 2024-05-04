import { verifyToken } from "../../utils/auth.js";
const authMiddleWare = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    const decoded = verifyToken(token);
    req.body.loggedInUserId = decoded.id;
    next();
  } else {
    res.send({
      status: false,
      message: "unauthorized user",
    });
  }
};
export { authMiddleWare };
