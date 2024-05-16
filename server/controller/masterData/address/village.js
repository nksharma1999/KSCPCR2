

export const addNewVillage =(req,res) =>{
    console.log(req.body);
    res.status(200).json("Village");
}
export const getVillageList =(req,res) =>{
    // console.log(req.body);
    res.status(200).json("Village");
}
export const updateVillage =(req,res) =>{
    // console.log(req.body);
    res.status(200).json("updateVillage");
}
export const removeVillage =(req,res) =>{
    // console.log(req.body);
    res.status(200).json("removeVillage");
}