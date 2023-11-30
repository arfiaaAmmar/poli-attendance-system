import {
  API_BASE_URL,
  ENDPOINTS,
  FM,
  HEADER_TYPE,
} from "shared-library/src/declarations/constants";
import {
  Contact,
  TenantInfo,
  CheckoutForm,
  CheckInForm,
  RestOfCheckInForm,
} from "shared-library/src/declarations/types";

export const getAllCheckInForms = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.getAllCheckInForms}`,
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

export const getAllCheckOutForms = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.getAllCheckOutForms}`,
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

export const getCheckInForm = async (formId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-checkin-form/${formId}`, {
      headers: HEADER_TYPE,
    });
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

export const getCheckOutForm = async (formId: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/get-checkout-form/${formId}`,
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

export const postCheckInForm = async (
  tenantInfo: TenantInfo,
  emergencyContact: Contact,
  restOfFormData: RestOfCheckInForm
) => {
  try {
    const {
      roomNo,
      blockNo,
      resitNo,
      timestamp,
      tenantAgreement,
      paymentReceiptFile,
      offerLetterFile,
    } = restOfFormData;

    const formData = new FormData();
    const authorId = JSON.parse(sessionStorage.getItem("userData")!);
    formData.append("authorId", authorId);
    formData.append("tenantInfo[name]", tenantInfo?.name!);
    formData.append("tenantInfo[nric]", tenantInfo?.nric!);
    formData.append("tenantInfo[matrikNo]", tenantInfo?.matrikNo!);
    formData.append("tenantInfo[phone]", tenantInfo?.phone!);
    formData.append("tenantInfo[email]", tenantInfo?.email!);
    formData.append("tenantInfo[race]", tenantInfo?.race!);
    formData.append("tenantInfo[gender]", tenantInfo?.gender!);
    formData.append("tenantInfo[profilePicFile]", tenantInfo?.profilePicFile!);

    const tenantAddress = tenantInfo?.address;
    console.log("tenantAddress", tenantAddress);
    formData.append("tenantInfo[address][street]", tenantAddress.street!);
    formData.append("tenantInfo[address][city]", tenantAddress.city!);
    formData.append("tenantInfo[address][state]", tenantAddress.state!);
    formData.append(
      "tenantInfo[address][postalCode]",
      tenantAddress.postalCode!
    );

    formData.append("roomNo", roomNo!);
    formData.append("blockNo", blockNo!);
    formData.append("resitNo", resitNo!);
    formData.append("formType", "masuk");
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

    formData.append("tenantAgreement", tenantAgreement?.toString()!);
    formData.append("timestamp", timestamp?.toString()!);

    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.postCheckInForm}`,
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

export const postCheckOutForm = async (input: CheckoutForm) => {
  try {
    const formData = new FormData();
    const authorId = JSON.parse(sessionStorage.getItem("userData")!);
    formData.append("authorId", authorId);
    formData.append("name", input.name!);
    formData.append("phone", input.phone!);
    formData.append("roomNo", input.roomNo!);
    formData.append("blockNo", input.blockNo!);
    formData.append("formType", "keluar");
    formData.append("checkoutEvidenceFile", input.checkoutEvidenceFile!);
    formData.append("checkoutReason", input.checkoutReason!);
    formData.append("timestamp", input.timestamp?.toString()!);

    console.log("formData", formData);

    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.postCheckOutForm}`,
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

export const updateCheckInForm = async (id: string, input: CheckInForm) => {
  const updatedForm = input;

  try {
    const response = await fetch(`${API_BASE_URL}/update-checkin-form/${id}`, {
      method: "PUT",
      headers: HEADER_TYPE,
      body: JSON.stringify(updatedForm),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || FM.notificationUpdateFailed);
    }
  } catch (error) {
    console.error(FM.notificationUpdateFailed, error);
  }
};

export const updateCheckOutForm = async (id: string, input: CheckInForm) => {
  const updatedForm = input;

  try {
    const response = await fetch(`${API_BASE_URL}/update-checkout-form/${id}`, {
      method: "PUT",
      headers: HEADER_TYPE,
      body: JSON.stringify(updatedForm),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || FM.notificationUpdateFailed);
    }
  } catch (error) {
    console.error(FM.notificationUpdateFailed, error);
  }
};
