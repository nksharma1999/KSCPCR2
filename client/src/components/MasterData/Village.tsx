import { useEffect, useState } from "react";
import { AddVillage } from "./DataEntry/AddVillage";
import axios from "axios";
import { IP } from "../utils/IP";
import { EditInfo, EditinfoInterface } from "./DataEntry/EditInfo";
import { getToken } from "../utils/getToken";

export interface VillageInterface {
  VillageId: number;
  Village: string;
}
const Village = () => {
  const [VillageList, setVillageList] = useState<VillageInterface[]>([]);
  const [isNewVillage, setNewVillage] = useState<boolean>(false);
  const [showEditPage, setShowEditPage] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<EditinfoInterface>({
    id: 0,
    name: "",
  });
  const showAddNewDataEntryView = () => {
    setNewVillage(true);
  };
  const closeNewRolePage = () => {
    setNewVillage(false);
  };
  const handleEdit = (info: VillageInterface) => {
    setEditInfo({
      id:info.VillageId,
      name:info.Village
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
  const handleDeleteState = (info: VillageInterface) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Village? \n" +
        "Name: " +
        info.Village
    );

    if (userConfirmed) {
      axios
        .delete(IP.API + "village/" + info.VillageId,{
          headers: {
            "x-access-token": getToken(),
          },
        })
        .then((res) => {
          console.log(res.data);
          getVillageList();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const updateInfo = (info: EditinfoInterface) => {
    const body = {
      villageName: info.name,
    };
    axios
      .put(IP.API + "village/" + info.id, body,{
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        console.log(res.data);
        closeEditPage();
        getVillageList();
      })
      .catch((error) => {
        console.error(error);
        closeEditPage();
      });
  };
  const getVillageList = () => {
    axios
      .get(IP.API + "village",{
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        setVillageList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getVillageList();
  }, []);
  return (
    <>
      <div>
        {/* <h3>Village</h3> */}
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
            <p style={{ fontSize: "20px" }}> Village List</p>
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
                  <th scope="col">Village Name</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {VillageList.map((val, index) => {
                  return (
                    <tr key={index} className="tableFirstThStyle">
                      <th scope="row">{index + 1}</th>
                      <td>{val.Village}</td>

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
                        onClick={()=> handleDeleteState(val)}
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
      {isNewVillage && <AddVillage closeAddComponent={closeNewRolePage} />}
      {showEditPage && (
        <EditInfo
          closeEditCmp={closeEditPage}
          title="Taluk"
          info={editInfo}
          updateInfo={updateInfo}
        />
      )}
    </>
  );
};

export default Village;
