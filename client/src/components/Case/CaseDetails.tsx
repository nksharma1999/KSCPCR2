import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IP } from "../utils/IP";
import { getToken } from "../utils/getToken";
import { StateInterface } from "../MasterData/State";
import {
  InfoToast,
  LoadingToast,
  UpdateToastInfo,
  WarningToast,
} from "../utils/CustomeToast";
import { PdfView } from "./PdfView";

interface CaseDetailsMetaData {
  address: string;
  age: number;
  caseDescription: string;
  caseId: string;
  caseIdInput: string;
  caseNotesandUpdatesInput: string;
  casePriority: string;
  caseStatus: string;
  caseTimeline: string;
  caseTitle: string;
  caseType: string;
  childName: string;
  city: number;
  courtName: string;
  createdDate: Date;
  dob: string;
  educationalBg: string;
  followUpActionInput: string;
  gender: string;
  guradian: string;
  jurisdiction: string;
  lawyer: string;
  legalAidDetails: string;
  nextHearingDate: string;
  nextStepsandAction: string;
  petitioner: string;
  postCaseMonitoringInput: string;
  respondent: string;
  state: number;
  taluk: number;
  taskAssignment: string;
  village: number;
}
interface CityListInterface {
  City: string;
  CityId: number;
}
interface TalukListInterface {
  Taluk: string;
  TalukId: number;
}
interface VillageListInterface {
  Village: string;
  VillageId: number;
}
interface pdfInterface {
  courtOrdersPdf: string;
  judgementsPdf: string;
  medicalReportsPdf: string;
  photographsPdf: string;
  placementOrderPdf: string;
  policeReportsPdf: string;
  protectionOrderPdf: string;
  restrainingOrderPdf: string;
  schoolRecordsPdf: string;
  testimonyPdf: string;
  witnessStatementsPdf: string;
}
const CaseDetails = () => {
  const [StateList, setStateList] = useState<StateInterface[]>([]);
  const [CityList, setCityList] = useState<CityListInterface[]>([]);
  const [TalukList, setTalukList] = useState<TalukListInterface[]>([]);
  const [VillageList, setVillageList] = useState<VillageListInterface[]>([]);
  const [pdfList, setPdfList] = useState<pdfInterface>();
  const { id } = useParams();
  const [editId, setEditId] = useState<number>(0);
  const handlEdit = (id: number) => {
    if (id === editId) {
      setEditId(0);
    } else {
      setEditId(id);
    }
  };
  //Handle Page Number 1 Inputs
  const [childInformationInput, setChildInformationInput] = useState({
    childNameInput: "fdfghthe11",
    ageInput: "",
    dobInput: "",
    guradianInput: "",
    educationalBgInput: "",
    addressInput: "Solagidih chas bokaro",
  });
  const childInformationInputChange = (e: any) => {
    const { name, value } = e.target;
    setChildInformationInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [selectedGender, setSelectedGender] = useState<string>("male");
  const handleGenderChange = (e: any) => {
    setSelectedGender(e.target.value);
  };
  const [selectedState, setSelectedState] = useState<string>("select");
  const handleStateChange = (e: any) => {
    setSelectedState(e.target.value);
    if (e.target.value !== "select") {
      axios
        .get(IP.API + "city/filterByStateId/" + e.target.value, {
          headers: {
            "x-access-token": getToken(),
          },
        })
        .then((res) => {
          const data = res.data;
          setSelectedCity("select");
          setSelectedTaluk("select");
          setCityList(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const [selectedCity, setSelectedCity] = useState<string>("select");
  const handleCityChange = (e: any) => {
    setSelectedCity(e.target.value);
    if (e.target.value !== "select") {
      axios
        .get(IP.API + "taluk/filter/" + e.target.value, {
          headers: {
            "x-access-token": getToken(),
          },
        })
        .then((res) => {
          const data = res.data;
          setSelectedTaluk("select");
          setTalukList(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const [selectedTaluk, setSelectedTaluk] = useState<string>("select");
  const handleTalukChange = (e: any) => {
    setSelectedTaluk(e.target.value);
    if (e.target.value !== "select") {
      axios
        .get(IP.API + "village/filter/" + e.target.value, {
          headers: {
            "x-access-token": getToken(),
          },
        })
        .then((res) => {
          const data = res.data;
          setSelectedVillage("select");
          setVillageList(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const [selectedVillage, setSelectedVillage] = useState<string>("select");
  const handleVillageChange = (e: any) => {
    setSelectedVillage(e.target.value);
  };
  const saveChildInformation = () => {
    // alert(addressInput.current?.value);
    // alert(selectedVillage)
    const ChildInformationData = {
      ...childInformationInput,
      selectedGender: selectedGender,
      selectedState: selectedState,
      selectedCity: selectedCity,
      selectedTaluk: selectedTaluk,
      selectedVillage: selectedVillage,
    };
    const toastId = LoadingToast();
    axios
      .put(IP.API + "case/childInformation/" + id, ChildInformationData, {
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        UpdateToastInfo(toastId, res.data, "success");
      })
      .catch((err) => {
        UpdateToastInfo(toastId, "Child Info Not Updated", "error");
      });
  };
  const validateChildInformation = () => {
    const {
      childNameInput,
      ageInput,
      dobInput,
      guradianInput,
      educationalBgInput,
      addressInput,
    } = childInformationInput;
    if (
      !childNameInput ||
      !ageInput ||
      !dobInput ||
      !guradianInput ||
      !educationalBgInput ||
      !addressInput ||
      selectedGender === "select" ||
      selectedState === "select" ||
      selectedCity === "select" ||
      selectedTaluk === "select" ||
      selectedVillage === "select"
    ) {
      WarningToast("Please fill out all fields and select options.");
      return false;
    }
    return true;
  };

  const handleChildInformation = () => {
    if (validateChildInformation()) {
      // alert("child information Saved!");
      saveChildInformation();
    }
  };
  //Handle Page Number 2 Inputs
  const [caseDetailsInput, setCaseDetailsInput] = useState({
    caseIdInput: "",
    caseTitleInput: "",
    caseDescriptionInput: "",
    courtNameInput: "",
    jurisdictionInput: "",
  });
  const caseDetailsInputChange = (e: any) => {
    const { name, value } = e.target;
    setCaseDetailsInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [selectedCaseType, setSelectedCaseType] = useState<string>("select");
  const handleCaseTypeChange = (e: any) => {
    setSelectedCaseType(e.target.value);
  };
  const [selectedCasePriority, setSelectedCasePriority] =
    useState<string>("select");
  const handleCasePriorityChange = (e: any) => {
    setSelectedCasePriority(e.target.value);
  };
  const [selectedCaseStatus, setSelectedCaseStatus] =
    useState<string>("select");
  const handleCaseStatusChange = (e: any) => {
    setSelectedCaseStatus(e.target.value);
  };
  const saveCaseDetails = () => {
    // alert(caseIdInput.current?.value);
    // alert(selectedCaseStatus)
    const CaseDetailsData = {
      ...caseDetailsInput,
      selectedCaseType: selectedCaseType,
      selectedCasePriority: selectedCasePriority,
      selectedCaseStatus: selectedCaseStatus,
    };
    const toastId = LoadingToast();
    axios
      .put(IP.API + "case/caseDetails/" + id, CaseDetailsData, {
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        UpdateToastInfo(toastId, res.data, "success");
      })
      .catch((err) => {
        UpdateToastInfo(toastId, "Case Details Not Updated", "error");
      });
  };
  const validateCaseDetails = () => {
    const {
      caseIdInput,
      caseTitleInput,
      caseDescriptionInput,
      courtNameInput,
      jurisdictionInput,
    } = caseDetailsInput;
    if (
      !caseIdInput ||
      !caseTitleInput ||
      !caseDescriptionInput ||
      !courtNameInput ||
      !jurisdictionInput ||
      selectedCaseType === "select" ||
      selectedCasePriority === "select" ||
      selectedCaseStatus === "select"
    ) {
      WarningToast("Please fill out all fields and select options.");
      return false;
    }
    return true;
  };

  const handleCaseDetails = () => {
    if (validateCaseDetails()) {
      // alert("Case Details Saved!");
      saveCaseDetails();
    }
  };
  //Handle Page Number 3 Inputs
  const [legalRepresentationInput, setLegalRepresentationInput] = useState({
    lawyerInput: "",
    petitionerInput: "",
    respondentInput: "",
    legalAidDetailsInput: "",
  });
  const LegalRepresentationInputChange = (e: any) => {
    const { name, value } = e.target;
    setLegalRepresentationInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const saveLegalRepresentation = () => {
    // alert(legalRepresentationInput.lawyerInput);
    const toastId = LoadingToast();
    axios
      .put(IP.API + "case/legal/" + id, legalRepresentationInput, {
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        UpdateToastInfo(toastId, res.data, "success");
      })
      .catch((err) => {
        UpdateToastInfo(toastId, "Data Not Updated", "error");
      });
  };
  const validateLegalRepresentation = () => {
    const {
      lawyerInput,
      petitionerInput,
      respondentInput,
      legalAidDetailsInput,
    } = legalRepresentationInput;
    if (
      !lawyerInput ||
      !petitionerInput ||
      !respondentInput ||
      !legalAidDetailsInput
    ) {
      WarningToast("Update the required fields.");
      return false;
    }
    return true;
  };

  const handleLegalRepresentation = () => {
    if (validateLegalRepresentation()) {
      // alert("Legal Representation Saved!");
      saveLegalRepresentation();
    }
  };
  //Handle Page Number 4 Inputs
  const [protectionOrderPdf, setProtectionOrderPdf] = useState<File | null>(
    null
  );
  const handleProtectioOrdersPdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProtectionOrderPdf(e.target.files[0]);
    }
  };
  const [placementOrderPdf, setPlacementOrderPdf] = useState<File | null>(null);
  const handlePlacementOrdersPdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPlacementOrderPdf(e.target.files[0]);
    }
  };
  const [restrainingOrderPdf, setRestrainingOrderPdf] = useState<File | null>(
    null
  );
  const handleRestrainingOrdersPdfChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setRestrainingOrderPdf(e.target.files[0]);
    }
  };
  const saveChildProtectionMeasures = () => {
    const formData = new FormData();
    if (protectionOrderPdf)
      formData.append("protectionOrderPdf", protectionOrderPdf);
    if (placementOrderPdf)
      formData.append("placementOrderPdf", placementOrderPdf);
    if (restrainingOrderPdf)
      formData.append("restrainingOrderPdf", restrainingOrderPdf);
    const prevPdfId = {
      protectionOrderPdf: pdfList?.protectionOrderPdf,
      placementOrderPdf: pdfList?.placementOrderPdf,
      restrainingOrderPdf: pdfList?.restrainingOrderPdf,
    };
    formData.append("prevPdfId", JSON.stringify(prevPdfId));
    const toastId = LoadingToast();
    axios
      .put(IP.API + "case/protectionMeasures/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        UpdateToastInfo(toastId, res.data, "success");
      })
      .catch((err) => {
        UpdateToastInfo(toastId, "File Not Updated", "error");
      });
  };
  const validateChildProtectionMeasures = () => {
    if (!protectionOrderPdf || !placementOrderPdf || !restrainingOrderPdf) {
      alert("Please update all required PDFs in Child Protection Measures.");
      return false;
    }
    return true;
  };

  const handleChildProtectionMeasures = () => {
    // if (validateChildProtectionMeasures()) {
    //   alert("Child Protection Measures Saved!");
    // }
    saveChildProtectionMeasures();
  };
  //Handle Page Number 5 Inputs
  const [medicalReportsPdf, setMedicalReportsPdf] = useState<File | null>(null);
  const handleMedicalReportsPdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMedicalReportsPdf(e.target.files[0]);
    }
  };
  const [witnessStatementsPdf, setWitnessStatementsPdf] = useState<File | null>(
    null
  );
  const handleWitnessStatementsPdfChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setWitnessStatementsPdf(e.target.files[0]);
    }
  };
  const [policeReportsPdf, setPoliceReportsPdf] = useState<File | null>(null);
  const handlePoliceReportsPdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPoliceReportsPdf(e.target.files[0]);
    }
  };
  const [photographsPdf, setPhotographsPdf] = useState<File | null>(null);
  const handlePhotographsPdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotographsPdf(e.target.files[0]);
    }
  };
  const [testimonyPdf, setTestimonyPdf] = useState<File | null>(null);
  const handleTestimonyPdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTestimonyPdf(e.target.files[0]);
    }
  };
  const [schoolRecordsPdf, setSchoolRecordsPdf] = useState<File | null>(null);
  const handleSchoolRecordsPdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSchoolRecordsPdf(e.target.files[0]);
    }
  };
  const saveEvidence = () => {
    const formData = new FormData();
    if (medicalReportsPdf)
      formData.append("medicalReportsPdf", medicalReportsPdf);
    if (witnessStatementsPdf)
      formData.append("witnessStatementsPdf", witnessStatementsPdf);
    if (policeReportsPdf) formData.append("policeReportsPdf", policeReportsPdf);
    if (photographsPdf) formData.append("photographsPdf", photographsPdf);
    if (testimonyPdf) formData.append("testimonyPdf", testimonyPdf);
    if (schoolRecordsPdf) formData.append("schoolRecordsPdf", schoolRecordsPdf);
    const prevPdfId = {
      medicalReportsPdf: pdfList?.medicalReportsPdf,
      witnessStatementsPdf: pdfList?.witnessStatementsPdf,
      policeReportsPdf: pdfList?.policeReportsPdf,
      photographsPdf: pdfList?.photographsPdf,
      testimonyPdf: pdfList?.testimonyPdf,
      schoolRecordsPdf: pdfList?.schoolRecordsPdf,
    };
    formData.append("prevPdfId", JSON.stringify(prevPdfId));
    const toastId = LoadingToast();
    axios
      .put(IP.API + "case/evidence/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        UpdateToastInfo(toastId, res.data, "success");
      })
      .catch((err) => {
        UpdateToastInfo(toastId, "File Not Updated", "error");
      });
  };
  const validateEvidence = () => {
    if (
      !medicalReportsPdf ||
      !witnessStatementsPdf ||
      !policeReportsPdf ||
      !photographsPdf ||
      !testimonyPdf ||
      !schoolRecordsPdf
    ) {
      alert("Please update all required PDFs in Evidence and Documentation.");
      return false;
    }
    return true;
  };

  const handleEvidence = () => {
    // if (validateEvidence()) {
    //   alert("Evidence and Documentation Saved!");
    // }
    saveEvidence();
  };

  //Handle Page Number 6 Inputs

  const [caseManagementInput, setCaseManagementInput] = useState({
    caseTimelineInput: "",
    nextHearingDateInput: "",
    nextStepsandActionInput: "",
    taskAssignmentInput: "",
    caseNotesandUpdatesInput: "",
  });
  const CaseManagementInputChange = (e: any) => {
    const { name, value } = e.target;
    setCaseManagementInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const saveCaseManagement = () => {
    // alert(caseManagementInput.caseNotesandUpdatesInput)
    const toastId = LoadingToast();
    axios
      .put(IP.API + "case/caseManagement/" + id, caseManagementInput, {
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        UpdateToastInfo(toastId, res.data, "success");
      })
      .catch((err) => {
        UpdateToastInfo(toastId, "Case Management Info Not Updated", "error");
      });
  };
  const validatecaseManagement = () => {
    const {
      caseTimelineInput,
      nextHearingDateInput,
      nextStepsandActionInput,
      taskAssignmentInput,
      caseNotesandUpdatesInput,
    } = caseManagementInput;
    if (
      !caseTimelineInput ||
      !nextHearingDateInput ||
      !nextStepsandActionInput ||
      !taskAssignmentInput ||
      !caseNotesandUpdatesInput
    ) {
      WarningToast("Please fill out all fields and select options.");
      return false;
    }
    return true;
  };

  const handleCaseManagement = () => {
    if (validatecaseManagement()) {
      // alert("Case Management Saved!");
      saveCaseManagement();
    }
  };

  //Handle Page Number 7 Inputs
  const [courtOrdersPdf, setCourtOrdersPdf] = useState<File | null>(null);
  const handleCourtOrdersPdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCourtOrdersPdf(e.target.files[0]);
    }
  };
  const [judgementsPdf, setJudgementsPdf] = useState<File | null>(null);
  const handleJudgementsPdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setJudgementsPdf(e.target.files[0]);
    }
  };
  const savecourtOrdersAndJudgements = () => {
    const formData = new FormData();
    if (courtOrdersPdf) formData.append("courtOrdersPdf", courtOrdersPdf);
    if (judgementsPdf) formData.append("judgementsPdf", judgementsPdf);
    const prevPdfId = {
      courtOrdersPdf: pdfList?.courtOrdersPdf,
      judgementsPdf: pdfList?.judgementsPdf,
    };
    formData.append("prevPdfId", JSON.stringify(prevPdfId));
    const toastId = LoadingToast();
    axios
      .put(IP.API + "case/judgements/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        UpdateToastInfo(toastId, res.data, "success");
      })
      .catch((err) => {
        UpdateToastInfo(toastId, "File Not Updated", "error");
      });
  };
  const validatecourtOrdersAndJudgements = () => {
    if (!courtOrdersPdf || !judgementsPdf) {
      alert("Please upload all required PDFs in Court Order and Judgements.");
      return false;
    }
    return true;
  };

  const handlecourtOrdersAndJudgements = () => {
    // if (validatecourtOrdersAndJudgements()) {
    //   alert("Court Order and Judgements Saved!");
    // }
    savecourtOrdersAndJudgements();
  };
  //Handle Page Number 8 Inputs
  const [data, setdata] = useState({
    postCaseMonitoringInput: "",
    followUpActionInput: "",
  });
  const dataInputChange = (e: any) => {
    const { name, value } = e.target;
    setdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const savedata = () => {
    const toastId = LoadingToast();
    axios
      .put(IP.API + "case/follow-up/" + id, data, {
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        UpdateToastInfo(toastId, res.data, "success");
      })
      .catch((err) => {
        UpdateToastInfo(toastId, "Data Not Updated!", "error");
      });
  };
  const validatedata = () => {
    const { postCaseMonitoringInput, followUpActionInput } = data;
    if (!postCaseMonitoringInput || !followUpActionInput) {
      WarningToast("Update the required fields in Monitoring.");
      return false;
    }
    return true;
  };

  const handledata = () => {
    if (validatedata()) {
      // alert("Monitoring Saved!");
      savedata();
    }
  };
  // const postCaseMonitoringInput = useRef<HTMLInputElement>(null);
  // const followUpActionInput = useRef<HTMLInputElement>(null);
  // const handleMonitoring = () =>{
  //   // alert(postCaseMonitoringInput.current?.value);
  //   const data ={
  //     postCaseMonitoringInput:postCaseMonitoringInput.current?.value,
  //     followUpActionInput:followUpActionInput.current?.value
  //   }
  //   axios.put(IP.API +'case/follow-up/'+id, data).then(res=>{
  //     console.log(res.data);
  //   }).catch(err=>{
  //     console.log(err);
  //   })
  // }
  const navigate = useNavigate();
  const [addressIds, setAddressIds] = useState({
    city: 0,
    taluk: 0,
    village: 0,
  });
  const getCaseDetailsInfo = () => {
    axios
      .get(IP.API + "case/" + id, {
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        const data: CaseDetailsMetaData = res.data[0];
        if (data) {
          setChildInformationInput({
            childNameInput: data.childName,
            ageInput: data.age.toString(),
            dobInput: data.dob.split("T")[0],
            guradianInput: data.guradian,
            educationalBgInput: data.educationalBg,
            addressInput: data.address,
          });
          setSelectedGender(data.gender);
          handleStateChange({ target: { value: data.state.toString() } });
          handleCityChange({ target: { value: data.city.toString() } });
          handleTalukChange({ target: { value: data.taluk.toString() } });
          setAddressIds({
            city: data.city,
            taluk: data.taluk,
            village: data.village,
          });
          setCaseDetailsInput({
            caseIdInput: data.caseIdInput,
            caseTitleInput: data.caseTitle,
            caseDescriptionInput: data.caseDescription,
            courtNameInput: data.courtName,
            jurisdictionInput: data.jurisdiction,
          });
          setSelectedCaseType(data.caseType);
          setSelectedCasePriority(data.casePriority);
          setSelectedCaseStatus(data.caseStatus);
          setLegalRepresentationInput({
            lawyerInput: data.lawyer,
            petitionerInput: data.petitioner,
            respondentInput: data.respondent,
            legalAidDetailsInput: data.legalAidDetails,
          });
          setCaseManagementInput({
            caseTimelineInput: data.caseTimeline.split("T")[0],
            nextHearingDateInput: data.nextHearingDate.split("T")[0],
            nextStepsandActionInput: data.nextStepsandAction,
            taskAssignmentInput: data.taskAssignment,
            caseNotesandUpdatesInput: data.caseNotesandUpdatesInput,
          });
          setdata({
            postCaseMonitoringInput: data.postCaseMonitoringInput,
            followUpActionInput: data.followUpActionInput,
          });
        } else {
          navigate(-1);
        }
      })
      .catch((error) => {
        console.error(error);
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
  const getDocList = () => {
    axios
      .get(IP.API + "case/docLink/" + id, {
        headers: {
          "x-access-token": getToken(),
        },
      })
      .then((res) => {
        const pdfs: pdfInterface = res.data[0];
        if (pdfs) {
          setPdfList(pdfs);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getStateList();
    getCaseDetailsInfo();
    getDocList();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedCity(addressIds.city.toString());
      setSelectedTaluk(addressIds.taluk.toString());
      setSelectedVillage(addressIds.village.toString());
      // console.log(addressIds);
    }, 3000);
    return () => clearTimeout(timer);
  }, [addressIds]);

  //PDF View
  const [showPdf, setShowPdf] = useState<boolean>(false);
  const [pdfidUrl, setPdfId] = useState<string | undefined>("");
  const closePop = () => {
    setShowPdf(false);
    setPdfId("");
  };
  const showPdfView = async (pdf: string | undefined) => {
    const response = await fetch(IP.API + "pdf/" + pdf + ".pdf", {
      headers: {
        "x-access-token": getToken(),
      },
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfId(url);
    } else {
      InfoToast("Failed to fetch PDF");
    }
    setShowPdf(true);
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
          <h6 style={{ color: `${editId === 1 ? "green" : "black"}` }}>
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
                  name="childNameInput"
                  value={childInformationInput.childNameInput}
                  disabled={editId === 1 ? false : true}
                  onChange={childInformationInputChange}
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
                  name="ageInput"
                  value={childInformationInput.ageInput}
                  disabled={editId === 1 ? false : true}
                  onChange={childInformationInputChange}
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
                  name="dobInput"
                  value={childInformationInput.dobInput}
                  disabled={editId === 1 ? false : true}
                  onChange={childInformationInputChange}
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
                  value={selectedGender}
                  onChange={handleGenderChange}
                >
                  <option value="select">--- Select Gender ---</option>
                  <option value="male">Male</option>
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
                  name="guradianInput"
                  onChange={childInformationInputChange}
                  value={childInformationInput.guradianInput}
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
                  name="educationalBgInput"
                  onChange={childInformationInputChange}
                  value={childInformationInput.educationalBgInput}
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
                  name="addressInput"
                  onChange={childInformationInputChange}
                  value={childInformationInput.addressInput}
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
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  <option value="select">--- Select State ---</option>
                  {StateList.map((val, index) => {
                    return (
                      <option key={index} value={val.StateId}>
                        {val.State}
                      </option>
                    );
                  })}
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
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  <option value="select">--- Select City ---</option>
                  {CityList.map((val, index) => {
                    return (
                      <option key={index} value={val.CityId}>
                        {val.City}
                      </option>
                    );
                  })}
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
                  value={selectedTaluk}
                  onChange={handleTalukChange}
                >
                  <option value="select">--- Select Taluk ---</option>
                  {TalukList.map((val, index) => {
                    return (
                      <option key={index} value={val.TalukId}>
                        {val.Taluk}
                      </option>
                    );
                  })}
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
                  value={selectedVillage}
                  onChange={handleVillageChange}
                >
                  <option value="select">--- Select Village ---</option>
                  {VillageList.map((val, index) => {
                    return (
                      <option key={index} value={val.VillageId}>
                        {val.Village}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="floatingSelect3">Village</label>
              </div>
            </div>
            <div className="col-12">
              {editId === 1 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={handleChildInformation}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </div>
              )}
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
          <h6 style={{ color: `${editId === 2 ? "green" : "black"}` }}>
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
                  value={caseDetailsInput.caseIdInput}
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
                  name="caseTitleInput"
                  onChange={caseDetailsInputChange}
                  value={caseDetailsInput.caseTitleInput}
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
                  value={selectedCaseType}
                  onChange={handleCaseTypeChange}
                >
                  <option value="select">--- Select Case Type ---</option>
                  <option value="Child Protection">Child Protection</option>
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
                  value={selectedCasePriority}
                  onChange={handleCasePriorityChange}
                >
                  <option value="select">--- Select Case Priority ---</option>
                  <option value="High">High</option>
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
                  name="caseDescriptionInput"
                  onChange={caseDetailsInputChange}
                  value={caseDetailsInput.caseDescriptionInput}
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
                  name="courtNameInput"
                  onChange={caseDetailsInputChange}
                  value={caseDetailsInput.courtNameInput}
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
                  name="jurisdictionInput"
                  onChange={caseDetailsInputChange}
                  value={caseDetailsInput.jurisdictionInput}
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
                  value={selectedCaseStatus}
                  onChange={handleCaseStatusChange}
                >
                  <option value="select">--- Select Case Status ---</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Pending">Pending</option>
                </select>
                <label htmlFor="floatingSelect3">Case Status</label>
              </div>
            </div>
            <div className="col-12">
              {editId === 2 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={handleCaseDetails}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </div>
              )}
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
          <h6 style={{ color: `${editId === 3 ? "green" : "black"}` }}>
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
                  name="lawyerInput"
                  onChange={LegalRepresentationInputChange}
                  value={legalRepresentationInput.lawyerInput}
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
                  name="petitionerInput"
                  onChange={LegalRepresentationInputChange}
                  value={legalRepresentationInput.petitionerInput}
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
                  name="respondentInput"
                  onChange={LegalRepresentationInputChange}
                  value={legalRepresentationInput.respondentInput}
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
                  name="legalAidDetailsInput"
                  onChange={LegalRepresentationInputChange}
                  value={legalRepresentationInput.legalAidDetailsInput}
                  disabled={editId === 3 ? false : true}
                />
                <label htmlFor="floatingInput4">
                  Legal Aid Details (if appl)
                </label>
              </div>
            </div>
            <div className="col-12">
              {editId === 3 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={handleLegalRepresentation}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </div>
              )}
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
          <h6 style={{ color: `${editId === 4 ? "green" : "black"}` }}>
            Child Protection Measures
          </h6>
          <button className="btn" onClick={() => handlEdit(4)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              {editId === 4 ? (
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    disabled={editId === 4 ? false : true}
                    accept="application/pdf"
                    onChange={handleProtectioOrdersPdfChange}
                  />
                  <label htmlFor="floatingInput">Protection Orders</label>
                </div>
              ) : (
                <div className="form-floating mb-3">
                  {pdfList?.protectionOrderPdf !== "" ? (
                    <div>
                      <div>
                        Protection Orders{" "}
                        <span>
                          <button
                            className="btn"
                            onClick={() =>
                              showPdfView(pdfList?.protectionOrderPdf)
                            }
                          >
                            <i
                              style={{ color: "green" }}
                              className="fa-regular fa-eye"
                            ></i>
                          </button>
                        </span>
                      </div>
                      {pdfList?.protectionOrderPdf}
                    </div>
                  ) : (
                    <div>
                      <div>Protection Orders</div>
                      <i className="fa-solid fa-upload"></i>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              {editId === 4 ? (
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="floatingInput2"
                    placeholder="name@example.com"
                    disabled={editId === 4 ? false : true}
                    accept="application/pdf"
                    onChange={handlePlacementOrdersPdfChange}
                  />
                  <label htmlFor="floatingInput2">Placement Orders</label>
                </div>
              ) : (
                <div className="form-floating mb-3">
                  {pdfList?.placementOrderPdf !== "" ? (
                    <div>
                      <div>
                        Placement Orders{" "}
                        <span>
                          <button
                            className="btn"
                            onClick={() =>
                              showPdfView(pdfList?.placementOrderPdf)
                            }
                          >
                            <i
                              style={{ color: "green" }}
                              className="fa-regular fa-eye"
                            ></i>
                          </button>
                        </span>
                      </div>
                      {pdfList?.placementOrderPdf}
                    </div>
                  ) : (
                    <div>
                      <div>Placement Orders</div>
                      <i className="fa-solid fa-upload"></i>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="col-12">
              {editId === 4 ? (
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="floatingInput3"
                    placeholder="name@example.com"
                    disabled={editId === 4 ? false : true}
                    accept="application/pdf"
                    onChange={handleRestrainingOrdersPdfChange}
                  />
                  <label htmlFor="floatingInput3">Restraining Order</label>
                </div>
              ) : (
                <div className="form-floating mb-3">
                  {pdfList?.restrainingOrderPdf !== "" ? (
                    <div>
                      <div>
                        Restraining Order{" "}
                        <span>
                          <button
                            className="btn"
                            onClick={() =>
                              showPdfView(pdfList?.restrainingOrderPdf)
                            }
                          >
                            <i
                              style={{ color: "green" }}
                              className="fa-regular fa-eye"
                            ></i>
                          </button>
                        </span>
                      </div>
                      {pdfList?.restrainingOrderPdf}
                    </div>
                  ) : (
                    <div>
                      <div>Restraining Order</div>
                      <i className="fa-solid fa-upload"></i>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="col-12">
              {editId === 4 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={handleChildProtectionMeasures}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </div>
              )}
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
          <h6 style={{ color: `${editId === 5 ? "green" : "black"}` }}>
            Evidence and Documentation
          </h6>
          <button className="btn" onClick={() => handlEdit(5)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              {editId === 5 ? (
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    disabled={editId === 5 ? false : true}
                    accept="application/pdf"
                    onChange={handleMedicalReportsPdfChange}
                  />
                  <label htmlFor="floatingInput">Medical Reports</label>
                </div>
              ) : (
                <div className="form-floating mb-3">
                  {pdfList?.medicalReportsPdf !== "" ? (
                    <div>
                      <div>
                        Medical Reports{" "}
                        <span>
                          <button
                            className="btn"
                            onClick={() =>
                              showPdfView(pdfList?.medicalReportsPdf)
                            }
                          >
                            <i
                              style={{ color: "green" }}
                              className="fa-regular fa-eye"
                            ></i>
                          </button>
                        </span>
                      </div>
                      {pdfList?.medicalReportsPdf}
                    </div>
                  ) : (
                    <div>
                      <div>Medical Reports</div>
                      <i className="fa-solid fa-upload"></i>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              {editId === 5 ? (
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="floatingInput2"
                    placeholder="name@example.com"
                    disabled={editId === 5 ? false : true}
                    accept="application/pdf"
                    onChange={handleWitnessStatementsPdfChange}
                  />
                  <label htmlFor="floatingInput2">Witness Statements</label>
                </div>
              ) : (
                <div className="form-floating mb-3">
                  {pdfList?.witnessStatementsPdf !== "" ? (
                    <div>
                      <div>
                        Witness Statements{" "}
                        <span>
                          <button
                            className="btn"
                            onClick={() =>
                              showPdfView(pdfList?.witnessStatementsPdf)
                            }
                          >
                            <i
                              style={{ color: "green" }}
                              className="fa-regular fa-eye"
                            ></i>
                          </button>
                        </span>
                      </div>
                      {pdfList?.witnessStatementsPdf}
                    </div>
                  ) : (
                    <div>
                      <div>Witness Statements</div>
                      <i className="fa-solid fa-upload"></i>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              {editId === 5 ? (
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="floatingInput42"
                    placeholder="name@example.com"
                    disabled={editId === 5 ? false : true}
                    accept="application/pdf"
                    onChange={handlePoliceReportsPdfChange}
                  />
                  <label htmlFor="floatingInput42">Police Reports</label>
                </div>
              ) : (
                <div className="form-floating mb-3">
                  {pdfList?.policeReportsPdf !== "" ? (
                    <div>
                      <div>
                        Police Reports{" "}
                        <span>
                          <button
                            className="btn"
                            onClick={() =>
                              showPdfView(pdfList?.policeReportsPdf)
                            }
                          >
                            <i
                              style={{ color: "green" }}
                              className="fa-regular fa-eye"
                            ></i>
                          </button>
                        </span>
                      </div>
                      {pdfList?.policeReportsPdf}
                    </div>
                  ) : (
                    <div>
                      <div>Police Reports</div>
                      <i className="fa-solid fa-upload"></i>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              {editId === 5 ? (
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="floatingInput3"
                    placeholder="name@example.com"
                    disabled={editId === 5 ? false : true}
                    accept="application/pdf"
                    onChange={handlePhotographsPdfChange}
                  />
                  <label htmlFor="floatingInput3">
                    Photographs or Evidence
                  </label>
                </div>
              ) : (
                <div className="form-floating mb-3">
                  {pdfList?.photographsPdf !== "" ? (
                    <div>
                      <div>
                        Photographs or Evidence{" "}
                        <span>
                          <button
                            className="btn"
                            onClick={() => showPdfView(pdfList?.photographsPdf)}
                          >
                            <i
                              style={{ color: "green" }}
                              className="fa-regular fa-eye"
                            ></i>
                          </button>
                        </span>
                      </div>
                      {pdfList?.photographsPdf}
                    </div>
                  ) : (
                    <div>
                      <div>Photographs or Evidence</div>
                      <i className="fa-solid fa-upload"></i>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              {editId === 5 ? (
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="floatingInput4"
                    placeholder="name@example.com"
                    disabled={editId === 5 ? false : true}
                    accept="application/pdf"
                    onChange={handleTestimonyPdfChange}
                  />
                  <label htmlFor="floatingInput4"> Child's Testimony </label>
                </div>
              ) : (
                <div className="form-floating mb-3">
                  {pdfList?.testimonyPdf !== "" ? (
                    <div>
                      <div>
                        Child's Testimony{" "}
                        <span>
                          <button
                            className="btn"
                            onClick={() => showPdfView(pdfList?.testimonyPdf)}
                          >
                            <i
                              style={{ color: "green" }}
                              className="fa-regular fa-eye"
                            ></i>
                          </button>
                        </span>
                      </div>
                      {pdfList?.testimonyPdf}
                    </div>
                  ) : (
                    <div>
                      <div>Child's Testimony</div>
                      <i className="fa-solid fa-upload"></i>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              {editId === 5 ? (
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="floatingInput5"
                    placeholder="name@example.com"
                    disabled={editId === 5 ? false : true}
                    accept="application/pdf"
                    onChange={handleSchoolRecordsPdfChange}
                  />
                  <label htmlFor="floatingInput5"> School Records </label>
                </div>
              ) : (
                <div className="form-floating mb-3">
                  {pdfList?.schoolRecordsPdf !== "" ? (
                    <div>
                      <div>
                        School Records{" "}
                        <span>
                          <button
                            className="btn"
                            onClick={() =>
                              showPdfView(pdfList?.schoolRecordsPdf)
                            }
                          >
                            <i
                              style={{ color: "green" }}
                              className="fa-regular fa-eye"
                            ></i>
                          </button>
                        </span>
                      </div>
                      {pdfList?.schoolRecordsPdf}
                    </div>
                  ) : (
                    <div>
                      <div>School Records</div>
                      <i className="fa-solid fa-upload"></i>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="col-12">
              {editId === 5 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button onClick={handleEvidence} className="btn btn-primary">
                    Update
                  </button>
                </div>
              )}
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
          <h6 style={{ color: `${editId === 6 ? "green" : "black"}` }}>
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
                  name="caseTimelineInput"
                  onChange={CaseManagementInputChange}
                  value={caseManagementInput.caseTimelineInput}
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
                  onChange={CaseManagementInputChange}
                  value={caseManagementInput.nextHearingDateInput}
                  name="nextHearingDateInput"
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
                  onChange={CaseManagementInputChange}
                  value={caseManagementInput.nextStepsandActionInput}
                  name="nextStepsandActionInput"
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
                  onChange={CaseManagementInputChange}
                  value={caseManagementInput.taskAssignmentInput}
                  name="taskAssignmentInput"
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
                  onChange={CaseManagementInputChange}
                  value={caseManagementInput.caseNotesandUpdatesInput}
                  name="caseNotesandUpdatesInput"
                  disabled={editId === 6 ? false : true}
                />
                <label htmlFor="floatingInput4">Case Notes & Updates </label>
              </div>
            </div>
            <div className="col-12">
              {editId === 6 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={handleCaseManagement}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </div>
              )}
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
          <h6 style={{ color: `${editId === 7 ? "green" : "black"}` }}>
            Court Orders & Judgements
          </h6>
          <button className="btn" onClick={() => handlEdit(7)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              {editId === 7 ? (
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    disabled={editId === 7 ? false : true}
                    onChange={handleCourtOrdersPdfChange}
                  />
                  <label htmlFor="floatingInput">Court Orders</label>
                </div>
              ) : (
                <div className="form-floating mb-3">
                  {pdfList?.courtOrdersPdf !== "" ? (
                    <div>
                      <div>
                        Court Orders
                        <span>
                          <button
                            className="btn"
                            onClick={() => showPdfView(pdfList?.courtOrdersPdf)}
                          >
                            <i
                              style={{ color: "green" }}
                              className="fa-regular fa-eye"
                            ></i>
                          </button>
                        </span>
                      </div>
                      {pdfList?.courtOrdersPdf}
                    </div>
                  ) : (
                    <div>
                      <div>Court Orders</div>
                      <i className="fa-solid fa-upload"></i>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              {editId === 7 ? (
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="floatingInput2"
                    placeholder="name@example.com"
                    disabled={editId === 7 ? false : true}
                    onChange={handleJudgementsPdfChange}
                  />
                  <label htmlFor="floatingInput2">Judgements</label>
                </div>
              ) : (
                <div className="form-floating mb-3">
                  {pdfList?.judgementsPdf !== "" ? (
                    <div>
                      <div>
                        Judgements
                        <span>
                          <button
                            className="btn"
                            onClick={() => showPdfView(pdfList?.judgementsPdf)}
                          >
                            <i
                              style={{ color: "green" }}
                              className="fa-regular fa-eye"
                            ></i>
                          </button>
                        </span>
                      </div>
                      {pdfList?.judgementsPdf}
                    </div>
                  ) : (
                    <div>
                      <div>Judgements</div>
                      <i className="fa-solid fa-upload"></i>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="col-12">
              {editId === 7 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={handlecourtOrdersAndJudgements}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </div>
              )}
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
          <h6 style={{ color: `${editId === 8 ? "green" : "black"}` }}>
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
                  onChange={dataInputChange}
                  name="postCaseMonitoringInput"
                  value={data.postCaseMonitoringInput}
                  // value={"HKJHKJF"}
                  // ref={postCaseMonitoringInput}
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
                  onChange={dataInputChange}
                  name="followUpActionInput"
                  value={data.followUpActionInput}
                  // value={"GGDKH"}
                  // ref={followUpActionInput}
                  disabled={editId === 8 ? false : true}
                />
                <label htmlFor="floatingInput2">Follow-up Action </label>
              </div>
            </div>
            <div className="col-12">
              {editId === 8 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button onClick={handledata} className="btn btn-primary">
                    Update
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showPdf && <PdfView closePop={closePop} pdfidUrl={pdfidUrl} />}
    </>
  );
};
export default CaseDetails;
