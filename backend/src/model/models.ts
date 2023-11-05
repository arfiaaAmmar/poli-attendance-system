import { Schema, model } from "mongoose";
import { Address, EmergencyContact, IComplaint, INotification, IRegisterForm, IUser, TenantInfo } from "shared-library/src/declarations/types";

const relationshipEnum = ["Ibu", "Bapa", "Saudara"];
const raceEnum = ["Melayu", "Cina", "India", "Lain-lain"];
const genderEnum = ["Lelaki", "Perempuan"];
const userTypeEnum = ["penyelia", "pelajar"];
const complaintTypeEnum = ["kerosakan fasiliti", "disiplin pelajar"];
const malaysiaStatesEnum = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "Kuala Lumpur",
  "Labuan",
  "Putrajaya",
];

const AddressSchema = new Schema<Address>({
  street: String,
  city: String,
  state: {
    type: String,
    enum: malaysiaStatesEnum,
    required: true,
  },
  postalCode: String,
});

const EmergencyContactSchema = new Schema<EmergencyContact>({
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

const registerFormSchema = new Schema<IRegisterForm>({
  tenantInfo: TenantInfoSchema,
  roomNo: String,
  blockNo: String,
  resitNo: String,
  offerLetterFileName: String,
  paymentReceiptFileName: String,
  emergencyContact: EmergencyContactSchema,
  tenantAgreement: Boolean,
  timestamp: Number,
});

const complaintSchema = new Schema<IComplaint>({
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
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userType: {
    type: String,
    enum: userTypeEnum,
  },
  remarks: String,
  isRead: Boolean,
  timestamp: Number,
});

export const UserModel = model<IUser>("User", userSchema);
export const RegistrationFormModel = model<IRegisterForm>(
  "RegistrationForm",
  registerFormSchema
);
export const ComplaintModel = model<IComplaint>("Complaint", complaintSchema);
export const NotificationModel = model<INotification>(
  "Notification",
  notificationSchema
);
