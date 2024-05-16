import { getDbConnection } from "../db/dbConnection.js";
export const dbGetCaseList = async(callback) =>{
    // select caseId,childName,gender,address,caseIdInput,caseTitle,caseType,caseStatus,nextHearingDate from CaseDetails;
    const pool = await getDbConnection();
    const request = pool.request();
    request.query('select caseId,childName,gender,address,caseIdInput,caseTitle,caseType,caseStatus,nextHearingDate from CaseDetails;',callback)
}

export const dbGetCaseDetails = async (id,callback)=>{
    const pool = await getDbConnection();
    const request = pool.request();
    request.query(`SELECT * from CaseDetails where caseId = '${id}';`,callback);
}