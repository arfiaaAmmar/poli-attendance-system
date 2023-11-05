/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Box, Checkbox, CssBaseline, FormControlLabel, Typography } from "@mui/material";
import { getAuthorisedUser, loginUser } from "../api/user-api";
import bgImage from '../assets/login_bg.png'
import { AuthContext } from "../context/AuthContext";
import { FM, USER_TYPE, ADMIN_PAGES_PATH, STUDENT_PAGES_PATH, ENDPOINTS } from "shared-library/declarations/constants";
import { User } from "shared-library/declarations/types";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false)
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
      await loginUser(email, password, rememberMe);
      const data: User = await getAuthorisedUser();
      console.log('loginUser', loginUser)
      console.log('data', data)
      setUser(data);
      setIsLoggedIn(true)
      if (data?.userType === USER_TYPE.penyelia) {
        navigate(ADMIN_PAGES_PATH.pengurusanProfil);
      }
      if (data?.userType === USER_TYPE.pelajar) {
        navigate(STUDENT_PAGES_PATH.pengurusanProfil);
      }
    } catch (error: any) {
      console.error(FM.loginFailed, error);
      console.log(error)
      setError(FM.loginFailed);
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
        backgroundImage: `url(${bgImage})`,
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
      <div className="w-2/5 h-max text-center bg-neutral-100 rounded-md p-6 mx-auto my-40 bg-opacity-50 backdrop-blur-0">
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            backgroundColor: "#E85969",
            width: "80%",
          }}
        >
          Login
        </Button>
        {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      </div>
    </Box>
  );
};

export default Login;
