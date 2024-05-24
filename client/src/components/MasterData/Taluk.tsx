import { useEffect, useState } from "react";
import { AddTaluk } from "./DataEntry/AddTaluk";
import axios from "axios";
import { IP } from "../utils/IP";
import { EditInfo, EditinfoInterface } from "./DataEntry/EditInfo";
import { getToken } from "../utils/getToken";

export interface TalukInterface {
  TalukId: number;
  Taluk: string;
}

const Taluk = () => {
  const [TalukList, setTalukList] = useState<TalukInterface[]>([]);
  const [isNewTaluk, setNewTaluk] = useState<boolean>(false);
  const [showEditPage, setShowEditPage] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<EditinfoInterface>({
    id: 0,
    name: "",
  });
  const showAddNewDataEntryView = () => {
    setNewTaluk(true);
  };
  const closeNewRolePage = () => {
    setNewTaluk(false);
  };
  const handleEdit = (info: TalukInterface) => {
    setEditInfo({
      id: info.TalukId,
      name: info.Taluk,
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
  const handleDeleteState = (info: TalukInterface) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Taluk? \n" + "Name: " + info.Taluk
    );

    if (userConfirmed) {
      axios
        .delete(IP.API + "taluk/" + info.TalukId,{
          headers: {
            "x-access-token": getToken(),
          },
        })
        .then((res) => {
          console.log(res.data);
          getTalukList();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const updateInfo = (info: EditinfoInterface) => {
    const body = {
      talukName: info.name,
    };
    axios
      .put(IP.API + "taluk/" + info.id, body,{
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        console.log(res.data);
        closeEditPage();
        getTalukList();
      })
      .catch((error) => {
        console.error(error);
        closeEditPage();
      });
  };
  const getTalukList = () => {
    axios
      .get(IP.API + "taluk",{
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        setTalukList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getTalukList();
  }, []);
  return (
    <>
      <div>
        {/* <h3>Taluk</h3> */}
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
            <p style={{ fontSize: "20px" }}> Taluk List</p>
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
                  <th scope="col">Taluk Name</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {TalukList.map((val, index) => {
                  return (
                    <tr key={index} className="tableFirstThStyle">
                      <th scope="row">{index + 1}</th>
                      <td>{val.Taluk}</td>

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
      {isNewTaluk && <AddTaluk closeAddComponent={closeNewRolePage} />}
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

export default Taluk;
