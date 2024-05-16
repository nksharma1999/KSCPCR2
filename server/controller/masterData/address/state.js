

export const addNewState =(req,res) =>{
    console.log(req.body);
    res.status(200).json("addNewState");
}
export const getStateList =(req,res) =>{
    // console.log(req.body);
    res.status(200).json("getStateList");
}
export const updateState =(req,res) =>{
    // console.log(req.body);
    res.status(200).json("updateState");
}
export const removeState =(req,res) =>{
    // console.log(req.body);
    res.status(200).json("removeState");
}