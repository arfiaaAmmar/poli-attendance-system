/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { getAuthorisedUser, loginUser } from "../api/user-api";
import { AuthContext } from "../context/AuthContext";
import {
  FM,
  USER_TYPE,
  ADMIN_PAGES_PATH,
  STUDENT_PAGES_PATH,
  ENDPOINTS,
  SHARED_PAGES,
} from "shared-library/src/declarations/constants";
import { User } from "shared-library/src/declarations/types";
import { firstLetterUppercase } from "../helpers/shared-helpers";
import IMAGES from "../assets/_assets";
import FeedbackMessage from "../components/ResponseMessage";

export const Login = () => {
  const [loginType, setLoginType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { setUser, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      email == "" ||
      password == "" ||
      email.includes(" ") ||
      password.includes(" ")
    ) {
      setError(FM.invalidEmailOrPassword);
      return;
    }
    try {
      await loginUser(email, password, rememberMe, loginType);
      const data: User = await getAuthorisedUser();
      console.log("loginUser", loginUser);
      console.log("data", data);
      setUser(data);
      setIsLoggedIn(true);
      if (data?.userType === USER_TYPE.penyelia) {
        navigate(ADMIN_PAGES_PATH.pengurusanProfil);
      }
      if (data?.userType === USER_TYPE.pelajar) {
        navigate(STUDENT_PAGES_PATH.pengurusanProfil);
      }
    } catch (error: any) {
      console.error(FM.loginFailed, error);
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return FM.logoutWarning;
    };

    const handlePopState = () => {
      navigate(ENDPOINTS.login);
    };

    window.onbeforeunload = handleBeforeUnload;
    window.onpopstate = handlePopState;

    return () => {
      window.onbeforeunload = null;
      window.onpopstate = null;
    };
  }, [navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${IMAGES.loginBgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black w-screen h-20">
        <div className="h-full w-max">
          {/* <img
            src={websiteLogo}
            alt="website logo"
            className="object-contain w-full h-full"
          /> */}
        </div>
      </div>
      <CssBaseline />
      <div className="w-3/5 h-max text-center bg-neutral-100 rounded-md p-6 mx-auto my-40 bg-opacity-50 backdrop-blur-0">
        <div className="w-1/3 mx-auto mt-4 mb-8">
          <img src={IMAGES.uniLogo} alt="" />
        </div>
        <p className="font-bold text-3xl">
          Polytechnic Technology Hostel (PiTecH)
        </p>
        {loginType === "" ? (
          <>
            <div className="flex gap-4 justify-center mt-8">
              <div
                className="bg-white rounded-lg p-4 cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out"
                onClick={() => setLoginType(USER_TYPE.pelajar)}
              >
                <p className="font-bold text-lg">PELAJAR KAMSIS</p>
                <img
                  src="https://logowik.com/content/uploads/images/student5651.jpg"
                  alt=""
                  className="w-40 h-40 object-contain hover:cursor-pointer"
                />
              </div>
              <div
                className="bg-white rounded-lg p-4 cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out"
                onClick={() => setLoginType(USER_TYPE.penyelia)}
              >
                <p className="font-bold text-lg">PENYELIA KAMSIS</p>
                <img
                  src="https://cdn.vectorstock.com/i/preview-1x/35/93/admin-administration-people-icon-vector-47263593.jpg"
                  alt=""
                  className="w-40 h-40 object-contain hover:cursor-pointer"
                />
              </div>
            </div>
            <div className="flex justify-center gap-4 w-5/6 mx-auto mt-8">
              <Link
                to={SHARED_PAGES.registerUser.path}
                type="submit"
                className="bg-green-300 font-bold text-lg border-2 border-black w-3/4"
              >
                Pengguna Baru
              </Link>
              <Link
                to={SHARED_PAGES.forgotPassword.path}
                type="submit"
                className="bg-red-300 font-bold text-lg border-2 border-black w-3/4"
              >
                Lupa Kata Kunci
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold">
              Daftar Masuk {firstLetterUppercase(loginType)}
            </p>
            <div className="w-3/5 mx-auto mt-12">
              <input
                required
                placeholder="Email Address"
                onChange={(e: any) => setEmail(e.target.value)}
                name="email"
                className="rounded-md px-2 py-1 block my-2 w-full"
                autoComplete="email"
                autoFocus
              />
              <input
                required
                name="password"
                placeholder="Password"
                type="password"
                className="rounded-md px-2 py-1 block my-2 w-full"
                onChange={(e: any) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
              }
              label="Remember me"
            />
            <FeedbackMessage className="text-lg font-bold" error={error} />
            <div className="flex justify-center gap-4">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleLogin}
                sx={{
                  backgroundColor: "#59e899",
                  width: "80%",
                }}
              >
                Login
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => setLoginType("")}
                sx={{
                  backgroundColor: "#E85969",
                  width: "80%",
                }}
              >
                Kembali
              </Button>
            </div>
          </>
        )}
      </div>
    </Box>
  );
};

export default Login;
