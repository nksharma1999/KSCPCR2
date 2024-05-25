import { verifyToken } from "./login.js";
export const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    const data = verifyToken(token);
    if (data) {
      req.userInfo = data
      next();
    } else {
      res.status(401).json("Token Invalid");
    }
  }else{
    res.status(401).json("Please Provide Token");
  }
};
