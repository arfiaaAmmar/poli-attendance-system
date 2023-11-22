import { Box } from "@mui/material";
import IMAGES from "../assets/_assets";
import { useState } from "react";
import { handleInputChange } from "../helpers/shared-helpers";
import FeedbackMessage from "../components/ResponseMessage";
import { Feedback } from "shared-library/src/declarations/types";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { FM, SHARED_PAGES, initialChangePasswordFormState, initialFeedback } from "shared-library/src/declarations/constants";
import { changeUserPassword } from "../api/user-api";

const ForgotPassword = () => {
  const [form, setForm] = useState(initialChangePasswordFormState);
  const [feedback, setFeedback] = useState(initialFeedback);

  const handleSubmit = async () => {
    const { email, newPassword, repeatPassword } = form;

    if (newPassword !== repeatPassword) {
      setFeedback({ ...feedback, error: "Passwords do not match" });
      return;
    }

    try {
      await changeUserPassword(email, newPassword);
      setFeedback({ ...feedback, success: FM.passwordChangeSuccess });
    } catch (error) {
      setFeedback({ ...feedback, error: FM.passwordChangeFailed });
      console.error("Error changing password:", error);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${IMAGES.loginBgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-5/12 mt-12 bg-neutral-100 rounded-md p-6 mx-auto my-40 bg-opacity-70 backdrop-blur-0"
      >
        <h1 className="font-bold text-2xl text-center my-8">Daftar</h1>
        <div className="flex gap-4">
          <div className="mx-auto w-4/5">
            <div className="items-center mb-2 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                name="email"
                onChange={(e) => handleInputChange(e, setForm)}
                value={form.email}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="items-center mb-2 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                New Password
              </label>
              <input
                type="text"
                name="password"
                onChange={(e) => handleInputChange(e, setForm)}
                value={form.newPassword}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="items-center mb-2 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Repeat Password
              </label>
              <input
                type="text"
                name="password"
                onChange={(e) => handleInputChange(e, setForm)}
                value={form.newPassword}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <FeedbackMessage
              className="font-bold text-green-700 text-lg text-right"
              success={feedback.success}
              error={feedback.error}
            />
            <div className="items-end mb-2 flex gap-2 justify-end">
              <div className="w-1/3 block font-medium text-gray-700"></div>
              <div className="mt-1 p-2 w-full flex">
                <Button
                  variant="contained"
                  color="primary"
                  className="bg-green-300 text-black font-bold p-2 mr-4 rounded cursor-pointer"
                  onClick={handleSubmit}
                >
                  Confirm Change
                </Button>
                <Link
                  to={SHARED_PAGES.login.path}
                  color="primary"
                  className="bg-red-300 text-black font-bold p-2 rounded cursor-pointer"
                >
                  Kembali
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default ForgotPassword;
