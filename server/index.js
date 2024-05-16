import express from "express";
import cors from "cors";
import userRoutes from './routes/routes.js';
import path from 'path';
import {initializeDbConnection} from './db/dbConnection.js';
const app = express();
const port = 3001;
await initializeDbConnection();
// Serve static files from the 'upload' directory
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use("/api/pdf",express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());


app.use('/api/v1',userRoutes);

app.get("/api/v1/test",(req,res)=>{
    res.status(200).json("Ok");
})
// docker run -e "ACCEPT_EULA=1" -e "MSSQL_SA_PASSWORD=Nand1234" -e "MSSQL_PID=Developer" -e "MSSQL_USER=SA" -p 1433:1433 -d --name=sql mcr.microsoft.com/azure-sql-edge


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
