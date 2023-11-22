import { Box, Button } from "@mui/material";
import {
  FM,
  GENDER,
  ETHNICITY,
  SHARED_PAGES,
  STATES_IN_MALAYSIA,
  USER_TYPE_ARR, initialRegisterUserForm, initialFeedback
} from "shared-library/src/declarations/constants";
import { useState } from "react";
import { Feedback, User } from "shared-library/src/declarations/types";
import { isEmptyObject } from "../helpers/shared-helpers";
import { registerUser } from "../api/user-api";
import IMAGES from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import FeedbackMessage from '../components/ResponseMessage';

const RegisterUser = () => {
  const [formData, setFormData] = useState<User>(initialRegisterUserForm);
  const [feedback, setFeedback] = useState<Feedback>(initialFeedback);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmptyObject(formData)) {
      setFeedback({
        ...feedback,
        error: FM.userRegistered,
      });
      return;
    }
    try {
      await registerUser(formData);
      setFeedback({
        ...feedback,
        success: FM.registerFormAdded,
      });

      setTimeout(() => {
        setFeedback({ ...feedback, success: "" });
      }, 3000);
      setFormData(initialRegisterUserForm);
      navigate("/login");
    } catch (error: any) {
      setFeedback({ ...feedback, error: error });
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
        className="w-5/6 mt-12 bg-neutral-100 rounded-md p-6 mx-auto my-40 bg-opacity-70 backdrop-blur-0"
      >
        <h1 className="font-bold text-2xl text-center my-8">Daftar</h1>
        <div className="flex gap-4">
          <div className="w-1/2">
            <div className="items-center mb-2 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Name Penuh
              </label>
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="items-center mb-2 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                No Matrik
              </label>
              <input
                type="text"
                name="matrikNo"
                onChange={handleInputChange}
                value={formData.matrikNo}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="items-center mb-2 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                onChange={handleInputChange}
                value={formData.phone}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="items-center mb-2 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="items-center mb-2 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Password
              </label>
              <input
                type="text"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="items-center mb-2 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Semester
              </label>
              <input
                type="text"
                name="semester"
                onChange={handleInputChange}
                value={formData.semester}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="items-center mb-2 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Illness
              </label>
              <input
                type="text"
                name="illness"
                onChange={handleInputChange}
                value={formData.illness}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="col-span-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Address
              </label>
            </div>
            <div className="items-center mb-2 col-span-2 mt-4">
              <input
                type="text"
                name="street"
                onChange={handleAddressChange}
                value={formData.address.street}
                className="mt-1 p-2 border rounded w-full"
                placeholder="Street"
              />
            </div>
            <div className="flex gap-2">
              <div className="items-center mb-2 col-span-2">
                <input
                  type="text"
                  name="city"
                  onChange={handleAddressChange}
                  value={formData.address.city}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="City"
                />
              </div>
              <div className="items-center mb-2 col-span-2">
                <select
                  name="state"
                  onChange={handleAddressChange}
                  value={formData.address.state}
                  className="mt-1 p-2 border rounded w-full"
                >
                  {STATES_IN_MALAYSIA.map((state) => (
                    <option value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div className="items-center col-span-2 mb-4">
                <input
                  type="text"
                  name="postalCode"
                  onChange={handleAddressChange}
                  value={formData.address.postalCode}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Postal Code"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="items-center mb-2 flex gap-2">
                <label className="w-1/3 block font-medium text-gray-700">
                  User Type
                </label>
                <select
                  name="userType"
                  onChange={handleInputChange}
                  value={formData.userType}
                  className="mt-1 p-2 border rounded w-full"
                >
                  {USER_TYPE_ARR.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="items-center mb-2 flex gap-2">
                <label className="w-1/3 block font-medium text-gray-700">
                  Race
                </label>
                <select
                  name="race"
                  onChange={handleInputChange}
                  value={formData.race}
                  className="mt-1 p-2 border rounded w-full"
                >
                  {Object.values(ETHNICITY).map((race) => (
                    <option value={race}>{race}</option>
                  ))}
                </select>
              </div>
              <div className="items-center mb-2 flex gap-2">
                <label className="w-1/3 block font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  onChange={handleInputChange}
                  value={formData.gender}
                  className="mt-1 p-2 border rounded w-full"
                >
                  {Object.values(GENDER).map((gender) => (
                    <option value={gender}>{gender}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-4 bottom-4">
          <FeedbackMessage
            className="font-bold"
            success={feedback.success}
            error={feedback.error}
          />
          <Button
            variant="contained"
            color="primary"
            className="bg-blue-500 text-white p-2 mr-4 rounded cursor-pointer"
            onClick={handleSubmit}
          >
            Register
          </Button>
          <Link
            to={SHARED_PAGES.login.path}
            color="primary"
            className="bg-red-500 text-white p-2 rounded cursor-pointer"
          >
            Kembali
          </Link>
        </div>
      </form>
    </Box>
  );
};

export default RegisterUser;
