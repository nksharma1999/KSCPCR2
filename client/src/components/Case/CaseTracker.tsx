import { useNavigate } from "react-router-dom";

const CaseTracker = () => {
  const navigate = useNavigate();
  const openCaseDetails = (id: any) => {
    navigate(`/case/case-tracker/${id}`);
  };
  return (
    <div>
      <h3>Dashboard</h3>
      <div className={"card "} style={{ padding: "10px" }}>
        <div>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
        <div
          style={{
            height: "1px",
            width: "100%",
            margin: "5px 0px",
            background: "gray",
          }}
        ></div>
        <div style={{ width: "100%", overflow: "auto" }}>
          <table className="table table-striped table-hover table-bordered">
            <thead style={{ background: "#6c5ea5", color: "white" }}>
              <tr>
                <th scope="col">Child's Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Address</th>
                <th scope="col">Case ID</th>
                <th scope="col">Case Title</th>
                <th scope="col">Case Type</th>
                <th scope="col">Case Status</th>
                <th scope="col">Next Hearing Date</th>
                <th scope="col">Case Status</th>
                {/* <th scope="col">Action</th> */}
              </tr>
            </thead>
            <tbody>
              <tr onClick={() => openCaseDetails(123445)}>
                <th scope="row">ABCD</th>
                <td>M</td>
                <td>Otto</td>
                <td>123434</td>
                <td>Mark</td>
                <td>Child Labour</td>
                <td>Open</td>
                <td>12-04-2024</td>
                <td>Progress</td>

                {/* <td>
                  <button
                    className="btn"
                    onClick={() => openCaseDetails(123434)}
                  >
                    <i className="fa-solid fa-info"></i>
                  </button>
                </td> */}
              </tr>

              <tr onClick={() => openCaseDetails(123445)}>
                <th scope="row">ABCDD</th>
                <td>F</td>
                <td>Otto</td>
                <td>123445</td>
                <td>Mark</td>
                <td>Child Labour</td>
                <td>Open</td>
                <td>12-04-2024</td>
                <td>Progress</td>
                {/* <td>
                  <button
                    className="btn"
                    onClick={() => openCaseDetails(123445)}
                  >
                    <i className="fa-solid fa-info"></i>
                  </button>
                </td> */}
              </tr>

              <tr onClick={() => openCaseDetails(123435)}>
                <th scope="row">ABCDD</th>
                <td>M</td>
                <td>Otto</td>
                <td>123435</td>
                <td>Mark</td>
                <td>Child Labour</td>
                <td>Open</td>
                <td>12-04-2024</td>
                <td>Progress</td>
                {/* <td>
                  <button
                    className="btn"
                    onClick={() => openCaseDetails(123435)}
                  >
                    <i className="fa-solid fa-info"></i>
                  </button>
                </td> */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CaseTracker;
