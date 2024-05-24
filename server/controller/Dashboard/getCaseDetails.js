import {dbGetCaseDetails} from '../../dbOperation/dbOperation.js';
export const getCaseDetails =(req,res) =>{
    dbGetCaseDetails(req.params.id,(error,result)=>{
        if(error){
            res.status(500).json("Server Error");
            return;
        }
        res.status(200).json(result.recordset);
    })
}