import {
  API_BASE_URL,
  ENDPOINTS,
  FM,
  HEADER_TYPE,
} from "shared-library/src/declarations/constants";
import {
  EmergencyContact,
  FormType,
  RegisterForm,
  TenantInfo,
} from "shared-library/src/declarations/types";

export const getAllRegistrationForms = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.getAllRegisterForms}`,
      {
        headers: HEADER_TYPE,
      }
    );
    const data = await response.json();
    if (!response.ok) {
      const error = data.error || FM.default;
      throw new Error(error);
    }
    return data;
  } catch (error: any) {
    throw new Error(FM.default);
  }
};

export const getRegistrationForm = async (formId: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/get-registration-form/${formId}`,
      {
        headers: HEADER_TYPE,
      }
    );
    const data = await response.json();
    if (!response.ok) {
      const error = data.error || FM.default;
      throw new Error(error);
    }
    return data;
  } catch (error: any) {
    throw new Error(FM.default);
  }
};

type OtherFormInfo = {
  _id?: string | undefined;
  formType: FormType;
  roomNo: string;
  blockNo: string;
  resitNo: string;
  offerLetterFile: File | null;
  paymentReceiptFile: File | null;
  tenantAgreement: boolean;
  timestamp: number | null | null;
};

export const postRegisterForm = async (
  tenantInfo: TenantInfo,
  emergencyContact: EmergencyContact,
  others: OtherFormInfo
) => {
  console.log(JSON.stringify(others));
  try {
    const {
      roomNo,
      blockNo,
      resitNo,
      timestamp,
      tenantAgreement,
      paymentReceiptFile,
      offerLetterFile,
      formType,
    } = others;

    const formData = new FormData();
    formData.append("formType", formType);
    console.log("tenantInfo", tenantInfo);
    formData.append("tenantInfo[name]", tenantInfo?.name!);
    formData.append("tenantInfo[nric]", tenantInfo?.nric!);
    formData.append("tenantInfo[matrikNo]", tenantInfo?.matrikNo!);
    formData.append("tenantInfo[phone]", tenantInfo?.phone!);
    formData.append("tenantInfo[email]", tenantInfo?.email!);
    formData.append("tenantInfo[race]", tenantInfo?.race!);
    formData.append("tenantInfo[gender]", tenantInfo?.gender!);
    formData.append("tenantInfo[profilePicFile]", tenantInfo?.profilePicFile!);

    const tenantAddress = tenantInfo?.address;
    console.log('tenantAddress',tenantAddress)
    formData.append("tenantInfo[address][street]", tenantAddress.street!);
    formData.append("tenantInfo[address][city]", tenantAddress.city!);
    formData.append("tenantInfo[address][state]", tenantAddress.state!);
    formData.append("tenantInfo[address][postalCode]", tenantAddress.postalCode!);

    formData.append("roomNo", roomNo!);
    formData.append("blockNo", blockNo!);
    formData.append("resitNo", resitNo!);
    formData.append("offerLetterFile", offerLetterFile!);
    formData.append("paymentReceiptFile", paymentReceiptFile!);

    formData.append("emergencyContact[name]", emergencyContact.name!);
    formData.append("emergencyContact[phone]", emergencyContact.phone!);
    formData.append(
      "emergencyContact[relationship]",
      emergencyContact.relationship!
    );

    const emergencyContactAddress = emergencyContact?.address!;
    formData.append(
      "emergencyContact[address][street]",
      emergencyContactAddress.street!
    );
    formData.append(
      "emergencyContact[address][city]",
      emergencyContactAddress.city!
    );
    formData.append(
      "emergencyContact[address][state]",
      emergencyContactAddress.state!
    );
    formData.append(
      "emergencyContact[address][postalCode]",
      emergencyContactAddress.postalCode!
    );

    formData.append("tenantAgreement", tenantAgreement?.toString());
    formData.append("timestamp", timestamp?.toString()!);

    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.postRegisterForm}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    throw (error as Error).message;
  }
};

export const updateRegistrationForm = async (
  id: string,
  input: RegisterForm
) => {
  const updatedForm = input;

  try {
    const response = await fetch(
      `${API_BASE_URL}/update-registration-form/${id}`,
      {
        method: "PUT",
        headers: HEADER_TYPE,
        body: JSON.stringify(updatedForm),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || FM.notificationUpdateFailed);
    }
  } catch (error) {
    console.error(FM.notificationUpdateFailed, error);
  }
};
