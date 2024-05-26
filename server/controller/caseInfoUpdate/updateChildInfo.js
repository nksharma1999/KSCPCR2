import { dbUpdateChildInfo } from "../../dbOperation/dbOperation.js";
export const updateChildInfo = (req, res) => {
  const { id } = req.params;
  const userInfo = req.userInfo;
  if (id) {
    dbUpdateChildInfo(req.params, req.body,userInfo)
      .then((info) => {
        res.status(200).json(info);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }else{
    res.status(400).json("Please Provide Data");
  }
};
