import { useState } from "react";
import { useParams } from "react-router-dom";

const CaseDetails = () => {
  const { id } = useParams();
  const [editId, setEditId] = useState<number>(0);
  const handlEdit = (id: number) => {
    if(id===editId){
        setEditId(0);
    }else{

        setEditId(id);
    }
  };
  return (
    <>
      <div className={"card "} style={{ padding: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h6 style={{ color: `${editId === 1 ? "green":'black'}` }}>
            Child Information
          </h6>
          <button className="btn" onClick={() => handlEdit(1)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={"ABCD"}
                  disabled={editId === 1 ? false : true}
                />
                <label htmlFor="floatingInput">Child's Name</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInput2"
                  placeholder="name@example.com"
                  value={24}
                  disabled={editId === 1 ? false : true}
                />
                <label htmlFor="floatingInput2">Age</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingInput3"
                  placeholder="name@example.com"
                  value={"2000-12-12"}
                  disabled={editId === 1 ? false : true}
                />
                <label htmlFor="floatingInput3">Date of Birth</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect0"
                  aria-label="Floating label select example"
                  disabled={editId === 1 ? false : true}
                >
                  <option value="select">--- Select Gender ---</option>
                  <option value="male" selected>
                    Male
                  </option>
                  <option value="female">Female</option>
                </select>
                <label htmlFor="floatingSelect0">Gender</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput5"
                  placeholder="name@example.com"
                  value={"XYZ"}
                  disabled={editId === 1 ? false : true}
                />
                <label htmlFor="floatingInput5">Guradian / Caretaker</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput6"
                  placeholder="name@example.com"
                  value={"HJS"}
                  disabled={editId === 1 ? false : true}
                />
                <label htmlFor="floatingInput6">Educational Background</label>
              </div>
            </div>
            <div className=" col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput7"
                  placeholder="name@example.com"
                  value={"Vill+Po"}
                  disabled={editId === 1 ? false : true}
                />
                <label htmlFor="floatingInput7">Address </label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  disabled={editId === 1 ? false : true}
                >
                  <option value="select">--- Select State ---</option>
                  <option value="karnataka" selected>
                    karnataka
                  </option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <label htmlFor="floatingSelect">State</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect2"
                  aria-label="Floating label select example"
                  disabled={editId === 1 ? false : true}
                >
                  <option value="select">--- Select City ---</option>
                  <option value="Bagalkot" selected>
                    Bagalkot
                  </option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <label htmlFor="floatingSelect2">City</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect3"
                  aria-label="Floating label select example"
                  disabled={editId === 1 ? false : true}
                >
                  <option value="select">--- Select Taluk ---</option>
                  <option value="Badami" selected>
                    Badami
                  </option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <label htmlFor="floatingSelect3">Taluk</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect3"
                  aria-label="Floating label select example"
                  disabled={editId === 1 ? false : true}
                >
                  <option value="select">--- Select Village ---</option>
                  <option value="Bandakeri" selected>
                    Bandakeri
                  </option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <label htmlFor="floatingSelect3">Village</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"card "} style={{ padding: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h6 style={{ color: `${editId === 2 ? "green":'black'}` }}>
          Case Details
          </h6>
          <button className="btn" onClick={() => handlEdit(2)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={13324}
                  disabled
                />
                <label htmlFor="floatingInput">Case ID</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput2"
                  placeholder="name@example.com"
                  value={"SHBCGD"}
                  disabled={editId === 2 ? false : true}
                />
                <label htmlFor="floatingInput2">Case Title</label>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect0"
                  aria-label="Floating label select example"
                  disabled={editId === 2 ? false : true}
                >
                  <option value="select">--- Select Case Type ---</option>
                  <option value="Child Protection" selected>
                    Child Protection
                  </option>
                  <option value="Child Custody">Child Custody</option>
                  <option value="Child Labour">Child Labour</option>
                  <option value="Child Abuse">Child Abuse</option>
                </select>
                <label htmlFor="floatingSelect0">Case Type</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect01"
                  aria-label="Floating label select example"
                  disabled={editId === 2 ? false : true}
                >
                  <option value="select">--- Select Case Priority ---</option>
                  <option value="High" selected>
                    High
                  </option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <label htmlFor="floatingSelect01">Case Priority</label>
              </div>
            </div>

            <div className=" col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput7"
                  placeholder="name@example.com"
                  value={"HHD"}
                  disabled={editId === 2 ? false : true}
                />
                <label htmlFor="floatingInput7">Case Description </label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput6"
                  placeholder="name@example.com"
                  value={"HHDGD"}
                  disabled={editId === 2 ? false : true}
                />
                <label htmlFor="floatingInput6">Court Name</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput7"
                  placeholder="name@example.com"
                  value={"DHJVD"}
                  disabled={editId === 2 ? false : true}
                />
                <label htmlFor="floatingInput7">Jurisdiction</label>
              </div>
            </div>
            <div className=" col-12">
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect3"
                  aria-label="Floating label select example"
                  disabled={editId === 2 ? false : true}
                >
                  <option value="select">--- Select Case Status ---</option>
                  <option value="Open" selected>
                    Open
                  </option>
                  <option value="Closed">Closed</option>
                  <option value="Pending">Pending</option>
                </select>
                <label htmlFor="floatingSelect3">Case Status</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"card "} style={{ padding: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h6 style={{ color: `${editId === 3 ? "green":'black'}` }}>
          Legal Representation
          </h6>
          <button className="btn" onClick={() => handlEdit(3)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={"HJHDG"}
                  disabled={editId === 3 ? false : true}
                />
                <label htmlFor="floatingInput">Lawyer</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput2"
                  placeholder="name@example.com"
                  value={"GHJDG"}
                  disabled={editId === 3 ? false : true}
                />
                <label htmlFor="floatingInput2">Petitioner</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput3"
                  placeholder="name@example.com"
                  value={"JGHJD"}
                  disabled={editId === 3 ? false : true}
                />
                <label htmlFor="floatingInput3">Respondent</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput4"
                  placeholder="name@example.com"
                  value={"JHKJD"}
                  disabled={editId === 3 ? false : true}
                />
                <label htmlFor="floatingInput4">
                  Legal Aid Details (if appl)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"card "} style={{ padding: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h6 style={{ color: `${editId === 4 ? "green":'black'}` }}>
          Child Protection Measures
          </h6>
          <button className="btn" onClick={() => handlEdit(4)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                   disabled={editId === 4 ? false : true}
                />
                <label htmlFor="floatingInput">Protection Orders</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="floatingInput2"
                  placeholder="name@example.com"
                   disabled={editId === 4 ? false : true}
                />
                <label htmlFor="floatingInput2">Placement Orders</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="floatingInput3"
                  placeholder="name@example.com"
                   disabled={editId === 4 ? false : true}
                />
                <label htmlFor="floatingInput3">Restraining Ordera</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"card "} style={{ padding: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h6 style={{ color: `${editId === 5 ? "green":'black'}` }}>
          Evidence and Documentation
          </h6>
          <button className="btn" onClick={() => handlEdit(5)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                   disabled={editId === 5 ? false : true}
                />
                <label htmlFor="floatingInput">Medical Reports</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="floatingInput2"
                  placeholder="name@example.com"
                   disabled={editId === 5 ? false : true}
                />
                <label htmlFor="floatingInput2">Witness Statements</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="floatingInput42"
                  placeholder="name@example.com"
                   disabled={editId === 5 ? false : true}
                />
                <label htmlFor="floatingInput42">Police Reports</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="floatingInput3"
                  placeholder="name@example.com"
                   disabled={editId === 5 ? false : true}
                />
                <label htmlFor="floatingInput3">Photographs or Evidence</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="floatingInput4"
                  placeholder="name@example.com"
                   disabled={editId === 5 ? false : true}
                />
                <label htmlFor="floatingInput4"> Child's Testimony </label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="floatingInput5"
                  placeholder="name@example.com"
                   disabled={editId === 5 ? false : true}
                />
                <label htmlFor="floatingInput5"> School Records </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"card "} style={{ padding: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h6 style={{ color: `${editId === 6 ? "green":'black'}` }}>
          Case Management
          </h6>
          <button className="btn" onClick={() => handlEdit(6)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={"2024-04-23"}
                  disabled={editId === 6 ? false : true}
                />
                <label htmlFor="floatingInput">Case Timeline</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingInput2"
                  placeholder="name@example.com"
                  value={"2024-04-23"}
                  disabled={editId === 6 ? false : true}
                />
                <label htmlFor="floatingInput2">Next Hearing Date</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput42"
                  placeholder="name@example.com"
                  value={"GJHFGJ"}
                  disabled={editId === 6 ? false : true}
                />
                <label htmlFor="floatingInput42">Next Steps and Action</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput3"
                  placeholder="name@example.com"
                  value={"BJKF"}
                  disabled={editId === 6 ? false : true}
                />
                <label htmlFor="floatingInput3">Task Assignment</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput4"
                  placeholder="name@example.com"
                  value={"HJKHKJ"}
                  disabled={editId === 6 ? false : true}
                />
                <label htmlFor="floatingInput4">Case Notes & Updates </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"card "} style={{ padding: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h6 style={{ color: `${editId === 7 ? "green":'black'}` }}>
          Court Orders & Judgements
          </h6>
          <button className="btn" onClick={() => handlEdit(7)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  disabled={editId === 7 ? false : true}
                />
                <label htmlFor="floatingInput">Court Orders</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="floatingInput2"
                  placeholder="name@example.com"
                  disabled={editId === 7 ? false : true}
                />
                <label htmlFor="floatingInput2">Judgements</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"card "} style={{ padding: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h6 style={{ color: `${editId === 8 ? "green":'black'}` }}>
          Monitoring and Follow-up
          </h6>
          <button className="btn" onClick={() => handlEdit(8)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={"HKJHKJF"}
                  disabled={editId === 8 ? false : true}
                />
                <label htmlFor="floatingInput">Post case Monitoring</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput2"
                  placeholder="name@example.com"
                  value={"GGDKH"}
                  disabled={editId === 8 ? false : true}
                />
                <label htmlFor="floatingInput2">Follow-up Action </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CaseDetails;
