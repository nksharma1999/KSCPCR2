import { dbCreateUser } from "../../dbOperation/dbOperation.js";
import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';
dotenv.config();
export const createUser = (req, res) => {
  const data = req.body;
  if (data) {
    const pass = data.password;
    const hashPass = encryptData(pass,process.env.KEY);
    dbCreateUser(data, hashPass)
      .then((info) => {
        res.status(200).json(info);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
};


// Encryption function
export const encryptData = (data, secretKey)=> {
    const ciphertext = CryptoJS.AES.encrypt(data, secretKey).toString();
    return ciphertext;
}

// Decryption function
export const decryptData = (ciphertext, secretKey)=> {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}
