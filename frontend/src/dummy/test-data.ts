import { Complaint, RegisterForm, User } from "shared-library/src/declarations/types";

export const dummyUserData: User = {
  _id: "12345",
  name: "John Doe",
  nric: "123456-78-9012",
  matrikNo: "M123456",
  phone: "123-456-7890",
  email: "johndoe@example.com",
  password: "********",
  address: {
    street: "123 Main Street",
    city: "Example City",
    state: "Sample State",
    postalCode: "12345",
  },
  userType: "penyelia",
  semester: "Spring 2023",
  race: "Melayu",
  gender: "Lelaki",
  illness: "None",
  profilePicFileName: "john_doe.jpg",
};

export default dummyUserData;


export const sampleRegistrationForms: RegisterForm[] = Array(5).fill({
  formType: "masuk",
  tenantInfo: {
    name: "John Doe",
    nric: "A123456",
    matrikNo: "12345",
    phone: "123-456-7890",
    email: "john@example.com",
    address: {
      street: "123 Main St",
      city: "Cityville",
      state: "State",
      postalCode: "12345",
    },
    semester: "1",
    race: "Melayu",
    gender: "L",
  },
  roomNo: 101,
  blockNo: 1,
  resitNo: 15245624,
  offerLetterFile: null,
  paymentReceiptFile: null,
  emergencyContactInfo: {
    name: "Jane Doe",
    phone: "0124187351",
    relationship: "Ibu",
    address: {
      street: "456 Elm St",
      city: "Townsville",
      state: "State",
      postalCode: "54321",
    },
  },
  tenantAgreement: true,
  timestamp: 1635494400,
});

export const sampleComplaints: Complaint[] = Array(5).fill({
  email: "jane@example.com",
  name: "Jane Doe",
  title: "Water Leak",
  complaintType: "kerosakan fasiliti",
  elaboration: "There is a water leak in the bathroom.",
  evidenceFile: null,
  timestamp: 1635494400,
  adminResponse: "Under investigation",
  adminCheck: false,
  adminActionTaken: false,
});

export const sampleNotifications: Notification[] = Array(10).fill({
  timestamp: 1635494400,
  author: "Admin",
  userType: "penyelia",
  title: "Important Announcement",
  remarks: "Please be informed about the upcoming maintenance schedule.",
  isRead: false,
});
