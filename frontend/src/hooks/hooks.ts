import { getAllComplaints } from "../api/complaint-api";
import { getAllNotifications } from "../api/notification-api";
import { useDataFetching } from "../helpers/shared-helpers";
import { getAllCheckInForms, getAllCheckOutForms } from "../api/registration-api";
import { Complaint, Notification, User, CheckInForm, CheckoutForm } from "shared-library/src/declarations/types";
import { getAuthorisedUser } from "../api/user-api";

export const useUserProfile = () => {
  return useDataFetching<User>(async () => await getAuthorisedUser());
};

export const useAllCheckInForms = () => {
  return useDataFetching<CheckInForm[]>(async () => await getAllCheckInForms());
}

export const useAllCheckOutForms = () => {
  return useDataFetching<CheckoutForm[]>(
    async () => await getAllCheckOutForms()
  );
};

export const useAllComplaints = () => {
  return useDataFetching<Complaint[]>(async () => await getAllComplaints());
};

export const useAllNotifications = () => {
  return useDataFetching<Notification[]>(async () => await getAllNotifications());
};