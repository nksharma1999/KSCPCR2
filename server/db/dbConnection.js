import sql from "mssql";
const config = {
  user: "sa",
  password: "Nand1234",
  server: "localhost", // You can use 'localhost\\instance' to connect to named instance
  database: "kscpcr",
  options: {
    trustServerCertificate: true,
    trustedConnection: true, // Use Windows authentication (omit if using SQL authentication)
    encrypt: true,
  },
};
let pool = null;
export const initializeDbConnection = async () => {
    try {
        // Connect to the database
        pool = await sql.connect(config);
        console.log("Connected to MSSQL database");
        return pool;
    } catch (err) {
        console.error("Error connecting to MSSQL database:", err);
        throw err; // Rethrow the error to handle it elsewhere in your application
    }
};

export const getDbConnection = async() => {
    if (!pool) {
       await initializeDbConnection();
       return pool;
        // throw new Error("Database connection not initialized. Call initializeDbConnection first.");
    }
    return pool;
};
