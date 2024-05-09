import express from 'express';
import {createNewCase} from '../controller/createNewCase.js'
import multer from "multer";
import {createNewCasePdfType} from '../PDFType/createNewCasePdfType.js'
import {addNewState} from '../controller/masterData/address/addNewState.js';
const userRoutes = express.Router();
const fileUpload = multer({ dest: "uploads/" });

userRoutes.post("/addNewCase",fileUpload.fields(createNewCasePdfType),createNewCase)
//State
userRoutes.get("/state",addNewState);
userRoutes.post("/addNewState",addNewState);
//District
userRoutes.get("/district",addNewState);
userRoutes.post("/addNewDistrict",addNewState);
//City
userRoutes.get("/city",addNewState);
userRoutes.post("/addNewCity",addNewState);
//Taluk
userRoutes.get("/taluk",addNewState);
userRoutes.post("/addNewTaluk",addNewState);
//Village
userRoutes.get("/village",addNewState);
userRoutes.post("/addNewVillage",addNewState);

export default userRoutes;