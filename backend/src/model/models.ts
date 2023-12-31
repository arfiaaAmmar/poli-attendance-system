import { Schema, model } from "mongoose";
import {
  Address,
  Contact,
  IComplaint,
  INotification,
  IUser,
  TenantInfo,
  ICheckInForm,
  ICheckOutForm,
} from "shared-library/src/declarations/types";

const relationshipEnum = ["Ibu", "Bapa", "Saudara"];
const raceEnum = ["Melayu", "Cina", "India", "Lain-lain"];
const genderEnum = ["Lelaki", "Perempuan"];
const userTypeEnum = ["penyelia", "pelajar"];
const formType = ["masuk", "keluar"];
const complaintTypeEnum = ["kerosakan fasiliti", "disiplin pelajar"];

const AddressSchema = new Schema<Address>({
  street: String,
  city: String,
  state: String,
  postalCode: String,
});

const EmergencyContactSchema = new Schema<Contact>({
  name: String,
  phone: String,
  relationship: {
    type: String,
    enum: relationshipEnum,
    required: true,
  },
  address: AddressSchema,
});

const TenantInfoSchema = new Schema<TenantInfo>({
  name: String,
  nric: String,
  phone: String,
  address: AddressSchema,
  semester: String,
  illness: String,
  gender: {
    type: String,
    enum: genderEnum,
  },
  race: {
    type: String,
    enum: raceEnum,
  },
});

const userSchema = new Schema<IUser>({
  name: String,
  nric: String,
  matrikNo: String,
  phone: String,
  email: String,
  password: String,
  address: AddressSchema,
  userType: { type: String, enum: userTypeEnum },
  semester: String,
  race: {
    type: String,
    enum: raceEnum,
  },
  gender: {
    type: String,
    enum: genderEnum,
  },
  illness: String,
  profilePicFileName: String,
});

const checkInFormSchema = new Schema<ICheckInForm>({
  authorId: String,
  tenantInfo: TenantInfoSchema,
  roomNo: String,
  blockNo: String,
  resitNo: String,
  formType: {
    type: String,
    enum: formType,
  },
  offerLetterFileName: String,
  paymentReceiptFileName: String,
  emergencyContact: EmergencyContactSchema,
  tenantAgreement: Boolean,
  timestamp: Number,
});

const checkOutFormSchema = new Schema<ICheckOutForm>({
  authorId: String,
  name: String,
  phone: String,
  roomNo: String,
  blockNo: String,
  formType: {
    type: String,
    enum: formType,
  },
  checkoutEvidenceFileName: String,
  checkoutReason: String,
  timestamp: Number,
});

const complaintSchema = new Schema<IComplaint>({
  authorId: String,
  email: String,
  name: String,
  title: String,
  complaintType: {
    type: String,
    enum: complaintTypeEnum,
  },
  phone: String,
  roomNo: String,
  blockNo: String,
  elaboration: String,
  evidenceFileName: String,
  adminResponse: String,
  adminCheck: Boolean,
  adminActionTaken: Boolean,
  timestamp: Number,
});

const notificationSchema = new Schema<INotification>({
  senderId: String,
  receiverId: String,
  senderUserType: {
    type: String,
    enum: userTypeEnum,
  },
  title: String,
  remarks: String,
  isRead: Boolean,
  timestamp: Number,
});

export const UserModel = model<IUser>("User", userSchema);
export const CheckInFormModel = model<ICheckInForm>(
  "CheckInForm",
  checkInFormSchema
);
export const CheckOutFormModel = model<ICheckOutForm>(
  "CheckOutForm",
  checkOutFormSchema
);
export const ComplaintModel = model<IComplaint>("Complaint", complaintSchema);
export const NotificationModel = model<INotification>(
  "Notification",
  notificationSchema
);
