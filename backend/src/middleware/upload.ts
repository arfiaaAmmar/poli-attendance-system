import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express-jwt";

const uploadDate = new Date().toISOString().slice(0, 10);

const checkOutEvidenceStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "./uploads/checkoutEvidence/");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const fileName = `checkout-evidence-${uploadDate}-${uuidv4()}`;
    cb(null, fileName);
  },
});

const complaintEvidenceStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "./uploads/complaintEvidence/");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const fileName = `complaint-${uploadDate}-${uuidv4()}`;
    cb(null, fileName);
  },
});

// Define storage for RegisterFormFiles upload
const registerFormFilesStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "./uploads/registerFormFiles/");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const fileName = `${uploadDate}-${uuidv4()}`;
    cb(null, fileName);
  },
});


// Create Multer instances for RegisterFormFiles and offerLetter
export const uploadCheckOutEvidence = multer({ storage: checkOutEvidenceStorage });
export const uploadComplaintEvidence = multer({
  storage: complaintEvidenceStorage,
});
export const uploadRegisterFormFiles = multer({ storage: registerFormFilesStorage });