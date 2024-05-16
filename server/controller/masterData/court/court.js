

export const addNewCourt =(req,res) =>{
    console.log(req.body);
    res.status(200).json("Court");
}
export const getCourtList =(req,res) =>{
    // console.log(req.body);
    res.status(200).json("Court");
}