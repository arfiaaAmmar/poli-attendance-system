import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SidebarRoute } from "../../../../shared-library/declarations/types";
import { getUserSessionData } from "../../api/user-api";

type SidebarProps = {
  items: SidebarRoute[];
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ items, sidebar, setSidebar }: SidebarProps) {
  const user = getUserSessionData();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const currentPage = useLocation();
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  return (
    <ClickAwayListener onClickAway={() => setSidebar(false)}>
      <>
        {sidebar ? (
          <aside className="bg-neutral-800 pt-2 h-screen w-max block my-auto">
            <div className="flex gap-4 justify-end w-80 items-center px-2">
              <IconButton
                onClick={toggleSidebar}
                aria-label="Close"
                className="text-white"
              >
                <MenuIcon fontSize="large" className="text-white" />
              </IconButton>
            </div>
            <p className="px-6 py-2 text-2xl font-bold text-white">
              WELCOME BACK {user?.email}
            </p>
            <div className="p-4 py-6 gap-4 items-center">
              {items.map((page, index) => (
                <>
                  <Link
                    key={index + 1 + page.path}
                    to={page.path}
                    className={`block p-2 hover:bg-gray-100 dark:hover-bg-gray-700 rounded-lg ${
                      currentPage.pathname === page.path
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }`}
                  >
                    <div className="font-normal text-gray-900 rounded-lg dark:text-white">
                      <span className="text-lg">
                        {page.icon} {page.displayText}
                      </span>
                    </div>
                  </Link>
                  {page.children?.map((child, index) => (
                    <Link
                      key={index + 1}
                      to={child.path}
                      className={`indent-10 text-white my-2 text-lg block ${
                        currentPage.pathname === child.path
                          ? "bg-gray-100 dark:bg-gray-700"
                          : " "
                      }`}
                    >
                      {child.displayText}
                    </Link>
                  ))}
                </>
              ))}
              <button
                className="w-full text-left rounded-lg hover:bg-gray-100 dark:hover-bg-gray-700 text-white py-4 p-2 text-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            <Dialog
              open={showLogoutConfirmation}
              onClose={() => setShowLogoutConfirmation(false)}
            >
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to logout?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleLogout} color="primary">
                  Logout
                </Button>
                <Button
                  onClick={() => setShowLogoutConfirmation(false)}
                  color="primary"
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </aside>
        ) : null}
      </>
    </ClickAwayListener>
  );
}
