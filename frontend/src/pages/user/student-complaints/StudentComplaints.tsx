import { useState } from "react";
import { postComplaint } from "../../../api/complaint-api.js";
import { isEmptyObject, sendNotification } from "../../../helpers/shared-helpers.js";
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
} from "@mui/material";
import { getUserSessionData } from "../../../api/user-api.js";
import { useAllComplaints } from "../../../hooks/hooks.js";
import {
  initialComplaint,
  initialFeedback,
  FM,
  STUDENT_PAGES_TITLE,
} from "shared-library/src/declarations/constants";
import {
  Complaint,
  ComplaintType,
} from "shared-library/src/declarations/types";
import {
  COMPLAINT_TYPE,
  STUDENT_PAGES_PATH,
} from "shared-library/src/declarations/constants.js";
import { useNavigate } from "react-router-dom";
import { ComplaintTypeThumbnailBtn } from "./ComplaintTypeThumbnailBtn.js";

const StudentComplaints = ({ page }: { page: ComplaintType }) => {
  const [complaint, setComplaint] = useState(initialComplaint);
  const [feedback, setFeedback] = useState(initialFeedback);
  const userData = getUserSessionData();
  const allComplaints = useAllComplaints();
  const navigate = useNavigate();
  const user = getUserSessionData();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setComplaint({ ...complaint, evidenceFile: file });
    }
  };

  const handleComplaintSubmit = async (complaintType: ComplaintType) => {
    console.log(complaint);
    // if (isEmptyObject(complaint)) {
    //   setFeedback({ ...feedback, error: FM.pleaseFillNecessaryInformation });
    //   return;
    // }
    try {
      await postComplaint(
        {
          ...complaint,
          email: userData?.email ?? "",
        },
        complaintType
      );
      await sendNotification({
        title: `Aduan ${complaintType}`,
        remarks: `${user.name} has submitted a complaint form.`,
      });
      setFeedback({ ...feedback, success: FM.complaintAdded });

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
              <ComplaintTypeThumbnailBtn
                path={STUDENT_PAGES_PATH.kerosakanFasiliti}
                title="ADUAN KEROSAKAN FASILITI"
                logo="https://logowik.com/content/uploads/images/student5651.jpg"
              />
              <ComplaintTypeThumbnailBtn
                path={STUDENT_PAGES_PATH.disiplinPelajar}
                title="ADUAN MASALAH DISIPLIN PELAJAR"
                logo="https://cdn.vectorstock.com/i/preview-1x/35/93/admin-administration-people-icon-vector-47263593.jpg"
              />
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
              {[
                { label: "Email", stateKey: "email" },
                { label: "Name", stateKey: "name" },
                { label: "Title", stateKey: "title" },
                { label: "Room No", stateKey: "roomNo" },
                { label: "Block No", stateKey: "blockNo" },
              ].map((field, index) => (
                <TextField
                  key={index}
                  className="w-full md:w-1/2 px-2 mb-4"
                  label={field.label}
                  required
                  onChange={(e) =>
                    setComplaint({
                      ...complaint,
                      [field.stateKey]: e.target.value,
                    })
                  }
                />
              ))}
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleComplaintSubmit("kerosakan fasiliti")}
            >
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
              {[
                { label: "Email", stateKey: "email" },
                { label: "Name", stateKey: "name" },
                { label: "Title", stateKey: "title" },
                { label: "Room No", stateKey: "roomNo" },
                { label: "Block No", stateKey: "blockNo" },
              ].map((field, index) => (
                <TextField
                  key={index}
                  className="w-full md:w-1/2 px-2 mb-4"
                  label={field.label}
                  required
                  onChange={(e) =>
                    setComplaint({
                      ...complaint,
                      [field.stateKey]: e.target.value,
                    })
                  }
                />
              ))}
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleComplaintSubmit("disiplin pelajar")}
            >
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
