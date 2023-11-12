import { timeStampFormatter } from "../../helpers/shared-helpers";
import { useAllNotifications } from "../../hooks/hooks";
import { Avatar, Paper, Typography } from "@mui/material";
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
            className="p-4 mb-4 rounded-md bg-gray-100 flex items-center"
          >
            <div className="w-2/12">
              <Avatar className="m-auto" sx={{ width: 80, height: 80 }} />
            </div>
            <div className="w-8/12">
              <Typography className="mb-2 text-xl font-semibold">
                {notification?.author?.name}
              </Typography>
              <Typography variant="h6" className="text-lg font-semibold">
                {notification.title}
              </Typography>
              <Typography className="mb-2">{notification.remarks}</Typography>
            </div>
            <div className="w-2/12 text-right">
              <Typography className="mb-2 font-semibold">
                {timeStampFormatter(notification.timestamp).date}
              </Typography>
              <Typography className="mb-2 font-semibold">
                {timeStampFormatter(notification.timestamp).time}
              </Typography>
              <Typography className="mb-2 font-semibold">
                {notification.isRead ? (
                  <span className="text-green-500">Read</span>
                ) : (
                  <span className="text-red-500">Unread</span>
                )}
              </Typography>
            </div>
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
    <Paper className="p-4 h-screen bg-yellow-50 shadow-md rounded-lg">
      <Typography
        variant="h5"
        className="text-4xl mb-4 mt-4 font-semibold bg-blue-800 text-white rounded-2xl p-2"
      >
        Notifikasi
      </Typography>
      {renderNotifications()}
    </Paper>
  );
};

export default Notifications;
