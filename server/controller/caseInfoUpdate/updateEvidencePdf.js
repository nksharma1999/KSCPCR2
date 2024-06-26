import { performPdfUpdateOperation } from "./updateProtectionMeasuresPdf.js";
import { dbUpdatePdf } from "../../dbOperation/dbOperation.js";
const pdfs = [
  "medicalReportsPdf",
  "witnessStatementsPdf",
  "policeReportsPdf",
  "photographsPdf",
  "testimonyPdf",
  "schoolRecordsPdf",
];
export const updateEvidencePdf = (req, res) => {
  const pdfIdsMap = new Map();
  const { id } = req.params;
  const userInfo = req.userInfo;
  if (id) {
    try {
      performPdfUpdateOperation(req, pdfs, pdfIdsMap);
      dbUpdatePdf(id, pdfIdsMap, pdfs,userInfo)
        .then((info) => {
          res.status(200).json(info);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } catch (err) {
      res.status(400).json("File Not Updated");
    }
  } else {
    res.status(400).json("Please Provide Data");
  }
};
