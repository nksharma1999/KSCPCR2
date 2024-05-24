import { useEffect, useState } from "react";
import { AddState } from "./DataEntry/AddState";
import axios from "axios";
import { IP } from "../utils/IP";
import { EditInfo, EditinfoInterface } from "./DataEntry/EditInfo";
import { getToken } from "../utils/getToken";

export interface StateInterface {
  StateId: number;
  State: string;
}

const State = () => {
  const [StateList, setStateList] = useState<StateInterface[]>([]);
  const [isNewState, setNewState] = useState<boolean>(false);
  const [showEditPage, setShowEditPage] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<EditinfoInterface>({
    id: 0,
    name: "",
  });
  const showAddNewDataEntryView = () => {
    setNewState(true);
  };
  const closeNewRolePage = () => {
    setNewState(false);
  };
  const handleEdit = (info: StateInterface) => {
    setEditInfo({
      id: info.StateId,
      name: info.State,
    });
    setShowEditPage(true);
  };
  const closeEditPage = () => {
    setEditInfo({ id: 0, name: "" });
    setShowEditPage(false);
  };
  const updateInfo = (info: EditinfoInterface) => {
    const body = {
      stateName: info.name,
    };
    axios
      .put(IP.API + "state/" + info.id, body, {
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        console.log(res.data);
        closeEditPage();
        getStateList();
      })
      .catch((error) => {
        console.error(error);
        closeEditPage();
      });
  };
  const getStateList = () => {
    axios
      .get(IP.API + "state", {
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((data) => {
        setStateList(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDeleteState = (info: StateInterface) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this State? \n" + "Name: " + info.State
    );

    if (userConfirmed) {
      axios
        .delete(IP.API + "state/" + info.StateId, {
          headers: {
            "x-access-token": getToken(),
          },
        })
        .then((res) => {
          console.log(res.data);
          getStateList();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  useEffect(() => {
    getStateList();
  }, []);
  return (
    <>
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
            <p style={{ fontSize: "20px" }}> State List</p>
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
                  <th scope="col">State Name</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {StateList.map((val, index) => {
                  return (
                    <tr key={index} className="tableFirstThStyle">
                      <th scope="row">{index + 1}</th>
                      <td>{val.State}</td>

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
      {isNewState && <AddState closeAddComponent={closeNewRolePage} />}
      {showEditPage && (
        <EditInfo
          closeEditCmp={closeEditPage}
          title="State"
          info={editInfo}
          updateInfo={updateInfo}
        />
      )}
    </>
  );
};

export default State;
