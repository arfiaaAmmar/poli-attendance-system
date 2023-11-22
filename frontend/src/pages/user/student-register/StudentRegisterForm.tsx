import { Paper, Typography } from "@mui/material";
import { FormType } from "shared-library/src/declarations/types";
import {
  FORM_TYPE,
  STUDENT_PAGES_PATH,
} from "shared-library/src/declarations/constants";
import CheckInFormComponent from "./CheckInFormComponent";
import { useNavigate } from "react-router-dom";
import { firstLetterUppercase } from "frontend/src/helpers/shared-helpers";
import CheckoutFormComponent from "./CheckOutFormComponent";

type StudentRegisterFormProps = {
  page: FormType;
};

const StudentRegisterForm = ({ page }: StudentRegisterFormProps) => {
  const navigate = useNavigate();

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
      return <CheckInFormComponent />;
    }
    if (page === FORM_TYPE.keluar) {
      return <CheckoutFormComponent />;
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
