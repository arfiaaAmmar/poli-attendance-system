import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Complaint } from "shared-library/src/declarations/types";
import { STUDENT_PAGES_PATH } from "shared-library/src/declarations/constants";
import { useAllComplaints } from "../../../hooks/hooks";
import { MainPageOptionThumbnail } from "../../../components/MainPageOptionThumbnail";
import { LoadingIndicator } from "../../../components/LoadingIndicator";

export const StudentComplaints = () => {
  const { data, isLoading, error } = useAllComplaints();

  const renderStudentComplaints = () => {
    if (data) {
      return (
        <div className="overflow-y-auto h-screen">
          <Typography
            variant="h5"
            className="text-3xl text-white rounded-3xl font-semibold mb-4 bg-blue-800 p-2"
          >
            Senarai Sejarah Aduan
          </Typography>
          <Table component={Paper} className="w-full">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Admin Response</TableCell>
                <TableCell>Admin Action Taken</TableCell>
                <TableCell>Admin Check</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item: Complaint, index: number) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    {new Date(item.timestamp)
                      .toLocaleDateString("en-GB")
                      .toString()}
                  </TableCell>
                  <TableCell>{item.adminResponse ?? ""}</TableCell>
                  <TableCell>{item.adminActionTaken}</TableCell>
                  <TableCell>{item.adminCheck}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex gap-4 justify-center mt-8">
            <MainPageOptionThumbnail
              path={STUDENT_PAGES_PATH.kerosakanFasiliti}
              title="ADUAN KEROSAKAN FASILITI"
              logo="https://logowik.com/content/uploads/images/student5651.jpg"
            />
            <MainPageOptionThumbnail
              path={STUDENT_PAGES_PATH.disiplinPelajar}
              title="ADUAN MASALAH DISIPLIN PELAJAR"
              logo="https://cdn.vectorstock.com/i/preview-1x/35/93/admin-administration-people-icon-vector-47263593.jpg"
            />
          </div>
        </div>
      );
    }
    if (isLoading) {
      return <LoadingIndicator />;
    }
    if (error) {
      return (
        <Paper elevation={3} className="p-4 mb-4 rounded-md bg-gray-100">
          <Typography variant="h6" className="text-lg">
            Error: Unable to fetch notifications
          </Typography>
          <Typography className="mb-2">Error: {error.message}</Typography>
        </Paper>
      );
    }
  };

  return <div className="p-8 h-full">{renderStudentComplaints()}</div>;
};

export default StudentComplaints;
