
export const dbAddNewCase =(pdfIdsMap,req) =>{
    return new Promise((resolve,reject) =>{
        console.log(pdfIdsMap);
        // console.log(JSON.parse(req.body.data));
        console.log((req.body));
        resolve("Ok");
    });
}