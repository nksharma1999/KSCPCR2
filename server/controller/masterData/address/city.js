

export const addNewCity =(req,res) =>{
    console.log(req.body);
    res.status(200).json("add City");
}
export const getCityList =(req,res) =>{
    // console.log(req.body);
    res.status(200).json("City list");
}
export const updateCity =(req,res) =>{
    // console.log(req.body);
    res.status(200).json("Update");
}
export const removeCity =(req,res) =>{
    // console.log(req.body);
    res.status(200).json("removeCity");
}