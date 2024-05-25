import { useEffect, useState } from "react";
import { AddState } from "./DataEntry/AddState";
import { AddDistrict } from "./DataEntry/AddDistrict";
import axios from "axios";
import { IP } from "../utils/IP";
import { EditInfo, EditinfoInterface } from "./DataEntry/EditInfo";
import { getToken } from "../utils/getToken";
import { LoadingToast, UpdateToastInfo } from "../utils/CustomeToast";

export interface DistrictInterface {
  StateId: number;
  District: string;
  DistrictId: number;
}
const District = () => {
  const [DistrictList, setDistrictList] = useState<DistrictInterface[]>([]);
  const [isNewDistrict, setNewDistrict] = useState<boolean>(false);
  const [showEditPage, setShowEditPage] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<EditinfoInterface>({
    id: 0,
    name: "",
  });
  const showAddNewDataEntryView = () => {
    setNewDistrict(true);
  };
  const closeNewRolePage = () => {
    setNewDistrict(false);
  };
  const handleEdit = (info: DistrictInterface) => {
    setEditInfo({ id: info.DistrictId, name: info.District });
    setShowEditPage(true);
  };
  const closeEditPage = () => {
    setEditInfo({
      id: 0,
      name: "",
    });
    setShowEditPage(false);
  };
  const handleDeleteState = (info: DistrictInterface) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this District? \n" +
        "Name: " +
        info.District
    );

    if (userConfirmed) {
      const id  = LoadingToast();
      axios
        .delete(IP.API + "district/" + info.DistrictId,{
          headers: {
            "x-access-token": getToken(),
          },
        })
        .then((res) => {
          UpdateToastInfo(id,res.data,'success');
          getDistrictList();
        })
        .catch((error) => {
          // console.error(error);
          UpdateToastInfo(id,'Data not deleted!','error')
        });
    }
  };
  const updateInfo = (info: EditinfoInterface) => {
    const body = {
      districtName: info.name,
    };
    const id = LoadingToast();
    axios
      .put(IP.API + "district/" + info.id, body,{
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        UpdateToastInfo(id,res.data,'success');
        closeEditPage();
        getDistrictList();
      })
      .catch((error) => {
        // console.error(error);
        UpdateToastInfo(id,'Data not updated','error');
        closeEditPage();
      });
  };
  const getDistrictList = () => {
    axios
      .get(IP.API + "district",{
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        setDistrictList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getDistrictList();
  }, []);
  return (
    <>
      <div>
        {/* <h3>District</h3> */}
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
            <p style={{ fontSize: "20px" }}> District List</p>
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
                  <th scope="col">District Name</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {DistrictList.map((val, index) => {
                  return (
                    <tr key={index} className="tableFirstThStyle">
                      <th scope="row">{index + 1}</th>
                      <td>{val.District}</td>

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
                          onClick={() => handleDeleteState(val)}
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
      {isNewDistrict && <AddDistrict closeAddComponent={closeNewRolePage} />}
      {showEditPage && (
        <EditInfo
          closeEditCmp={closeEditPage}
          title="District"
          info={editInfo}
          updateInfo={updateInfo}
        />
      )}
    </>
  );
};

export default District;
