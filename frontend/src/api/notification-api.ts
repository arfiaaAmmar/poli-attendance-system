import { API_BASE_URL, FM, HEADER_TYPE } from "shared-library/src/declarations/constants.js";
import { Notification } from "shared-library/src/declarations/types.js";

export const getAllNotifications = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-all-notifications/${userId}`, {
      headers: HEADER_TYPE
    });
    const data = await response.json();
    if (!response.ok) {
      const error = data.error || FM.default;
      throw new Error(error);
    }
    return data
  } catch (error: any) {
    throw new Error(FM.default);
  }
};

export const postNotification = async (input: Notification) => {
  try {
    const response = await fetch(`${API_BASE_URL}/post-notification`, {
      method: "POST",
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json;
  } catch (error) {
    throw (error as Error).message;
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