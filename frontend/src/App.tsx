import "tailwindcss/tailwind.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Sidebar from "./components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import { adminSidebarRoutes, studentSidebarRoutes } from "./components/sidebar/routes";
import ManageRegisterForm from "./pages/admin/ManageRegistration";
import ManageComplaint from "./pages/admin/ManageComplaint";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ManageProfile from "./pages/shared/UserProfile";
import Notifications from "./pages/shared/Notification";
import StudentComplaints from "./pages/user/StudentComplaints";
import StudentRegistrationForm from "./pages/user/student-register/StudentRegisterForm";
import { ADMIN_PAGES_PATH, STUDENT_PAGES_PATH, USER_TYPE } from "../../shared-library/declarations/constants";
import { AuthContext } from "./context/AuthContext";
import { getUserSessionData } from "./api/user-api";

function App(): JSX.Element {
  const [sidebar, setSidebar] = useState(true);
  const { isLoggedIn } = useContext(AuthContext)
  const user = getUserSessionData()
  const userSession = sessionStorage.getItem("")
  const navigate = useNavigate();

  useEffect(() => {
    if ( !userSession || !isLoggedIn) {
      navigate("/login");
    }
    if (user?.userType === USER_TYPE.penyelia) {
      navigate(ADMIN_PAGES_PATH.pengurusanProfil);
    }
    if (user?.userType === USER_TYPE.pelajar) {
      navigate(STUDENT_PAGES_PATH.pengurusanProfil);
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {user?.userType === USER_TYPE.penyelia && (
        <>
          <Route
            path="/penyelia/*"
            element={<AdminRoutes sidebar={sidebar} setSidebar={setSidebar} />}
          />
        </>
      )}

      {user?.userType === USER_TYPE.pelajar && (
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
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminRoutes = ({
  sidebar,
  setSidebar,
}: AdminRoutesProps): JSX.Element => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case ADMIN_PAGES_PATH.pengurusanProfil:
        return <ManageProfile />;
      case ADMIN_PAGES_PATH.pengurusanPendaftaran:
        return <ManageRegisterForm />;
      case ADMIN_PAGES_PATH.pengurusanAduan:
        return <ManageComplaint />;
      case ADMIN_PAGES_PATH.notifikasi:
        return <Notifications />;
      default:
        return <div>Invalid page</div>;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar items={adminSidebarRoutes} sidebar={sidebar} setSidebar={setSidebar} />
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
      case STUDENT_PAGES_PATH.pengurusanProfil:
        return <ManageProfile />;
      case STUDENT_PAGES_PATH.borangPendaftaran:
        return <StudentRegistrationForm />;
      case STUDENT_PAGES_PATH.aduanPelajar:
        return <StudentComplaints />;
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
