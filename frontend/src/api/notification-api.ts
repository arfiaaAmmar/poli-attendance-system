import axios from "axios";
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
import { getUserSessionData } from "./user-api";

export const getAllNotifications = async () => {
  try {
    const userData = getUserSessionData();
    const { userType, _id } = userData;

    const response = await axios.get(
      `${API_BASE_URL}/get-all-notifications/${userType}/${_id}`,
      { headers: HEADER_TYPE }
    );

    return response.data;
  } catch (error) {
    console.error(FM.default, error);
    throw new Error(FM.default);
  }
};

export const getNotification = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-notification/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(FM.notificationNotFound);
  }
};

export const postNotification = async (input: Notification) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.postNotification}`,
      {
        method: "POST",
        headers: HEADER_TYPE,
        body: JSON.stringify(input),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json;
  } catch (error: any) {
    throw new Error(error.message || FM.default);
  }
};

export const updateNotificationIsRead = async (id: string) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/update-notification/${id}`,
      { isRead: true },
      { headers: HEADER_TYPE }
    );
    return response.data;
  } catch (error) {
    console.error(FM.notificationUpdateFailed, error);
    throw new Error(FM.notificationUpdateFailed);
  }
};
