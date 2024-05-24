import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.SECRET_KEY;
export const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json("Enter Username / Password");
    return;
  }
  if (username === "admin" && password === "1234") {
    const payload = {
      username: username,
    };
    const options = {
      expiresIn: "24h", // Token will expire in 1 hour
    };
    const token = jwt.sign(payload, secretKey, options);
    const response = {
      token: token,
      username: username,
      isLogin: true,
    };
    res.status(200).json(response);
  } else {
    res.status(400).json("Username/Password Invalid");
  }
};

export const isUserLogin = (req, res) => {
  const { token } = req.body;
  if (token) {
    const data = verifyToken(token);
    if (data) {
      const response = {
        username: data.username,
        isLogin: true,
      };
      res.status(200).json(response);
    } else {
      res.status(401).json({ auth: false, message: "Invalid Token" });
    }
  }
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};
