
export const addNewState =(req,res) =>{
    console.log(req.body);
    res.status(200).json("State");
}