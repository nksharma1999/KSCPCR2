import React from "react";
import { IP } from "../utils/IP";

interface props {
  pdfidUrl: string | undefined;
  closePop: () => void;
}
export const PdfView: React.FC<props> = ({ pdfidUrl, closePop }) => {
  return (
    <div className="popup">
      <div className="popup-inner" style={{ width: "100%" }}>
        <div
          style={{ position: "absolute", marginLeft: "60px", marginTop: "7px" }}
        >
          <button
            className="btn"
            onClick={closePop}
            style={{ background: "#323639" }}
          >
            <i
              style={{ color: "red", fontSize: "25px" }}
              className="fa-solid fa-xmark fa-beat-fade"
            ></i>
          </button>
        </div>
        <div style={{ width: "100%", height: "100vh" }}>
          <iframe
            src={pdfidUrl}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="PDF Viewer"
          />
        </div>
        {/* <div className="card" style={{ padding: "10px", maxWidth: "700px" }}>
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
              <p style={{ fontSize: "20px" }}> Add New State </p>
            </div>
          </div>
          <div
            style={{ border: "0.6px solid #DFDFDF", marginTop: "-10px" }}
          ></div>
          <div style={{ marginTop: "10px" }}>
            <div className="row">
              <div className="col-12">{pdfId}</div>
            </div>

            <div className="row" style={{ marginTop: "10px" }}>
              <div className="col-lg-6 col-md-6 col-12">
                <button
                  style={{
                    width: "100%",
                    backgroundColor: "red",
                    whiteSpace: "nowrap",
                  }}
                  onClick={closePop}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
