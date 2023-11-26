import { getAllComplaints } from "../api/complaint-api";
import { getAllNotifications } from "../api/notification-api";
import { useDataFetching } from "../helpers/shared-helpers";
import { getAllRegistrationForms } from "../api/registration-api";
import { Complaint, Notification, User, CheckInForm } from "shared-library/src/declarations/types";
import { getAuthorisedUser } from "../api/user-api";

export const useUserProfile = () => {
  return useDataFetching<User>(async () => await getAuthorisedUser());
};

export const useAllRegistrationForms = () => {
  return useDataFetching<CheckInForm[]>(async () => await getAllRegistrationForms());
}

export const useAllComplaints = () => {
  return useDataFetching<Complaint[]>(async () => await getAllComplaints());
};

export const useAllNotifications = () => {
  return useDataFetching<Notification[]>(async () => await getAllNotifications());
};