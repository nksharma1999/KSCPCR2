

export const addNewJurisdiction =(req,res) =>{
    console.log(req.body);
    res.status(200).json("Jurisdiction");
}
export const getJurisdictionList =(req,res) =>{
    // console.log(req.body);
    res.status(200).json("Jurisdiction");
}