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
import { initialComplaint, initialFeedback, FM } from "shared-library/src/declarations/constants.js";
import { Complaint, ComplaintType } from "shared-library/src/declarations/types.js";

const StudentComplaints = () => {
  const [complaint, setComplaint] = useState<Complaint>(initialComplaint);
  const [feedback, setFeedback] = useState(initialFeedback);
  const userData = getUserSessionData();
  const allComplaints = useAllComplaints();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setComplaint({ ...complaint, evidenceFile: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      });
      setFeedback({
        ...feedback,
        success: FM.complaintAdded,
      });

      setTimeout(() => {
        setFeedback({ ...feedback, success: "" });
      }, 3000);

      allComplaints.refetch()
      setComplaint(initialComplaint);
    } catch (error: any) {
      setFeedback({ ...feedback, error: error });
    }
  };

  return (
    <div className="p-8 h-full">
      <div className="overflow-y-auto h-[40vh]">
        <h1>Senarai Sejarah Aduan</h1>
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
                <TableCell
                  onClick={() => downloadPDF(item, "complaint")}
                  className="bg-neutral-900 hover:cursor-pointer text-white text-sm border-2 border-gray-400 shadow-sm px-4 rounded-lg"
                >
                  Download
                </TableCell>
                {item.adminResponse && (
                  <TableCell>{item.adminResponse}</TableCell>
                )}
                <TableCell>{item.adminActionTaken}</TableCell>
                <TableCell>{item.adminCheck}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Typography variant="h6" className="pt-8 pb-4">
        File New Complaint
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
          <div className="w-full md:w-1/2 px-2 mb-4">
            <Select
              label="Complaint Type"
              required
              value={complaint.complaintType}
              onChange={(e) =>
                setComplaint({
                  ...complaint,
                  complaintType: e.target.value as ComplaintType,
                })
              }
              className="w-full"
            >
              <MenuItem value="kerosakan fasiliti">Kerosakan Fasiliti</MenuItem>
              <MenuItem value="disiplin pelajar">Disiplin Pelajar</MenuItem>
            </Select>
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
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Paper>
    </div>
  );
};

export default StudentComplaints;
