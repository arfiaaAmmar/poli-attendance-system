import { ChangeEvent, FormEvent, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { isEmptyObject } from "../../../helpers/shared-helpers";
import {
  Contact,
  Feedback,
  FormType,
  TenantInfo,
} from "shared-library/src/declarations/types";
import {
  initialTenantInfo,
  initialEmergencyContact,
  initialFeedback,
  initialCheckInForm,
  initialCheckoutForm,
  FM,
  FORM_TYPE,
  STUDENT_PAGES_PATH,
} from "shared-library/src/declarations/constants";
import {
  postCheckInForm,
  postCheckOutForm,
} from "frontend/src/api/registration-api";
import CheckInFormComponent from "./CheckInFormComponent";
import { useNavigate } from "react-router-dom";
import { firstLetterUppercase } from "frontend/src/helpers/shared-helpers";
import {
  CheckInForm,
  CheckoutForm,
} from "shared-library/src/declarations/types";
import CheckoutFormComponent from "./CheckOutFormComponent";

type StudentRegisterFormProps = {
  page: FormType;
};

const StudentRegisterForm = ({ page }: StudentRegisterFormProps) => {
  const [feedback, setFeedback] = useState<Feedback>(initialFeedback);
  const [tenantInfo, setTenantInfo] = useState<TenantInfo>(initialTenantInfo);
  const [emergencyContact, setEmergencyContact] = useState<Contact>(
    initialEmergencyContact
  );
  const [fileUploaded, setFileUploaded] = useState(false);
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<CheckInForm>(initialCheckInForm);
  const [checkout, setCheckOut] = useState<CheckoutForm>(initialCheckoutForm);

  const handleCheckInFormFileChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const offerLetterFile = e?.target?.files?.[0];
    const paymentReceiptFile = e?.target?.files?.[1];
    if (offerLetterFile) {
      setCheckIn({ ...checkIn, offerLetterFile: offerLetterFile });
    }
    if (paymentReceiptFile) {
      setCheckIn({
        ...checkIn,
        paymentReceiptFile: paymentReceiptFile,
      });
    }
  };

  const handleCheckOutFormFileChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const checkoutEvidenceFile = e?.target?.files?.[0];
    if (checkoutEvidenceFile) {
      setCheckOut({
        ...checkout,
        checkoutEvidenceFile: checkoutEvidenceFile,
      });
    }
  };

  const handleCheckInFormSubmit = async (e: FormEvent) => {
    if (isEmptyObject(checkIn)) {
      setFeedback({
        ...feedback,
        error: FM.pleaseFillNecessaryInformation,
      });
      return;
    }
    try {
      await postCheckInForm(tenantInfo, emergencyContact, checkIn);
      setFeedback({
        ...feedback,
        success: FM.registerFormAdded,
      });

      setTimeout(() => {
        setFeedback({ ...feedback, success: "" });
      }, 3000);
      setCheckIn(initialCheckInForm);
    } catch (error: any) {
      setFeedback({ ...feedback, error: error });
    }
  };

  const handleCheckOutFormSubmit = async (e: FormEvent) => {
    if (isEmptyObject(checkIn)) {
      setFeedback({
        ...feedback,
        error: FM.pleaseFillNecessaryInformation,
      });
      return;
    }
    try {
      await postCheckOutForm(checkout);
      setFeedback({
        ...feedback,
        success: FM.registerFormAdded,
      });

      setTimeout(() => {
        setFeedback({ ...feedback, success: "" });
      }, 3000);
      setCheckIn(initialCheckInForm);
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
        <CheckInFormComponent
          checkInForm={checkIn}
          tenantInfo={tenantInfo}
          emergencyContact={emergencyContact}
          fileUploaded={fileUploaded}
          setCheckInForm={setCheckIn}
          setTenantInfo={setTenantInfo}
          handleFileChange={handleCheckInFormFileChange}
          setFileUploaded={setFileUploaded}
          setEmergencyContact={setEmergencyContact}
          handleSubmit={handleCheckInFormSubmit}
        />
      );
    }
    if (page === FORM_TYPE.keluar) {
      return (
        <CheckoutFormComponent
          checkOutForm={checkout}
          fileUploaded={fileUploaded}
          handleFileChange={handleCheckOutFormFileChange}
          setCheckOutForm={setCheckOut}
          setFileUploaded={setFileUploaded}
          handleSubmit={handleCheckOutFormSubmit}
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
