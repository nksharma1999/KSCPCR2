import { dbGetDocInfo } from "../../dbOperation/dbOperation.js";
export const getDocInfo = (req, res) => {
  const { id } = req.params;
  if (id) {
    dbGetDocInfo(id)
      .then((info) => {
        res.status(200).json(info.recordset);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }else{
    res.status(400).json("Please Provide case id");
  }
};
