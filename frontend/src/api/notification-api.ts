import axios from 'axios';
import {
  API_BASE_URL,
  ENDPOINTS,
  FM,
  HEADER_TYPE,
} from "shared-library/src/declarations/constants";
import {
  CurrentUser,
  Notification,
} from "shared-library/src/declarations/types";

export const getAllNotifications = async () => {
  const currentUserData: CurrentUser = JSON.parse(
    sessionStorage.getItem("userData")!
  );
  try {
    const response = await fetch(
      `${API_BASE_URL}/get-all-notifications/${currentUserData._id}`,
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

export const postNotification = async (input: Notification) => {
  try {
    console.log(JSON.stringify(input, null, 2));
    const response = await axios.post(
      `${API_BASE_URL}${ENDPOINTS.postNotification}`,
      input
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.message || "An error occurred while sending the notification."
    );
  }
};


export const updateNotificationIsRead = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/update-notification/${id}`, {
      method: "PUT",
      headers: HEADER_TYPE,
      body: JSON.stringify({ isRead: true }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || FM.notificationUpdateFailed);
    }
  } catch (error) {
    console.error(FM.notificationUpdateFailed, error);
  }
};
