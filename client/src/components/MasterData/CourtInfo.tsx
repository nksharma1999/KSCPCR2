import { useEffect, useState } from "react";
import { AddCourtInfo } from "./DataEntry/AddCourtInfo";
import axios from "axios";
import { IP } from "../utils/IP";
import { EditInfo, EditinfoInterface } from "./DataEntry/EditInfo";
import { getToken } from "../utils/getToken";

export interface CourtInterface {
  CourtId: number;
  CourtName: string;
}

 export const CourtInfo = () => {
  const [CourtList, setCourtList] = useState<CourtInterface[]>([]);
  const [jurisdictionList, setjurisdictionList] = useState<CourtInterface[]>([]);
  const [isNewCourt, setNewCourt] = useState<boolean>(false);
  const [showEditPage, setShowEditPage] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<EditinfoInterface>({
    id: 0,
    name: "",
  });

  const showAddNewDataEntryView = () => {
    setNewCourt(true);
  };
  const closeNewRolePage = () => {
    setNewCourt(false);
  };

  // const closeNewCourtPage = () => {
  //   setNewCourt(false);
  // };

  const handleEdit = (info: CourtInterface) => {
    setEditInfo({
      id: info.CourtId,
      name: info.CourtName,
    });
    setShowEditPage(true);
  };

  const closeEditPage = () => {
    setEditInfo({ id: 0, name: "" });
    setShowEditPage(false);
  };

  const updateInfo = (info: EditinfoInterface) => {
    const body = {
      courtName: info.name,
    };
    axios
      .put(IP.API + "court/" + info.id, body, {
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        console.log(res.data);
        closeEditPage();
        getCourtList();
      })
      .catch((error) => {
        console.error(error);
        closeEditPage();
      });
  };

  const getCourtList = () => {
    axios
      .get(IP.API + "court", {
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((data) => {
        setCourtList(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteCourt = (info: CourtInterface) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Court? \n" + "Name: " + info.CourtName
    );

    if (userConfirmed) {
      axios
        .delete(IP.API + "court/" + info.CourtId, {
          headers: {
            "x-access-token": getToken(),
          },
        })
        .then((res) => {
          console.log(res.data);
          getCourtList();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    getCourtList();
  }, []);

  return (
    <>
      <div>
        <div className={"card "} style={{ maxHeight: "80vh", padding: "10px" }}>
          <div
            style={{
              paddingBottom: "0px",
              borderRadius: "0.3px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <p style={{ fontSize: "20px" }}>Court List</p>
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
          <div style={{ border: "0.6px solid #DFDFDF", marginTop: "0px" }}></div>
          <div className="ActionTakenDashboard" style={{ overflow: "auto", marginTop: "10px" }}>
            <table className="table table-bordered" style={{ width: "100%" }}>
              <thead className="table-format tableHeader">
                <tr className="tableHeaderStyle">
                  <th scope="col" style={{ width: "20px" }}>Sl. No.</th>
                  <th scope="col">Court Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {CourtList.map((val, index) => {
                  return (
                    <tr key={index} className="tableFirstThStyle">
                      <th scope="row">{index + 1}</th>
                      <td>{val.CourtName}</td>
                      <td style={{ textAlign: "center", cursor: "pointer" }}>
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
                          onClick={() => handleDeleteCourt(val)}
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
      {isNewCourt && <AddCourtInfo closeAddComponent={closeNewRolePage} />}
      {showEditPage && (
        <EditInfo
          closeEditCmp={closeEditPage}
          title="courtInfo"
          info={editInfo}
          updateInfo={updateInfo}
        />
      )}
      <div>
        {/* <h3>State</h3> */}
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
            <p style={{ fontSize: "20px" }}> Jurisdiction List</p>
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
                  <th scope="col">Jurisdiction Name</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {jurisdictionList.map((val, index) => {
                  return (
                    <tr key={index} className="tableFirstThStyle">
                      <th scope="row">{index + 1}</th>
                      <td>{val.CourtName}</td>

                      <td
                        style={{
                          textAlign: "center",

                          cursor: "pointer",
                        }}
                      >
                        <button
                          //   onClick={() => handleEdit(val)}
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
     {/* {isNewCourt && <AddCourtInfo closeAddComponent={closeNewRolePage} />}
      {showEditPage && (
        <EditInfo
          closeEditCmp={closeEditPage}
          title="courtInfo"
          info={editInfo}
          updateInfo={updateInfo}
        />
      )} */}
      {/* {showEditPage && <EditState closeAddComponent={closeEditPage} info={editInfo} />} */}
    </>
  );
};
export default CourtInfo;
