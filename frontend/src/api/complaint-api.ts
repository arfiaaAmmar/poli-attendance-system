import {
  API_BASE_URL,
  ENDPOINTS,
  FM,
  HEADER_TYPE,
} from "shared-library/src/declarations/constants";
import {
  Complaint,
  ComplaintType,
  CurrentUser,
} from "shared-library/src/declarations/types";

export const postComplaint = async (
  input: Complaint,
  complaintType: ComplaintType
) => {
  try {
    const formData = new FormData();
    const currentUser: CurrentUser = JSON.parse(sessionStorage.getItem("userData")!);
    formData.append("authorId", currentUser._id!);
    formData.append("email", input.email!);
    formData.append("name", input.name!);
    formData.append("title", input.title!);
    formData.append("phone", input.phone!);
    formData.append("roomNo", input.roomNo!);
    formData.append("blockNo", input.blockNo!);
    formData.append("adminResponse", input.adminResponse ?? "");
    formData.append("adminCheck", input.adminCheck.toString() ?? "false");
    formData.append(
      "adminActionTaken",
      input.adminActionTaken.toString() ?? "false"
    );
    formData.append("complaintType", complaintType);
    formData.append("elaboration", input.elaboration!);
    formData.append("timestamp", Date.now().toString()!);
    formData.append("evidenceFile", input.evidenceFile!);

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.postComplaint}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    throw (error as Error).message;
  }
};

export const getAllComplaints = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.getAllComplaints}`,
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
    throw new Error(error);
  }
};

export const getComplaint = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-complaint/${id}`, {
      headers: HEADER_TYPE,
    });
    const data = await response.json();

    if (!response.ok) {
      const error = data.error || FM.default;
      throw new Error(error);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateComplaint = async (
  id: string | undefined,
  data: Partial<Complaint>
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/update-complaint/${id}`, {
      method: "PATCH",
      headers: HEADER_TYPE,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || FM.complaintUpdateFailed);
    }
  } catch (error) {
    console.error(FM.complaintUpdateFailed, error);
  }
};
