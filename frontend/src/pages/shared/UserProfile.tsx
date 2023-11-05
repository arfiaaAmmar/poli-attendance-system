import { Avatar, Paper, Typography } from "@mui/material";
import { useUserProfile } from "frontend/src/hooks/hooks";
import { ADMIN_PAGES_TITLE } from "shared-library/src/declarations/constants";

const UserProfile = () => {
  const { data, isLoading, error } = useUserProfile();

  return (
    <Paper className="p-4 bg-white shadow-md rounded-lg">
      <Typography variant="h5" className="text-xl mb-4">
        {ADMIN_PAGES_TITLE.pengurusanProfil}
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <Typography variant="h6" className="text-lg mb-2">
              Personal Information
            </Typography>
            <Paper elevation={3} className="p-4 rounded-md bg-gray-100">
              <p>Name: {data?.name!}</p>
              <p>NRIC: {data?.nric!}</p>
              <p>Matric Number: {data?.matrikNo!}</p>
              <p>Email: {data?.email!}</p>
              <p>Phone: {data?.phone!}</p>
              <p>Semester: {data?.semester!}</p>
            </Paper>
          </div>
          <div>
            <Typography variant="h6" className="text-lg mb-2">
              Address
            </Typography>
            <Paper elevation={3} className="p-4 rounded-md bg-gray-100">
              <p>Street: {data?.address?.street!}</p>
              <p>City: {data?.address?.city!}</p>
              <p>State: {data?.address?.state!}</p>
              <p>Postal Code: {data?.address?.postalCode!}</p>
            </Paper>
          </div>
        </div>
        <div className="md:col-start-2">
          <Typography variant="h6" className="text-lg mb-2">
            Profile Picture
          </Typography>
          <Paper
            elevation={3}
            className="p-4 rounded-md bg-gray-100 text-center"
          >
            <Avatar
              alt="Profile Picture"
              src={data?.profilePicFileName}
              sx={{ width: 150, height: 150 }}
            />
          </Paper>
        </div>
      </div>
    </Paper>
  );
};

export default UserProfile;
