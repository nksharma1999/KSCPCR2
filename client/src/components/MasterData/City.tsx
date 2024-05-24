import { useEffect, useState } from "react";
import { AddState } from "./DataEntry/AddState";
import { AddCity } from "./DataEntry/AddCity";
import axios from "axios";
import { IP } from "../utils/IP";
import { EditInfo, EditinfoInterface } from "./DataEntry/EditInfo";
import { getToken } from "../utils/getToken";

interface CityInterface {
  CityId: number;
  City: string;
}

const City = () => {
  const [CityList, setCityList] = useState<CityInterface[]>([]);
  const [isNewCity, setNewCity] = useState<boolean>(false);
  const [showEditPage, setShowEditPage] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<EditinfoInterface>({
    id: 0,
    name: "",
  });
  const showAddNewDataEntryView = () => {
    setNewCity(true);
  };
  const closeNewRolePage = () => {
    setNewCity(false);
  };
  const handleEdit = (info: CityInterface) => {
    setEditInfo({
      id: info.CityId,
      name: info.City,
    });
    setShowEditPage(true);
  };
  const closeEditPage = () => {
    setEditInfo({
      id: 0,
      name: "",
    });
    setShowEditPage(false);
  };
  const handleDeleteState = (info: CityInterface) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this City? \n" + "Name: " + info.City
    );

    if (userConfirmed) {
      axios
        .delete(IP.API + "city/" + info.CityId, {
          headers: {
            "x-access-token": getToken(),
          },
        })
        .then((res) => {
          console.log(res.data);
          getCityList();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const updateInfo = (info: EditinfoInterface) => {
    const body = {
      cityName: info.name,
    };
    axios
      .put(IP.API + "city/" + info.id, body, {
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        console.log(res.data);
        closeEditPage();
        getCityList();
      })
      .catch((error) => {
        console.error(error);
        closeEditPage();
      });
  };
  const getCityList = () => {
    axios
      .get(IP.API + "city", {
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        setCityList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getCityList();
  }, []);
  return (
    <>
      <div>
        {/* <h3>City</h3> */}
        <div className={"card "} style={{ maxHeight: "80vh", padding: "10px" }}>
          <div
            style={{
              paddingBottom: "0px",
              borderRadius: "0.3px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              // alignItems: "center",
            }}
          >
            <p style={{ fontSize: "20px" }}> City List</p>
            <div style={{ marginRight: "10px", marginTop: "0px" }}>
              <button
                onClick={showAddNewDataEntryView}
                style={{ backgroundColor: "white", borderWidth: "0" }}
              >
                <i
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  className="fa-solid fa-plus fa-fade buttonColorPrimary"
                ></i>
              </button>
            </div>
          </div>
          <div
            style={{ border: "0.6px solid #DFDFDF", marginTop: "0px" }}
          ></div>
          <div
            className="ActionTakenDashboard"
            style={{ overflow: "auto", marginTop: "10px" }}
          >
            <table className="table table-bordered" style={{ width: "100%" }}>
              <thead className="table-format tableHeader">
                <tr className="tableHeaderStyle">
                  <th scope="col" style={{ width: "20px" }}>
                    Sl. No.
                  </th>
                  <th scope="col">City Name</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {CityList.map((val, index) => {
                  return (
                    <tr key={index} className="tableFirstThStyle">
                      <th scope="row">{index + 1}</th>
                      <td>{val.City}</td>

                      <td
                        style={{
                          textAlign: "center",

                          cursor: "pointer",
                        }}
                      >
                        <button
                          onClick={() => handleEdit(val)}
                          className="btn"
                          style={{
                            backgroundColor: "white",
                            border: "none",
                            color: "green",
                          }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteState(val);
                          }}
                          className="btn"
                          style={{
                            backgroundColor: "white",
                            border: "none",
                            color: "gray",
                          }}
                        >
                          <i className="fa-solid fa-trash buttonColorPrimary"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isNewCity && <AddCity closeAddComponent={closeNewRolePage} />}
      {showEditPage && (
        <EditInfo
          closeEditCmp={closeEditPage}
          title="City"
          info={editInfo}
          updateInfo={updateInfo}
        />
      )}
    </>
  );
};

export default City;
