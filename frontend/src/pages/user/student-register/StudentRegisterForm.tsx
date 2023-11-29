import { Paper, Typography } from "@mui/material";
import { FormType } from "shared-library/src/declarations/types";
import {
  FORM_TYPE,
  STUDENT_PAGES_PATH,
} from "shared-library/src/declarations/constants";
import CheckInFormComponent from "./CheckInFormComponent";
import { firstLetterUppercase } from "frontend/src/helpers/shared-helpers";
import CheckoutFormComponent from "./CheckOutFormComponent";
import { MainPageOptionThumbnail } from "../../../components/MainPageOptionThumbnail";

type StudentRegisterFormProps = {
  page: FormType;
};

const StudentRegisterForm = ({ page }: StudentRegisterFormProps) => {
  const renderForms = () => {
    if (page === FORM_TYPE.default) {
      return (
        <div className="flex gap-4 justify-center mt-8 h-[80vh]">
          <MainPageOptionThumbnail
            title="DAFTAR MASUK"
            logo="https://logowik.com/content/uploads/images/student5651.jpg"
            path={STUDENT_PAGES_PATH.borangPendaftaranMasuk}
          />
          <MainPageOptionThumbnail
            title="DAFTAR KELUAR"
            logo="https://cdn.vectorstock.com/i/preview-1x/35/93/admin-administration-people-icon-vector-47263593.jpg"
            path={STUDENT_PAGES_PATH.borangPendaftaranKeluar}
          />
        </div>
      );
    }
    if (page === FORM_TYPE.masuk) return <CheckInFormComponent />;
    if (page === FORM_TYPE.keluar) return <CheckoutFormComponent />;
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
