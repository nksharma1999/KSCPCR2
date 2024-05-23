import {dbGetFilterDistrictList,dbGetFilterCityList} from '../../../dbOperation/dbOperation.js';
export const getFilterCityList = (req, res) => {
  const { districtId } = req.params;
  if (districtId) {
    dbGetFilterCityList(districtId)
      .then((result) => {
        res.status(200).json(result.recordset);
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json(error);
      });
  }else {
    res.status(400).json("Please Provide Data");
  }
};
export const getFilterDistrictList = (req, res) => {
  const { stateId } = req.params;
  if (stateId) {
    dbGetFilterDistrictList(stateId)
      .then((result) => {
        res.status(200).json(result.recordset);
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json(error);
      });
  }else {
    res.status(400).json("Please Provide Data");
  }
};
