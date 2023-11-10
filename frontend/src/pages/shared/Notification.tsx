import { timeStampFormatter } from "../../helpers/shared-helpers";
import { useAllNotifications } from "../../hooks/hooks";
import { Paper, Typography } from "@mui/material";
import { getUserSessionData } from "../../api/user-api";
import { LoadingIndicator } from "../../components/LoadingIndicator";

const Notifications = () => {
  const user = getUserSessionData();
  const { data, isLoading, error } = useAllNotifications(user?._id);

  const renderNotifications = () => {
    switch (true) {
      case !!data:
        return data.map((notification) => (
          <Paper
            elevation={3}
            key={notification._id}
            className="p-4 mb-4 rounded-md bg-gray-100 "
          >
            <Typography variant="h6" className="text-lg">
              {notification.title}
            </Typography>
            <Typography className="mb-2">
              Date: {timeStampFormatter(notification.timestamp).date}
            </Typography>
            <Typography className="mb-2">
              Time: {timeStampFormatter(notification.timestamp).time}
            </Typography>
            <Typography className="mb-2">
              Author: {notification?.author?.name}
            </Typography>
            <Typography className="mb-2">
              Remarks: {notification.remarks}
            </Typography>
            <Typography className="mb-2">
              Status: {notification.isRead ? "Read" : "Unread"}
            </Typography>
          </Paper>
        ));
      case isLoading:
        return <LoadingIndicator />;
      case !!error:
        return (
          <Paper elevation={3} className="p-4 mb-4 rounded-md bg-gray-100">
            <Typography variant="h6" className="text-lg">
              Error: Unable to fetch notifications
            </Typography>
            <Typography className="mb-2">Error: {error.message}</Typography>
          </Paper>
        );
      default:
        return null;
    }
  };

  return (
    <Paper className="p-4 bg-yellow-50 shadow-md rounded-lg">
      <Typography variant="h5" className="text-xl mb-4">
        Notifikasi
      </Typography>
      {renderNotifications()}
    </Paper>
  );
};

export default Notifications;
