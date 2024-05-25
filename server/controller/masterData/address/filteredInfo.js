import {
  dbGetFilterCityBtStateList,
  dbGetFilterDistrictList,
  dbGetFilterCityList,
  dbGetFilterTalukList,
  dbGetFilterVillageList
} from "../../../dbOperation/dbOperation.js";
export const getFilterTalukList = (req, res) => {
  const { cityId } = req.params;
  if (cityId) {
    dbGetFilterTalukList(cityId)
      .then((result) => {
        res.status(200).json(result.recordset);
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Please Provide Data");
  }
};
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
  } else {
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
  } else {
    res.status(400).json("Please Provide Data");
  }
};
export const getCityListByState = (req, res) => {
  const { stateId } = req.params;
  if (stateId) {
    dbGetFilterCityBtStateList(stateId)
      .then((result) => {
        res.status(200).json(result.recordset);
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Please Provide Data");
  }
};
export const getFilterVillageList = (req, res) => {
  const { talukId } = req.params;
  if (talukId) {
    dbGetFilterVillageList(talukId)
      .then((result) => {
        res.status(200).json(result.recordset);
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Please Provide Data");
  }
};
