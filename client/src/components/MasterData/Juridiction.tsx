import { useEffect, useState } from "react";
import { AddJuridiction } from "./DataEntry/AddJudridiction";
import axios from "axios";
import { IP } from "../utils/IP";
import { EditInfo, EditinfoInterface } from "./DataEntry/EditInfo";
import { getToken } from "../utils/getToken";
import { LoadingToast, UpdateToastInfo } from "../utils/CustomeToast";

export interface JuridictionInterface {
  JurisdictionId: number;
  JurisdictionName: string;
  
}
 const Juridiction  = () => {
  const [JuridictionList, setJuridictionList] = useState<JuridictionInterface[]>([]);
  // console.log(JuridictionList);
  const [isNewJuridiction, setNewJuridiction] = useState<boolean>(false);
  const [showEditPage, setShowEditPage] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<EditinfoInterface>({
    id: 0,
    name: "",
  });
  const showAddNewDataEntryView = () => {
    setNewJuridiction(true);
  };
  const closeNewRolePage = () => {
    setNewJuridiction(false);
  };
  const handleEdit = (info: JuridictionInterface) => {
    setEditInfo({ id: info.JurisdictionId, name: info.JurisdictionName });
    setShowEditPage(true);
  };
  const closeEditPage = () => {
    setEditInfo({
      id: 0,
      name: "",
    });
    setShowEditPage(false);
  };
  const handleDeleteJuridiction = (info: JuridictionInterface) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Juridiction? \n" +
      "Name: " + info.JurisdictionName
    );

    if (userConfirmed) {
      const id = LoadingToast();
      axios
        .delete(IP.API + "Jurisdiction/" + info.JurisdictionId, {
          headers: {
            "x-access-token": getToken(),
          },
        })
        .then((res) => {
          UpdateToastInfo(id, res.data, 'success');
          getJuridictionList();
        })
        .catch((error) => {
          // console.error(error);
          UpdateToastInfo(id, 'Data not deleted!', 'error')
        });
    }
  };
  const updateInfo = (info: EditinfoInterface) => {
    const body = {
      jurisdictionName: info.name,
    };
    const id = LoadingToast();
    axios
      .put(IP.API + "Jurisdiction/" + info.id, body, {
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        UpdateToastInfo(id, res.data, 'success');
        closeEditPage();
        getJuridictionList();
      })
      .catch((error) => {
        // console.error(error);
        UpdateToastInfo(id, 'Data not updated', 'error');
        closeEditPage();
      });
  };
  const getJuridictionList = () => {
    axios
      .get(IP.API + "Jurisdiction", {
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        // console.log("res ", res.data);
        setJuridictionList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getJuridictionList();
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
                {JuridictionList.map((val, index) => {
                  // console.log("val " , val.JuridictionName);
                  return (
                    <tr key={index} className="tableFirstThStyle">
                      <td scope="row">{index + 1}</td>
                      <td>{val.JurisdictionName}</td>

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
                         onClick={() => handleDeleteJuridiction(val)}
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
       {isNewJuridiction && <AddJuridiction closeAddComponent={closeNewRolePage} />}
      {showEditPage && (
        <EditInfo
          closeEditCmp={closeEditPage}
          title="Juridiction"
          info={editInfo}
          updateInfo={updateInfo}
        />
      )}
    </>
  );
};

export default Juridiction;
