

export const addNewTaluk =(req,res) =>{
    console.log(req.body);
    res.status(200).json("Taluk");
}
export const getTalukList =(req,res) =>{
    // console.log(req.body);
    res.status(200).json("Taluk");
}
export const updateTaluk =(req,res) =>{
    // console.log(req.body);
    res.status(200).json("updateTaluk");
}
export const removeTaluk =(req,res) =>{
    // console.log(req.body);
    res.status(200).json("removeTaluk");
}