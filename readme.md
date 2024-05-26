# Overview
This project consists of a React application as the frontend and an Express.js server as the backend. Below are the instructions to set up, run, and deploy the application.

# Prerequisites
* Node.js (v14.x or higher) 
* npm (v6.x or higher)
* SSL Certificate (for production server)

# Server (Backend)
# Environment Variables
To run the server properly, a `.env` file is required. This file should contain all necessary environment variables. Please contact the developer for the specific `.env` file content.
# Development Server
To start the development server, run:
```bash
  npm start
```
# Production Server
To start the production server, follow these steps:
* Ensure you have an SSL certificate. Place your `key.pem` and `cert.pem` files in the `cert` folder located in the server directory.
* Run the following command:
    ```bash
    npm run start:prod
    ```

# Frontend 
# Configuration
Before running the development or production build, update the `IP.ts` file located in the `utils` folder with the appropriate URLs:
* Set the `API` constant to your backend server hosted URL.
* Set the `CLIENT` constant to your client server hostname URL.
```
 export const IP ={
    API:"https://your-backend-server-url/api/v1/",
    CLIENT:"https://your-client-server-url"
}
```
# Environment Variables
Add `GENERATE_SOURCEMAP=false` in `.env`
# Development Server
To start the frontend development server, run:

```bash
   npm start
```
Build
```bash
   npm run build

```
# Serving the Build
To serve the `built` files, you can use `pm2` `serve` or the `serve` `npm` library. Below are instructions for both methods:
* Using `pm2` `serve`
      
    1. Install `pm2` globally if you haven't already:
    ```bash
     npm install -g pm2

    ```
    2. Serve the build files using `pm2`:
    ```bash
     pm2 serve build 3000 --spa

    ```
* Using `serve`

    1. Install `serve` globally if you haven't already:
    ```bash
     npm install -g serve

    ```
    2. Serve the build files using `serve`:
    ```bash
     serve -s build

    ```
# Add Azure database in docker 
Change User Name and Password
```
docker run -e "ACCEPT_EULA=1" -e "MSSQL_SA_PASSWORD=XYXYX" -e "MSSQL_PID=Developer" -e "MSSQL_USER=User" -p 1433:1433 -d --name=sql mcr.microsoft.com/azure-sql-edge

```
