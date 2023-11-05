// For deployment
export const API_BASE_URL = "https://poli-attendance-system.onrender.com";
export const HEADER_TYPE = { "Content-Type": "application/json" };
export const FORM_TYPE = {
    keluar: "keluar",
    masuk: "masuk",
};
export const RELATIONSHIP = {
    ibu: "Ibu",
    bapa: "Bapa",
    adikBeradik: "Adik-beradik",
    saudara: "Saudara",
    penjaga: "Penjaga",
};
export const RACE = {
    melayu: "Melayu",
    cina: "Cina",
    india: "India",
    lainLain: "Lain-lain",
};
export const GENDER = {
    lelaki: "Lelaki",
    perempuan: "Perempuan",
};
export const USER_TYPE = {
    penyelia: "penyelia",
    pelajar: "pelajar",
};
export const STUDENT_PAGES_TITLE = {
    pengurusanProfil: "Pengurusan Profil",
    borangPendaftaranMasuk: "Borang Pendaftaran Masuk",
    borangPendaftaranKeluar: "Borang Pendaftaran Keluar",
    aduanPelajar: "Aduan Pelajar",
    kerosakanFasiliti: "Kerosakan Fasiliti dan Bilik",
    aduanDisiplin: "Aduan Disiplin Pelajar",
    notifikasi: "Notifikasi",
};
export const STUDENT_PAGES_PATH = {
    pengurusanProfil: "/pelajar/pengurusan-profil",
    borangPendaftaran: "/pelajar/borang-pendaftaran",
    borangPendaftaranMasuk: "/pelajar/borang-pendaftaran-masuk",
    borangPendaftaranKeluar: "/pelajar/borang-pendaftaran-keluar-",
    aduanPelajar: "/pelajar/aduan",
    kerosakanFasiliti: "/pelajar/aduan/kerosakan-fasiliti",
    aduanDisiplin: "/pelajar/aduan/disiplin-pelajar",
    notifikasi: "/pelajar/notifikasi",
};
export const ADMIN_PAGES_TITLE = {
    pengurusanProfil: "Pengurusan Profil",
    pengurusanPendaftaran: "Pengurusan Pendaftaran",
    pendaftaranBaru: "Pendaftaran Baru",
    pendaftaranKeluar: "Pendaftaran Keluar",
    pengurusanAduan: "Pengurusan Aduan",
    masalahDisiplin: "Masalah Disiplin",
    kerosakanFasiliti: "Kerosakan Fasiliti",
    notifikasi: "Notifikasi",
};
export const ADMIN_PAGES_PATH = {
    pengurusanProfil: "/penyelia/pengurusan-profil",
    pengurusanPendaftaran: "/penyelia/pengurusan-pendaftaran",
    pendaftaranBaru: "/penyelia/pengurusan-pendaftaran/pendaftaran-baru",
    pendaftaranKeluar: "/penyelia/pengurusan-pendaftaran/pendaftaran-keluar",
    pengurusanAduan: "/penyelia/pengurusan-aduan",
    masalahDisiplin: "/penyelia/pengurusan-aduan/masalah-disiplin",
    kerosakanFasiliti: "/penyelia/pengurusan-aduan/kerosakan-fasiliti",
    notifikasi: "/penyelia/notifikasi",
};
export const ENDPOINTS = {
    register: "/register",
    login: "/login",
    authoriseUser: "/authorise-user",
    getAllUsers: "/get-all-users",
    deleteUser: "/delete-user/:id",
    uploads: "/uploads",
    postRegisterForm: "/post-register-form",
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
};
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
};
export const initialComplaint = {
    email: "--",
    name: "--",
    title: "--",
    phone: "--",
    roomNo: "--",
    blockNo: "--",
    complaintType: "kerosakan fasiliti",
    elaboration: "",
    evidenceFile: null,
    adminResponse: "--",
    adminCheck: false,
    adminActionTaken: false,
    timestamp: null,
};
export const initialFeedback = {
    success: "",
    error: "",
};
export const initialAddress = {
    street: "",
    city: "",
    state: "",
    postalCode: "",
};
export const initialTenantInfo = {
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
export const initialEmergencyContact = {
    name: "",
    phone: "",
    relationship: "Bapa",
    address: initialAddress,
};
export const initialRegisterForm = {
    formType: "masuk",
    tenantInfo: initialTenantInfo,
    roomNo: "1",
    blockNo: "1",
    resitNo: "123ABC",
    offerLetterFile: null,
    paymentReceiptFile: null,
    emergencyContact: initialEmergencyContact,
    tenantAgreement: false,
    timestamp: null,
};
