import { useState } from "react";
import { Paper, Typography } from "@mui/material";
import { isEmptyObject } from "../../../helpers/shared-helpers";
import {
  EmergencyContact,
  Feedback,
  FormType,
  RegisterForm,
  TenantInfo,
} from "shared-library/src/declarations/types";
import {
  initialTenantInfo,
  initialEmergencyContact,
  initialFeedback,
  FM,
  initialRegisterForm,
  FORM_TYPE,
  STUDENT_PAGES_PATH,
} from "shared-library/src/declarations/constants";
import { postRegisterForm } from "frontend/src/api/registration-api";
import CheckInForm from "./CheckInForm";
import CheckOutForm from "./CheckOutForm";
import { useNavigate } from "react-router-dom";
import { firstLetterUppercase } from "frontend/src/helpers/shared-helpers.js";

type StudentRegisterFormProps = {
  page: FormType;
};

const StudentRegisterForm = ({ page }: StudentRegisterFormProps) => {
  const [feedback, setFeedback] = useState<Feedback>(initialFeedback);
  const [tenantInfo, setTenantInfo] = useState<TenantInfo>(initialTenantInfo);
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact>(
    initialEmergencyContact
  );
  const [fileUploaded, setFileUploaded] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    tenantInfo: tenantInfo,
    formType: FORM_TYPE.masuk,
    roomNo: "",
    blockNo: "",
    resitNo: "",
    offerLetterFile: null,
    paymentReceiptFile: null,
    emergencyContact: emergencyContact,
    tenantAgreement: false,
    timestamp: Date.now(),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const offerLetterFile = e?.target?.files?.[0];
    const paymentReceiptFile = e?.target?.files?.[1];
    if (offerLetterFile) {
      setForm({ ...form, offerLetterFile: offerLetterFile });
    }
    if (paymentReceiptFile) {
      setForm({ ...form, paymentReceiptFile: paymentReceiptFile });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (isEmptyObject(form)) {
      setFeedback({
        ...feedback,
        error: FM.pleaseFillNecessaryInformation,
      });
      return;
    }
    try {
      await postRegisterForm(tenantInfo, emergencyContact, form);
      setFeedback({
        ...feedback,
        success: FM.registerFormAdded,
      });

      setTimeout(() => {
        setFeedback({ ...feedback, success: "" });
      }, 3000);
      setForm(initialRegisterForm);
    } catch (error: any) {
      setFeedback({ ...feedback, error: error });
    }
  };

  const renderForms = () => {
    if (page === FORM_TYPE.default) {
      return (
        <div className="flex gap-4 justify-center mt-8 h-[80vh]">
          <div
            className="bg-white text-center rounded-lg p-4 cursor-pointer m-auto transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={() => {
              navigate(STUDENT_PAGES_PATH.borangPendaftaranMasuk);
            }}
          >
            <p className="font-bold text-lg">DAFTAR MASUK</p>
            <img
              src="https://logowik.com/content/uploads/images/student5651.jpg"
              alt=""
              className="w-80 h-80 object-contain hover:cursor-pointer"
            />
          </div>
          <div
            className="bg-white rounded-lg text-center p-4 cursor-pointer m-auto transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={() => {
              navigate(STUDENT_PAGES_PATH.borangPendaftaranKeluar);
            }}
          >
            <p className="font-bold text-lg">DAFTAR KELUAR</p>
            <img
              src="https://cdn.vectorstock.com/i/preview-1x/35/93/admin-administration-people-icon-vector-47263593.jpg"
              alt=""
              className="w-80 h-80 object-contain hover:cursor-pointer"
            />
          </div>
        </div>
      );
    }
    if (page === FORM_TYPE.masuk) {
      return (
        <CheckInForm
          form={form}
          tenantInfo={tenantInfo}
          emergencyContact={emergencyContact}
          fileUploaded={fileUploaded}
          setForm={setForm}
          setTenantInfo={setTenantInfo}
          handleFileChange={handleFileChange}
          setFileUploaded={setFileUploaded}
          setEmergencyContact={setEmergencyContact}
          handleSubmit={handleSubmit}
        />
      );
    }
    if (page === FORM_TYPE.keluar) {
      return (
        <CheckOutForm
          form={form}
          tenantInfo={tenantInfo}
          emergencyContact={emergencyContact}
          fileUploaded={fileUploaded}
          setForm={setForm}
          setTenantInfo={setTenantInfo}
          handleFileChange={handleFileChange}
          setFileUploaded={setFileUploaded}
          setEmergencyContact={setEmergencyContact}
          handleSubmit={handleSubmit}
        />
      );
    }
  };

  return (
    <Paper className="p-4 border rounded-md border-gray-300">
      <Typography
        variant="h5"
        className="text-3xl text-white rounded-3xl font-semibold mb-4 bg-blue-800 p-2"
      >
        Student Registration Form {">"} Borang {firstLetterUppercase(page)}
      </Typography>
      {renderForms()}
    </Paper>
  );
};

export default StudentRegisterForm;
