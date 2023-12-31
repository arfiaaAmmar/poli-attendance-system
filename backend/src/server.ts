import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import {
  deleteUser,
  getAllUsers,
  login,
  registerUser,
  authoriseUser,
  changeUserPassword,
} from "./controllers/user-controllers";
import {
  deleteCheckInForm,
  deleteCheckOutForm,
  getAllCheckInForms,
  getAllCheckOutForms,
  getCheckInForm,
  getCheckOutForm,
  postCheckInForm,
  postCheckOutForm,
  updateCheckInForm,
  updateCheckOutForm,
} from "./controllers/registration-controllers";
import {
  getAllComplaints,
  postComplaint,
  updateComplaint,
  deleteComplaint,
  getComplaint,
} from "./controllers/complaint-controllers";
import { MONGODB_URI, app, port } from "./config/config";
import {
  postNotification,
  getAllNotifications,
  deleteNotification,
  getNotification,
  updateNotification,
} from "./controllers/notification-controllers";
import { ENDPOINTS } from "shared-library/src/declarations/constants";
import {
  uploadCheckOutEvidence,
  uploadComplaintEvidence,
  uploadRegisterFormFiles,
} from "./middleware/upload";

if (!MONGODB_URI) {
  throw new Error("MONGODB-URI environment variable is not defined");
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

app.use(express.json());
app.use(cors());

// Login - Logout - User
app.post(ENDPOINTS.register, registerUser); // Passed test
app.post(ENDPOINTS.login, login); // Passed test
app.get(ENDPOINTS.authoriseUser, authoriseUser); // Passed test
app.get(ENDPOINTS.getAllUsers, getAllUsers); // Passed test
app.put(ENDPOINTS.changeUserPassword, changeUserPassword); // Passed test
app.delete(ENDPOINTS.deleteUser, deleteUser); // Passed test

// Multer and File Uploads
app.use("/uploads", express.static("uploads"));

// Register Forms
app.post(
  ENDPOINTS.postCheckInForm,
  uploadRegisterFormFiles.fields([
    { name: "paymentReceiptFile", maxCount: 1 },
    { name: "offerLetterFile", maxCount: 1 },
  ]),
  postCheckInForm
); // Passed test
app.post(
  ENDPOINTS.postCheckOutForm,
  uploadCheckOutEvidence.single("checkoutEvidenceFile"),
  postCheckOutForm
); // Passed test
app.get(ENDPOINTS.getAllCheckInForms, getAllCheckInForms); // Passed test
app.get(ENDPOINTS.getAllCheckOutForms, getAllCheckOutForms); // Passed test
app.get(ENDPOINTS.getCheckInForm, getCheckInForm); // Passed test
app.get(ENDPOINTS.getCheckOutForm, getCheckOutForm); // Passed test
app.patch(ENDPOINTS.updateCheckInForm, updateCheckInForm); // Passed test
app.patch(ENDPOINTS.updateCheckOutForm, updateCheckOutForm); // Passed test
app.delete(ENDPOINTS.deleteCheckInForm, deleteCheckInForm); // Passed test
app.delete(ENDPOINTS.deleteCheckOutForm, deleteCheckOutForm); // Passed test

// Complaints
app.post(
  ENDPOINTS.postComplaint,
  uploadComplaintEvidence.single("evidenceFile"),
  postComplaint
); // Passed test
app.get(ENDPOINTS.getAllComplaints, getAllComplaints); // Passed test
app.get(ENDPOINTS.getComplaint, getComplaint); // Passed test
app.patch(ENDPOINTS.updateComplaint, updateComplaint); // Passed test
app.delete(ENDPOINTS.deleteComplaint, deleteComplaint); // Passed test

// Notification
app.post(ENDPOINTS.postNotification, postNotification); // Passed test
app.get(ENDPOINTS.getAllNotifications, getAllNotifications); // Passed test
app.get(ENDPOINTS.getNotification, getNotification); // Passed test
app.patch(ENDPOINTS.updateNotification, updateNotification); // Passed test
app.delete(ENDPOINTS.deleteNotification, deleteNotification); // Passed test

//Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
