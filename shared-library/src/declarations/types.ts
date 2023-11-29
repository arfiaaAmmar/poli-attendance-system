import { ReactNode } from "react";
import { Document } from "mongoose";

export type Ethnicity = "Melayu" | "Cina" | "India" | "Lain";
export type Gender = "Lelaki" | "Perempuan";
export type Relationship = "Ibu Bapa" | "Ibu" | "Bapa" | "Saudara" | "Penjaga";
export type UserType = "penyelia" | "pelajar";
export type FormType = "default" | "keluar" | "masuk";
export type ComplaintType =
  | "default"
  | "kerosakan fasiliti"
  | "disiplin pelajar";

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

export type TypeToDefault<T> = T extends keyof DefaultValues
  ? DefaultValues[T]
  : never;

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

export type Contact = {
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
  race: Ethnicity;
  gender: Gender;
  illness?: string;
  profilePicFile?: File | null;
  profilePicFileName?: string;
};

export type CurrentUser = Pick<
  User,
  "_id" | "email" | "name" | "phone" | "userType"
>;

export type UserForModel = Omit<User, "profilePicFile">;
export type TenantInfo = Omit<User, "password" | "userType">;
export interface IUser extends UserForModel, Document {
  _id?: string;
  profilePicFileName: string;
}

export type CheckInForm = {
  _id?: string;
  authorId: string;
  tenantInfo: TenantInfo;
  roomNo: string;
  blockNo: string;
  resitNo: string;
  formType: FormType;
  offerLetterFile?: File | null;
  paymentReceiptFile?: File | null;
  emergencyContact: Contact;
  tenantAgreement: boolean;
  timestamp: number | null;
};

export type RestOfCheckInForm = Omit<
  CheckInForm,
"tenantInfo" | "emergencyContact"
>;

export type CheckInForModel = Omit<
  CheckInForm,
  "offerLetterFile" | "paymentReceiptFile" | "checkoutEvidenceFile"
>;

export interface ICheckInForm extends CheckInForModel, Document {
  _id?: string;
  offerLetterFileName?: string;
  paymentReceiptFileName?: string;
}

export type CheckoutForm = {
  _id?: string;
  authorId: string;
  name: string;
  phone: string;
  roomNo: string;
  blockNo: string;
  formType: FormType;
  checkoutEvidenceFile?: File | null;
  checkoutReason: string;
  timestamp: number | null;
};

export type CheckOutForModel = Omit<CheckoutForm, "checkoutEvidenceFile">;

export interface ICheckOutForm extends CheckOutForModel, Document {
  _id?: string;
  checkoutEvidenceFileName: string;
}

export type Complaint = {
  _id?: string;
  authorId: string;
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
  senderId?: string;
  receiverId?: string;
  senderUserType: UserType;
  title: string;
  remarks: string;
  isRead: boolean;
  timestamp: number | null;
};

export type INotification = Notification & Document;

export type DeleteControllerItem =
  | "complaint"
  | "user"
  | "notification"
  | "registrationForm";

export type NestedState = {
  [key: string]: any;
};

export type UploadedFile = Record<string, Express.Multer.File>;
export type UploadedFiles = Record<string, Express.Multer.File[]>;

export type FormState<T> = Record<
  keyof T,
  string | number | null | boolean | null
>;

export type SendNotification = Pick<
  Notification,
  "title" | "receiverId" | "remarks"
>;

export type ChangePasswordForm = {
  email: string;
  newPassword: string;
  repeatPassword: string;
};

export type EmptyObject<T> = Record<keyof T, unknown>;
