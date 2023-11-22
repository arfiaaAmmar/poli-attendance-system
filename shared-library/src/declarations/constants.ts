import {
  Address,
  Complaint,
  Contact,
  Feedback,
  TenantInfo,
  CheckoutForm,
  CheckInForm,
  User,
  CurrentUser,
} from "./types";

// export const API_BASE_URL = "https://poli-attendance-system.onrender.com" // For deploy
export const API_BASE_URL = "http://localhost:8888"; // For dev
export const HEADER_TYPE = { "Content-Type": "application/json" };

export const STORAGE = {
  token: 'token',
  userData: 'userData',
} as const

export const FORM_TYPE = {
  default: "default",
  keluar: "keluar",
  masuk: "masuk",
} as const;

export const COMPLAINT_TYPE = {
  default: "default",
  kerosakanFasiliti: "kerosakan fasiliti",
  disiplinPelajar: "disiplin pelajar",
} as const;

export const RELATIONSHIP = {
  ibu: "Ibu",
  bapa: "Bapa",
  adikBeradik: "Adik-beradik",
  saudara: "Saudara",
  penjaga: "Penjaga",
} as const;

export const ETHNICITY = {
  melayu: 'Melayu',
  cina: 'Cina',
  india: 'India',
  lainLain: 'Lain-lain',
} as const

export const GENDER = {
  lelaki: "Lelaki",
  perempuan: "Perempuan",
} as const;

export const USER_TYPE = {
  penyelia: "penyelia",
  pelajar: "pelajar",
} as const;

export const USER_TYPE_ARR = Object.values(USER_TYPE)

export const STATES_IN_MALAYSIA = [
  "Perlis",
  "Kedah",
  "Perak",
  "Johor",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Pulau Pinang",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "Kuala Lumpur",
  "Labuan",
  "Putrajaya",
] as const;

export const SHARED_PAGES = {
  login: {
    title: "Daftar Masuk",
    path: "/login",
  },
  registerUser: {
    title: "Daftar Pengguna Baru",
    path: "/daftar-pengguna-baru",
  },
  forgotPassword: {
    title: "Lupa Kata Kunci",
    path: "/lupa-kata-kunci",
  },
} as const;

export const STUDENT_PAGES_TITLE = {
  halamanUtama: "Halaman Utama",
  pendaftaranPelajar: "Pendaftaran Pelajar",
  pengurusanProfil: "Pengurusan Profil",
  borangPendaftaran: "Borang Pendaftaran",
  borangPendaftaranMasuk: "Borang Pendaftaran Masuk",
  borangPendaftaranKeluar: "Borang Pendaftaran Keluar",
  aduanPelajar: "Aduan Pelajar",
  kerosakanFasiliti: "Kerosakan Fasiliti dan Bilik",
  disiplinPelajar: "Masalah Disiplin Pelajar",
  notifikasi: "Notifikasi",
} as const;

export const STUDENT_PAGES_PATH = {
  halamanUtama: "/pelajar/halaman-utama",
  pendaftaranPelajar: "/pelajar/pendaftaran",
  pengurusanProfil: "/pelajar/pengurusan-profil",
  borangPendaftaran: "/pelajar/borang-pendaftaran",
  borangPendaftaranMasuk: "/pelajar/borang-pendaftaran-masuk",
  borangPendaftaranKeluar: "/pelajar/borang-pendaftaran-keluar",
  aduanPelajar: "/pelajar/aduan",
  kerosakanFasiliti: "/pelajar/aduan/kerosakan-fasiliti",
  disiplinPelajar: "/pelajar/aduan/disiplin-pelajar",
  notifikasi: "/pelajar/notifikasi",
} as const;

export const ADMIN_PAGES_TITLE = {
  halamanUtama: "Halaman Utama",
  pendaftaranPenyelia: "Pendaftaran Penyelia",
  pengurusanProfil: "Pengurusan Profil",
  pengurusanPendaftaran: "Pengurusan Pendaftaran",
  pendaftaranBaru: "Pendaftaran Baru",
  pendaftaranKeluar: "Pendaftaran Keluar",
  pengurusanAduan: "Pengurusan Aduan",
  masalahDisiplin: "Masalah Disiplin",
  kerosakanFasiliti: "Kerosakan Fasiliti",
  notifikasi: "Notifikasi",
} as const;

export const ADMIN_PAGES_PATH = {
  halamanUtama: "/penyelia/halaman-utama",
  pendaftaranPenyelia: "/penyelia/pendaftaran",
  pengurusanProfil: "/penyelia/pengurusan-profil",
  pengurusanPendaftaran: "/penyelia/pengurusan-pendaftaran",
  pendaftaranBaru: "/penyelia/pengurusan-pendaftaran/pendaftaran-baru",
  pendaftaranKeluar: "/penyelia/pengurusan-pendaftaran/pendaftaran-keluar",
  pengurusanAduan: "/penyelia/pengurusan-aduan",
  masalahDisiplin: "/penyelia/pengurusan-aduan/masalah-disiplin",
  kerosakanFasiliti: "/penyelia/pengurusan-aduan/kerosakan-fasiliti",
  notifikasi: "/penyelia/notifikasi",
} as const;

export const ENDPOINTS = {
  register: "/register",
  login: "/login",
  authoriseUser: "/authorise-user",
  getAllUsers: "/get-all-users",
  deleteUser: "/delete-user/:id",
  uploads: "/uploads",
  postCheckInForm: "/post-checkin-form",
  postCheckOutForm: "/post-checkout-form",
  getAllRegisterForms: "/get-all-register-forms",
  getRegisterForm: "/get-register-form/:id",
  updateRegisterForm: "/update-register-form/:id",
  deleteRegisterForm: "/delete-register-form",
  postComplaint: "/post-complaint",
  getAllComplaints: "/get-all-complaints",
  getComplaint: "/get-complaint/:id",
  updateComplaint: "/update-complaint/:id",
  deleteComplaint: "/delete-complaint/:id",
  postNotification: "/post-notification",
  getAllNotifications: "/get-all-notifications/:userId",
  getNotification: "/get-notification/:id",
  updateNotification: "/update-notification/:id",
  deleteNotification: "/delete-notification/:id",
} as const;

// FM -> Feedback Messages
export const FM = {
  userAlreadyExist: "User already exists",
  userRegistered: "User registered successfully",
  userNotFound: "User not found",
  userDeleted: "User deleted successfully",
  invalidEmailOrPassword: "Invalid email or password",
  loggedInSuccessfully: "User logged in successfully",
  loginFailed: "Login failed",
  logoutWarning: "Are you sure you want to leave this page ?",
  pleaseFillTheResponse: "Please fill the response",
  complaintAdded: "Complaint added successfully",
  complaintUpdateFailed: "Complaint failed to update",
  complaintNotFound: "Complaint not found",
  complaintDeleted: "Complaint deleted successfully",
  registerFormAdded: "Registration form added successfully",
  registerFormNotFound: "Registration form not found",
  registerFormDeleted: "Register form deleted successfully",
  notificationNotFound: "Notification not found",
  notificationDeleted: "Notification deleted successfully",
  notificationAdded: "Notification added successfully",
  notificationUpdateFailed: "Notification failed to update",
  authorizationTokenNotProvided: "Authorization token not provided",
  pleaseFillNecessaryInformation: "Please fill the necessary information",
  noFileUploaded: "No file uploaded",
  internalServerError: "Internal server error",
  default: "An error occurred",
} as const;

export const CHECKOUT_REASONS = {
  roomChange: "Tukar bilik penginapan",
  blockChange: "Tukar blok kediaman",
  semesterBreak: "Cuti Semester",
  internship: "Latihan Industri",
  graduated: "Tamat Pengajian",
  others: "Lain-lain",
};

export const initialComplaint: Complaint = {
  authorId: '',
  email: "",
  name: "",
  title: "",
  phone: "",
  roomNo: "",
  blockNo: "",
  complaintType: "kerosakan fasiliti",
  elaboration: "",
  evidenceFile: null,
  adminResponse: "",
  adminCheck: false,
  adminActionTaken: false,
  timestamp: null,
};

export const initialFeedback: Feedback = {
  success: "",
  error: "",
};

export const initialAddress: Address = {
  street: "",
  city: "",
  state: "",
  postalCode: "",
};

export const initialTenantInfo: TenantInfo = {
  name: "",
  nric: "",
  matrikNo: "",
  phone: "",
  email: "",
  address: initialAddress,
  semester: "",
  race: "Melayu",
  gender: "Lelaki",
  illness: "",
  profilePicFile: null,
};

export const initialEmergencyContact: Contact = {
  name: "",
  phone: "",
  relationship: "Bapa",
  address: initialAddress,
};

export const initialCheckInForm: CheckInForm = {
  authorId: '',
  tenantInfo: initialTenantInfo,
  roomNo: "",
  blockNo: "",
  resitNo: "",
  formType: "masuk",
  offerLetterFile: null,
  paymentReceiptFile: null,
  emergencyContact: initialEmergencyContact,
  tenantAgreement: false,
  timestamp: Date.now(),
};

export const initialCheckoutForm: CheckoutForm = {
  authorId: '',
  name: "",
  phone: "",
  roomNo: "",
  blockNo: "",
  formType: "masuk",
  checkoutEvidenceFile: null,
  checkoutReason: "",
  timestamp: Date.now(),
};

export const initialRegisterUserForm: User = {
  name: "",
  nric: "",
  matrikNo: "",
  phone: "",
  email: "",
  password: "",
  address: initialAddress,
  userType: "pelajar",
  semester: "",
  race: "Melayu",
  gender: "Lelaki",
  illness: "",
};
