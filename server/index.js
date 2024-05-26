import express from "express";
import cors from "cors";
import userRoutes from "./routes/routes.js";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import https from "https";
import { initializeDbConnection } from "./db/dbConnection.js";
import { dbConnection } from "./db/dbSequelizeConnection.js";
import { verifyJWT } from "./controller/Auth/verifyJWT.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT | 3001;
const isProd = process.env.ISPROD || "false";
await initializeDbConnection();
// await dbConnection();
// Serve static files from the 'upload' directory
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(cors());
app.use(express.json());
app.use(
  "/api/v1/pdf",
  verifyJWT,
  express.static(path.join(__dirname, "uploads"))
);

app.use("/api/v1", userRoutes);

app.get("/api/v1/test", (req, res) => {
  res.status(200).json("Ok");
});

if (isProd === "true") {
  // Read SSL certificate and key
  const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  };

  // Create HTTPS server
  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`HTTPS Server is running on https://localhost:${PORT}`);
  });
} else {
  // Create Http Server
  app.listen(PORT, () => {
    console.log(`HTTP Server is running on http://localhost:${PORT}`);
  });
}
