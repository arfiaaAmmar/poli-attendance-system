import { useState } from "react";
import { postComplaint } from "../../api/complaint-api";
import { downloadPDF } from "../../utils/pdfGenerate";
import { isEmptyObject } from "../../helpers/shared-helpers";
import {
  Button,
  TextField,
  TextareaAutosize,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import { getUserSessionData } from "../../api/user-api";
import { useAllComplaints } from "../../hooks/hooks";
import {
  initialComplaint,
  initialFeedback,
  FM,
  STUDENT_PAGES_TITLE,
} from "shared-library/src/declarations/constants";
import {
  Complaint,
  ComplaintType,
  FormType,
} from "shared-library/src/declarations/types";
import {
  COMPLAINT_TYPE,
  STUDENT_PAGES_PATH,
} from "shared-library/src/declarations/constants.js";
import { useNavigate } from "react-router-dom";

const StudentComplaints = ({ page }: { page: ComplaintType }) => {
  const [complaint, setComplaint] = useState<Complaint>(initialComplaint);
  const [feedback, setFeedback] = useState(initialFeedback);
  const userData = getUserSessionData();
  const allComplaints = useAllComplaints();
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setComplaint({ ...complaint, evidenceFile: file });
    }
  };

  const handleComplaintSubmit = async (complaintType: ComplaintType) => {
    if (isEmptyObject(complaint)) {
      setFeedback({
        ...feedback,
        error: FM.pleaseFillNecessaryInformation,
      });
      return;
    }
    try {
      await postComplaint({
        ...complaint,
        email: userData?.email ?? "",
      }, complaintType);
      setFeedback({
        ...feedback,
        success: FM.complaintAdded,
      });

      setTimeout(() => {
        setFeedback({ ...feedback, success: "" });
      }, 3000);

      allComplaints.refetch();
      setComplaint(initialComplaint);
    } catch (error: any) {
      setFeedback({ ...feedback, error: error });
    }
  };

  const renderComplaint = () => {
    if (page === COMPLAINT_TYPE.default) {
      return (
        <>
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
                  <TableCell>Download</TableCell>
                  <TableCell>Admin Response</TableCell>
                  <TableCell>Action Taken</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allComplaints?.data?.map((item: Complaint, index: number) => (
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
              <div
                className="bg-white text-center rounded-lg p-4 cursor-pointer m-auto transform hover:scale-105 transition duration-300 ease-in-out"
                onClick={() => {
                  navigate(STUDENT_PAGES_PATH.kerosakanFasiliti);
                }}
              >
                <p className="font-bold text-lg">ADUAN KEROSAKAN FASILITI</p>
                <img
                  src="https://logowik.com/content/uploads/images/student5651.jpg"
                  alt=""
                  className="w-80 h-80 object-contain hover:cursor-pointer"
                />
              </div>
              <div
                className="bg-white rounded-lg text-center p-4 cursor-pointer m-auto transform hover:scale-105 transition duration-300 ease-in-out"
                onClick={() => {
                  navigate(STUDENT_PAGES_PATH.disiplinPelajar);
                }}
              >
                <p className="font-bold text-lg">ADUAN MASALAH DISIPLIN PELAJAR</p>
                <img
                  src="https://cdn.vectorstock.com/i/preview-1x/35/93/admin-administration-people-icon-vector-47263593.jpg"
                  alt=""
                  className="w-80 h-80 object-contain hover:cursor-pointer"
                />
              </div>
            </div>
          </div>
        </>
      );
    }
    if (page === COMPLAINT_TYPE.kerosakanFasiliti) {
      return (
        <>
          <Typography
            variant="h5"
            className="text-3xl text-white rounded-3xl font-semibold mb-4 bg-blue-800 p-2"
          >
            {STUDENT_PAGES_TITLE.kerosakanFasiliti}
          </Typography>
          <Paper className="p-4">
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <TextField
                  label="Email"
                  required
                  onChange={(e) =>
                    setComplaint({ ...complaint, email: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <TextField
                  label="Name"
                  required
                  onChange={(e) =>
                    setComplaint({ ...complaint, name: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <TextField
                  label="Title"
                  required
                  onChange={(e) =>
                    setComplaint({ ...complaint, title: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <TextField
                  label="Room No"
                  required
                  onChange={(e) =>
                    setComplaint({ ...complaint, roomNo: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <TextField
                  label="Block No"
                  required
                  onChange={(e) =>
                    setComplaint({ ...complaint, blockNo: e.target.value })
                  }
                  className="w-full"
                />
              </div>
            </div>
            <div className="mb-4 border rounded-lg p-2">
              <TextareaAutosize
                placeholder="Elaboration"
                required
                onChange={(e) =>
                  setComplaint({ ...complaint, elaboration: e.target.value })
                }
                className="w-full border-0 focus:outline-none"
                style={{ resize: "none" }}
              />
            </div>

            <input
              type="file"
              accept="image/jpeg"
              required
              className="w-full mb-4"
              onChange={handleFileChange}
            />
            {feedback.error ? (
              <Typography variant="subtitle1" color="error">
                {feedback.error}
              </Typography>
            ) : feedback.success ? (
              <Typography variant="subtitle1" color="success">
                {feedback.success}
              </Typography>
            ) : null}
            <Button variant="contained" color="primary" onClick={() => handleComplaintSubmit("kerosakan fasiliti" )}>
              Submit
            </Button>
          </Paper>
        </>
      );
    }
    if (page === COMPLAINT_TYPE.disiplinPelajar) {
      return (
        <>
          <Typography
            variant="h5"
            className="text-3xl text-white rounded-3xl font-semibold mb-4 bg-blue-800 p-2"
          >
            {STUDENT_PAGES_TITLE.disiplinPelajar}
          </Typography>
          <Paper className="p-4">
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <TextField
                  label="Email"
                  required
                  onChange={(e) =>
                    setComplaint({ ...complaint, email: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <TextField
                  label="Name"
                  required
                  onChange={(e) =>
                    setComplaint({ ...complaint, name: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <TextField
                  label="Title"
                  required
                  onChange={(e) =>
                    setComplaint({ ...complaint, title: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <TextField
                  label="Room No"
                  required
                  onChange={(e) =>
                    setComplaint({ ...complaint, roomNo: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <TextField
                  label="Block No"
                  required
                  onChange={(e) =>
                    setComplaint({ ...complaint, blockNo: e.target.value })
                  }
                  className="w-full"
                />
              </div>
            </div>
            <div className="mb-4 border rounded-lg p-2">
              <TextareaAutosize
                placeholder="Elaboration"
                required
                onChange={(e) =>
                  setComplaint({ ...complaint, elaboration: e.target.value })
                }
                className="w-full border-0 focus:outline-none"
                style={{ resize: "none" }}
              />
            </div>

            <input
              type="file"
              accept="image/jpeg"
              required
              className="w-full mb-4"
              onChange={handleFileChange}
            />
            {feedback.error ? (
              <Typography variant="subtitle1" color="error">
                {feedback.error}
              </Typography>
            ) : feedback.success ? (
              <Typography variant="subtitle1" color="success">
                {feedback.success}
              </Typography>
            ) : null}
            <Button variant="contained" color="primary" onClick={() => handleComplaintSubmit("disiplin pelajar")}>
              Submit
            </Button>
          </Paper>
        </>
      );
    }
  };

  return <div className="p-8 h-full">{renderComplaint()}</div>;
};

export default StudentComplaints;
