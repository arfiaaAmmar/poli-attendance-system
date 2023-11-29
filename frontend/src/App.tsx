import "tailwindcss/tailwind.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Sidebar from "./components/sidebar/Sidebar";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import {
  adminSidebarRoutes,
  studentSidebarRoutes,
} from "./components/sidebar/routes";
import ManageRegisterForm from "./pages/admin/ManageRegistration";
import ManageComplaint from "./pages/admin/ManageComplaint";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ManageProfile from "./pages/shared/UserProfile";
import Notifications from "./pages/shared/Notification";
import StudentRegistrationForm from "./pages/user/student-register/StudentRegisterForm";
import { AuthContext } from "./context/AuthContext";
import { getUserSessionData } from "./api/user-api";
import {
  COMPLAINT_TYPE,
  FORM_TYPE,
  USER_TYPE,
  ADMIN_PAGES_PATH,
  STUDENT_PAGES_PATH,
  SHARED_PAGES,
} from "shared-library/src/declarations/constants";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterUser from "./pages/RegisterUser";
import HomePage from './pages/shared/HomePage';
import StudentComplaints from "./pages/user/student-complaints/StudentComplaints.js";

function App(): JSX.Element {
  const [sidebar, setSidebar] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const user = getUserSessionData();
  const userSession = sessionStorage.getItem("");
  const navigate = useNavigate();
  const { penyelia, pelajar } = USER_TYPE;

  useEffect(() => {
    if (!userSession || !isLoggedIn) {
      navigate("/login");
    }
    if (user?.userType === penyelia) {
      navigate(ADMIN_PAGES_PATH.pengurusanProfil);
    }
    if (user?.userType === pelajar) {
      navigate(STUDENT_PAGES_PATH.pengurusanProfil);
    }
  }, []);

  return (
    <Routes>
      <Route path={SHARED_PAGES.login.path} element={<Login />} />
      <Route path={SHARED_PAGES.registerUser.path} element={<RegisterUser />} />
      <Route path={SHARED_PAGES.forgotPassword.path} element={<ForgotPassword />} />

      {user?.userType === penyelia && (
        <>
          <Route
            path="/penyelia/*"
            element={<AdminRoutes sidebar={sidebar} setSidebar={setSidebar} />}
          />
        </>
      )}

      {user?.userType === pelajar && (
        <>
          <Route
            path="/pelajar/*"
            element={<UserRoutes sidebar={sidebar} setSidebar={setSidebar} />}
          />
        </>
      )}

      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}

type AdminRoutesProps = {
  sidebar: boolean;
  setSidebar: Dispatch<SetStateAction<boolean>>;
};

const AdminRoutes = ({
  sidebar,
  setSidebar,
}: AdminRoutesProps): JSX.Element => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case ADMIN_PAGES_PATH.halamanUtama:
        return <HomePage />;
      case ADMIN_PAGES_PATH.pengurusanProfil:
        return <ManageProfile />;
      case ADMIN_PAGES_PATH.pengurusanPendaftaran:
        return <ManageRegisterForm type={FORM_TYPE.default} />;
      case ADMIN_PAGES_PATH.pendaftaranBaru:
        return <ManageRegisterForm type={FORM_TYPE.masuk} />;
      case ADMIN_PAGES_PATH.pendaftaranKeluar:
        return <ManageRegisterForm type={FORM_TYPE.keluar} />;
      case ADMIN_PAGES_PATH.pengurusanAduan:
        return <ManageComplaint type={COMPLAINT_TYPE.default} />;
      case ADMIN_PAGES_PATH.kerosakanFasiliti:
        return <ManageComplaint type={COMPLAINT_TYPE.kerosakanFasiliti} />;
      case ADMIN_PAGES_PATH.masalahDisiplin:
        return <ManageComplaint type={COMPLAINT_TYPE.disiplinPelajar} />;
      case ADMIN_PAGES_PATH.notifikasi:
        return <Notifications />;
      default:
        return <div>Invalid page</div>;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        items={adminSidebarRoutes}
        sidebar={sidebar}
        setSidebar={setSidebar}
      />
      <IconButton
        className={`absolute top-0 left-0 ${sidebar ? "hidden" : "visible"}`}
        onClick={() => setSidebar(true)}
      >
        <MenuIcon fontSize="large" className="text-black" />
      </IconButton>
      <div className="h-screen w-full overflow-auto">
        <main className="flex-grow">{renderContent()}</main>
      </div>
    </div>
  );
};

type UserRoutesProps = {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserRoutes = ({ sidebar, setSidebar }: UserRoutesProps): JSX.Element => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case STUDENT_PAGES_PATH.halamanUtama:
        return <HomePage />;
      case STUDENT_PAGES_PATH.pengurusanProfil:
        return <ManageProfile />;
      case STUDENT_PAGES_PATH.borangPendaftaran:
        return <StudentRegistrationForm page={FORM_TYPE.default} />;
      case STUDENT_PAGES_PATH.borangPendaftaranMasuk:
        return <StudentRegistrationForm page={FORM_TYPE.masuk} />;
      case STUDENT_PAGES_PATH.borangPendaftaranKeluar:
        return <StudentRegistrationForm page={FORM_TYPE.keluar} />;
      case STUDENT_PAGES_PATH.aduanPelajar:
        return <StudentComplaints page={COMPLAINT_TYPE.default} />;
      case STUDENT_PAGES_PATH.kerosakanFasiliti:
        return <StudentComplaints page={COMPLAINT_TYPE.kerosakanFasiliti} />;
      case STUDENT_PAGES_PATH.disiplinPelajar:
        return <StudentComplaints page={COMPLAINT_TYPE.disiplinPelajar} />;
      case STUDENT_PAGES_PATH.notifikasi:
        return <Notifications />;
      default:
        return <div>Invalid page</div>;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        items={studentSidebarRoutes}
        sidebar={sidebar}
        setSidebar={setSidebar}
      />
      <IconButton
        className={`absolute top-0 left-0 ${sidebar ? "hidden" : "visible"}`}
        onClick={() => setSidebar(true)}
      >
        <MenuIcon fontSize="large" className="text-black" />
      </IconButton>
      <div className="h-screen w-full overflow-auto">
        <main className="flex-grow">{renderContent()}</main>
      </div>
    </div>
  );
};

export default App;
