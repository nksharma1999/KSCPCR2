import express from 'express';
import {createNewCase} from '../controller/createNewCase.js'
import multer from "multer";
import {addNewState,getStateList,updateState,removeState} from '../controller/masterData/address/state.js'
import {addNewDistrict,getDistrictList,updateDistrict,removeDistrict} from '../controller/masterData/address/district.js'
import {addNewCity,getCityList,updateCity,removeCity} from '../controller/masterData/address/city.js'
import {addNewTaluk,getTalukList,updateTaluk,removeTaluk} from '../controller/masterData/address/taluk.js'
import {addNewVillage,getVillageList,updateVillage,removeVillage} from '../controller/masterData/address/village.js'
import {addNewCourt,getCourtList,removeCourt,updateCourt} from '../controller/masterData/court/court.js'
import {addNewJurisdiction,getJurisdictionList,removeJurisdiction,updateJurisdiction} from '../controller/masterData/court/jurisdiction.js'
import {createNewCasePdfType} from '../PDFType/createNewCasePdfType.js'
import {updateChildInfo} from '../controller/caseInfoUpdate/updateChildInfo.js';
import {updateCaseDetails} from '../controller/caseInfoUpdate/updateCaseDetails.js';
import {updateLegalRepInfo} from '../controller/caseInfoUpdate/updateLegalRepInfo.js';
import {updateProtectionMeasuresPdf} from '../controller/caseInfoUpdate/updateProtectionMeasuresPdf.js';
import {updateEvidencePdf} from '../controller/caseInfoUpdate/updateEvidencePdf.js';
import {updateJudgementsPdf} from '../controller/caseInfoUpdate/updateJudgementsPdf.js';
import {updateCaseManagementInfo} from '../controller/caseInfoUpdate/updateCaseManagementInfo.js';
import {updatefollowUpInfo} from '../controller/caseInfoUpdate/updatefollowUpInfo.js';
import {getCaseList} from '../controller/Dashboard/getCaselist.js';
import {getCaseDetails} from '../controller/Dashboard/getCaseDetails.js';
import {getFilterDistrictList,getFilterCityList,getFilterTalukList} from '../controller/masterData/address/filteredInfo.js';
import {login,isUserLogin} from '../controller/Auth/login.js';
import {verifyJWT} from '../controller/Auth/verifyJWT.js';
import {createUser} from '../controller/Auth/createUser.js'
import {getDocInfo} from '../controller/Dashboard/getDocInfo.js';
const userRoutes = express.Router();
const fileUpload = multer({ dest: "uploads/" });

//Auth
userRoutes.post('/login',login);
userRoutes.post('/auth',isUserLogin);
userRoutes.post("/register",verifyJWT,createUser);
//Case Info
userRoutes.post("/addNewCase",verifyJWT,fileUpload.fields(createNewCasePdfType),createNewCase)
//Dashboard
userRoutes.get("/caselist",verifyJWT,getCaseList);
userRoutes.get('/case/:id',verifyJWT,getCaseDetails);
userRoutes.get("/case/docLink/:id",verifyJWT,getDocInfo);
userRoutes.put("/case/childInformation/:id",verifyJWT,updateChildInfo)
userRoutes.put("/case/caseDetails/:id",verifyJWT,updateCaseDetails)
userRoutes.put("/case/legal/:id",verifyJWT,updateLegalRepInfo)
userRoutes.put("/case/caseManagement/:id",verifyJWT,updateCaseManagementInfo)
userRoutes.put("/case/follow-up/:id",verifyJWT,updatefollowUpInfo)
userRoutes.put("/case/protectionMeasures/:id",verifyJWT,fileUpload.fields(createNewCasePdfType),updateProtectionMeasuresPdf)
userRoutes.put("/case/evidence/:id",verifyJWT,fileUpload.fields(createNewCasePdfType),updateEvidencePdf)
userRoutes.put("/case/judgements/:id",verifyJWT,fileUpload.fields(createNewCasePdfType),updateJudgementsPdf)

//State
userRoutes.get("/state",verifyJWT,getStateList);
userRoutes.post("/addNewState",verifyJWT,addNewState);
userRoutes.put("/state/:id",verifyJWT,updateState);
userRoutes.delete("/state/:id",verifyJWT,removeState);
//District
userRoutes.get("/district",verifyJWT,getDistrictList);
userRoutes.post("/addNewDistrict",verifyJWT,addNewDistrict);
userRoutes.put("/district/:id",verifyJWT,updateDistrict);
userRoutes.delete("/district/:id",verifyJWT,removeDistrict);
//City
userRoutes.get("/city",verifyJWT,getCityList);
userRoutes.post("/addNewCity",verifyJWT,addNewCity);
userRoutes.put("/city/:id",verifyJWT,updateCity);
userRoutes.delete("/city/:id",verifyJWT,removeCity);
//Taluk
userRoutes.get("/taluk",verifyJWT,getTalukList);
userRoutes.post("/addNewTaluk",verifyJWT,addNewTaluk);
userRoutes.put("/taluk/:id",verifyJWT,updateTaluk);
userRoutes.delete("/taluk/:id",verifyJWT,removeTaluk);
//Village
userRoutes.get("/village",verifyJWT,getVillageList);
userRoutes.post("/addNewVillage",verifyJWT,addNewVillage);
userRoutes.put("/village/:id",verifyJWT,updateVillage);
userRoutes.delete("/village/:id",verifyJWT,removeVillage);
//Court
userRoutes.get("/Court",verifyJWT,getCourtList);
userRoutes.post("/Court",verifyJWT,addNewCourt);
userRoutes.put("/Court/:id",verifyJWT,updateCourt);
userRoutes.delete("/Court/:id",verifyJWT,removeCourt);
//Jurisdiction
userRoutes.get("/Jurisdiction",verifyJWT,getJurisdictionList);
userRoutes.post("/Jurisdiction",verifyJWT,addNewJurisdiction);
userRoutes.put("/Jurisdiction/:id",verifyJWT,updateJurisdiction);
userRoutes.delete("/Jurisdiction/:id",verifyJWT,removeJurisdiction);
//Filter Master Info
userRoutes.get("/district/filter/:stateId",verifyJWT,getFilterDistrictList)
userRoutes.get("/city/filter/:districtId",verifyJWT,getFilterCityList)
userRoutes.get("/taluk/filter/:cityId",verifyJWT,getFilterTalukList)
export default userRoutes;