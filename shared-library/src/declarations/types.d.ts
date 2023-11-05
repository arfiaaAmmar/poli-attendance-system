/// <reference types="multer" />
import { ReactNode } from "react";
import { Document, ObjectId } from "mongoose";
export type Race = "Melayu" | "Cina" | "India" | "Lain";
export type Gender = "Lelaki" | "Perempuan";
export type Relationship = "Ibu Bapa" | "Ibu" | "Bapa" | "Saudara" | "Penjaga";
export type UserType = "penyelia" | "pelajar";
export type FormType = "keluar" | "masuk";
export type ComplaintType = "kerosakan fasiliti" | "disiplin pelajar";
export type Feedback = {
    success: string;
    error: string;
};
export type DefaultValues = {
    string: string;
    number: number | null;
    date: Date | null;
    file: File | null;
    boolean: boolean;
    object: Record<string, any> | null;
    array: any[] | null;
};
export type TypeToDefault<T> = T extends keyof DefaultValues ? DefaultValues[T] : never;
export type SidebarRoute = {
    displayText: string;
    icon?: ReactNode;
    path: string;
    children?: SidebarRoute[];
};
export type Address = {
    street: string;
    city: string;
    state: string;
    postalCode: string;
};
export type EmergencyContact = {
    name: string;
    phone: string;
    relationship: Relationship;
    address: Address;
};
export type User = {
    _id?: string;
    name: string;
    nric: string;
    matrikNo: string;
    phone: string;
    email: string;
    password: string;
    address: Address;
    userType: UserType;
    semester?: string;
    race: Race;
    gender: Gender;
    illness?: string;
    profilePicFile?: File | null;
    profilePicFileName?: string;
};
export type UserForModel = Omit<User, "profilePicFile">;
export type TenantInfo = Omit<User, "password" | "userType">;
export interface IUser extends UserForModel, Document {
    _id?: string;
    profilePicFileName: string;
}
export type RegisterForm = {
    _id?: string;
    formType: FormType;
    tenantInfo: TenantInfo;
    roomNo: string;
    blockNo: string;
    resitNo: string;
    offerLetterFile: File | null;
    paymentReceiptFile: File | null;
    emergencyContact: EmergencyContact;
    tenantAgreement: boolean;
    timestamp: number | null;
};
export type RegisterFormForModel = Omit<RegisterForm, "offerLetterFile" | "paymentReceiptFile">;
export interface IRegisterForm extends RegisterFormForModel, Document {
    _id?: string;
    offerLetterFileName: string;
    paymentReceiptFileName: string;
}
export type Complaint = {
    _id?: string;
    email: string;
    name: string;
    title: string;
    phone: string;
    roomNo: string;
    blockNo: string;
    complaintType: ComplaintType;
    elaboration: string;
    evidenceFile: File | null;
    adminResponse: string;
    adminCheck: boolean;
    adminActionTaken: boolean;
    timestamp: number | null;
};
export type ComplaintForModel = Omit<Complaint, "evidenceFile">;
export interface IComplaint extends ComplaintForModel, Document {
    _id?: string;
    evidenceFileName: string;
}
export type Notification = {
    _id?: string;
    author: {
        _id?: string;
        name: string;
    };
    userType: UserType;
    title: string;
    remarks: string;
    isRead: boolean;
    timestamp: number | null;
};
export type NotificationForModel = Omit<Notification, "author">;
export interface INotification extends NotificationForModel, Document {
    _id?: string;
    author: ObjectId;
}
export type DeleteControllerItem = "complaint" | "user" | "notification" | "registrationForm";
export type NestedState = {
    [key: string]: any;
};
export type UploadedFiles = Record<string, Express.Multer.File[]>;
export type FormState<T> = Record<keyof T, string | number | null | boolean | null>;
//# sourceMappingURL=types.d.ts.map