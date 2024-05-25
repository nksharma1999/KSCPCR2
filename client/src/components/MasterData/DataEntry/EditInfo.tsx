import React, { useEffect, useRef } from "react";
import { WarningToast } from "../../utils/CustomeToast";

export interface EditinfoInterface {
  id: number;
  name: string | undefined;
}

interface props {
  closeEditCmp: () => void;
  title: string;
  info: EditinfoInterface;
  updateInfo: (data: EditinfoInterface) => void;
}

export const EditInfo: React.FC<props> = ({
  closeEditCmp,
  title,
  info,
  updateInfo,
}) => {
  const stateNameInput = useRef<HTMLInputElement>(null);
  const handleUpdateBtn = () => {
    if (stateNameInput.current?.value !== "") {
      updateInfo({
        id: info.id,
        name: stateNameInput.current?.value,
      });
    }else{
      WarningToast(`Please Enter ${title} Name`);
    }
  };
  useEffect(() => {
    if (stateNameInput.current && info.name) {
      stateNameInput.current.value = info.name;
    }
  }, []);
  return (
    <div className="popup">
      <div
        className="popup-inner"
        style={{ overflowY: "auto", maxHeight: "100vh" }}
      >
        <div className="card" style={{ padding: "10px", maxWidth: "700px" }}>
          <div
            //   className="card-body"
            style={{
              // padding: "10px",
              borderRadius: "0.3px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              // alignItems: "center",
            }}
          >
            <div style={{ marginLeft: "10px" }}>
              <i
                className="fa-solid fa-building-columns"
                style={{ fontSize: "30px" }}
              ></i>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <p style={{ fontSize: "20px" }}> Update {title} Name </p>
            </div>
          </div>
          <div
            style={{ border: "0.6px solid #DFDFDF", marginTop: "-10px" }}
          ></div>
          <div style={{ marginTop: "10px" }}>
            <div className="row">
              <div className="col-12">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput1"
                    placeholder="Enter Bank Name"
                    ref={stateNameInput}
                  />
                  <label htmlFor="floatingInput1">{title} Name</label>
                </div>
              </div>
            </div>

            <div className="row" style={{ marginTop: "10px" }}>
              <div className="col-lg-6 col-md-6 col-12">
                <button
                  style={{
                    width: "100%",
                    backgroundColor: "red",
                    whiteSpace: "nowrap",
                  }}
                  onClick={closeEditCmp}
                >
                  Cancel
                </button>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <button
                  onClick={handleUpdateBtn}
                  style={{ width: "100%", backgroundColor: "#0A6862" }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
