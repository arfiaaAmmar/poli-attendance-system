import { Address, Complaint, EmergencyContact, Feedback, RegisterForm, TenantInfo } from "./types";
export declare const API_BASE_URL = "https://poli-attendance-system.onrender.com";
export declare const HEADER_TYPE: {
    readonly "Content-Type": "application/json";
};
export declare const FORM_TYPE: {
    readonly keluar: "keluar";
    readonly masuk: "masuk";
};
export declare const RELATIONSHIP: {
    readonly ibu: "Ibu";
    readonly bapa: "Bapa";
    readonly adikBeradik: "Adik-beradik";
    readonly saudara: "Saudara";
    readonly penjaga: "Penjaga";
};
export declare const RACE: {
    readonly melayu: "Melayu";
    readonly cina: "Cina";
    readonly india: "India";
    readonly lainLain: "Lain-lain";
};
export declare const GENDER: {
    readonly lelaki: "Lelaki";
    readonly perempuan: "Perempuan";
};
export declare const USER_TYPE: {
    readonly penyelia: "penyelia";
    readonly pelajar: "pelajar";
};
export declare const STUDENT_PAGES_TITLE: {
    readonly pengurusanProfil: "Pengurusan Profil";
    readonly borangPendaftaranMasuk: "Borang Pendaftaran Masuk";
    readonly borangPendaftaranKeluar: "Borang Pendaftaran Keluar";
    readonly aduanPelajar: "Aduan Pelajar";
    readonly kerosakanFasiliti: "Kerosakan Fasiliti dan Bilik";
    readonly aduanDisiplin: "Aduan Disiplin Pelajar";
    readonly notifikasi: "Notifikasi";
};
export declare const STUDENT_PAGES_PATH: {
    readonly pengurusanProfil: "/pelajar/pengurusan-profil";
    readonly borangPendaftaran: "/pelajar/borang-pendaftaran";
    readonly borangPendaftaranMasuk: "/pelajar/borang-pendaftaran-masuk";
    readonly borangPendaftaranKeluar: "/pelajar/borang-pendaftaran-keluar-";
    readonly aduanPelajar: "/pelajar/aduan";
    readonly kerosakanFasiliti: "/pelajar/aduan/kerosakan-fasiliti";
    readonly aduanDisiplin: "/pelajar/aduan/disiplin-pelajar";
    readonly notifikasi: "/pelajar/notifikasi";
};
export declare const ADMIN_PAGES_TITLE: {
    readonly pengurusanProfil: "Pengurusan Profil";
    readonly pengurusanPendaftaran: "Pengurusan Pendaftaran";
    readonly pendaftaranBaru: "Pendaftaran Baru";
    readonly pendaftaranKeluar: "Pendaftaran Keluar";
    readonly pengurusanAduan: "Pengurusan Aduan";
    readonly masalahDisiplin: "Masalah Disiplin";
    readonly kerosakanFasiliti: "Kerosakan Fasiliti";
    readonly notifikasi: "Notifikasi";
};
export declare const ADMIN_PAGES_PATH: {
    readonly pengurusanProfil: "/penyelia/pengurusan-profil";
    readonly pengurusanPendaftaran: "/penyelia/pengurusan-pendaftaran";
    readonly pendaftaranBaru: "/penyelia/pengurusan-pendaftaran/pendaftaran-baru";
    readonly pendaftaranKeluar: "/penyelia/pengurusan-pendaftaran/pendaftaran-keluar";
    readonly pengurusanAduan: "/penyelia/pengurusan-aduan";
    readonly masalahDisiplin: "/penyelia/pengurusan-aduan/masalah-disiplin";
    readonly kerosakanFasiliti: "/penyelia/pengurusan-aduan/kerosakan-fasiliti";
    readonly notifikasi: "/penyelia/notifikasi";
};
export declare const ENDPOINTS: {
    readonly register: "/register";
    readonly login: "/login";
    readonly authoriseUser: "/authorise-user";
    readonly getAllUsers: "/get-all-users";
    readonly deleteUser: "/delete-user/:id";
    readonly uploads: "/uploads";
    readonly postRegisterForm: "/post-register-form";
    readonly getAllRegisterForms: "/get-all-register-forms";
    readonly getRegisterForm: "/get-register-form/:id";
    readonly updateRegisterForm: "/update-register-form/:id";
    readonly deleteRegisterForm: "/delete-register-form";
    readonly postComplaint: "/post-complaint";
    readonly getAllComplaints: "/get-all-complaints";
    readonly getComplaint: "/get-complaint/:id";
    readonly updateComplaint: "/update-complaint/:id";
    readonly deleteComplaint: "/delete-complaint/:id";
    readonly postNotification: "/post-notification";
    readonly getAllNotifications: "/get-all-notifications/:userId";
    readonly getNotification: "/get-notification/:id";
    readonly updateNotification: "/update-notification/:id";
    readonly deleteNotification: "/delete-notification/:id";
};
export declare const FM: {
    readonly userAlreadyExist: "User already exists";
    readonly userRegistered: "User registered successfully";
    readonly userNotFound: "User not found";
    readonly userDeleted: "User deleted successfully";
    readonly invalidEmailOrPassword: "Invalid email or password";
    readonly loggedInSuccessfully: "User logged in successfully";
    readonly loginFailed: "Login failed";
    readonly logoutWarning: "Are you sure you want to leave this page ?";
    readonly complaintAdded: "Complaint added successfully";
    readonly complaintUpdateFailed: "Complaint failed to update";
    readonly complaintNotFound: "Complaint not found";
    readonly complaintDeleted: "Complaint deleted successfully";
    readonly registerFormAdded: "Registration form added successfully";
    readonly registerFormNotFound: "Registration form not found";
    readonly registerFormDeleted: "Register form deleted successfully";
    readonly notificationNotFound: "Notification not found";
    readonly notificationDeleted: "Notification deleted successfully";
    readonly notificationAdded: "Notification added successfully";
    readonly notificationUpdateFailed: "Notification failed to update";
    readonly authorizationTokenNotProvided: "Authorization token not provided";
    readonly pleaseFillNecessaryInformation: "Please fill the necessary information";
    readonly noFileUploaded: "No file uploaded";
    readonly internalServerError: "Internal server error";
    readonly default: "An error occurred";
};
export declare const initialComplaint: Complaint;
export declare const initialFeedback: Feedback;
export declare const initialAddress: Address;
export declare const initialTenantInfo: TenantInfo;
export declare const initialEmergencyContact: EmergencyContact;
export declare const initialRegisterForm: RegisterForm;
//# sourceMappingURL=constants.d.ts.map