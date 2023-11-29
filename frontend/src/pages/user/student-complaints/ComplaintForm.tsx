import {
  Typography,
  Paper,
  TextField,
  TextareaAutosize,
  Button,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import {
  STUDENT_PAGES_TITLE,
  COMPLAINT_TYPE,
  FM,
  initialComplaint,
  initialFeedback,
} from "shared-library/src/declarations/constants";
import { ComplaintType } from "shared-library/src/declarations/types";
import { postComplaint } from "../../../api/complaint-api";
import { getUserSessionData } from "../../../api/user-api";
import { sendNotification } from "../../../helpers/shared-helpers";
import { useAllComplaints } from "../../../hooks/hooks";

const ComplaintForm = ({ type }: { type: ComplaintType }) => {
  const pageTitle =
    type === COMPLAINT_TYPE.kerosakanFasiliti
      ? STUDENT_PAGES_TITLE.kerosakanFasiliti
      : STUDENT_PAGES_TITLE.disiplinPelajar;
  const [complaint, setComplaint] = useState(initialComplaint);
  const [feedback, setFeedback] = useState(initialFeedback);
  const userData = getUserSessionData();
  const allComplaints = useAllComplaints();
  const user = getUserSessionData();

  useEffect(() => {
    setComplaint(initialComplaint);
  }, [type]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setComplaint({ ...complaint, evidenceFile: file });
    }
  };

  const handleComplaintSubmit = async () => {
    // if (isEmptyObject(complaint)) {
    //   setFeedback({ ...feedback, error: FM.pleaseFillNecessaryInformation });
    //   return;
    // }
    try {
      const email = userData?.email ?? "";
      await postComplaint({ ...complaint, email }, type);
      await sendNotification({
        title: `Aduan ${type}`,
        remarks: `${user.name} has submitted a complaint form.`,
      });
      setComplaint(initialComplaint);
      setFeedback({ ...feedback, success: FM.complaintAdded });
      setTimeout(() => {
        setFeedback(initialFeedback);
      }, 3000);

      allComplaints.refetch();
    } catch (error: any) {
      setFeedback({ ...feedback, error });
    }
  };
  return (
    <div className="p-8 h-full">
      <Typography
        variant="h5"
        className="text-3xl text-white rounded-3xl font-semibold mb-4 bg-blue-800 p-2"
      >
        {pageTitle}
      </Typography>
      <Paper className="p-4">
        <div className="flex flex-wrap -mx-2 mb-4">
          {[
            { label: "Email", stateKey: "email", value: complaint.email },
            { label: "Name", stateKey: "name", value: complaint.name },
            { label: "Title", stateKey: "title", value: complaint.title },
            { label: "Room No", stateKey: "roomNo", value: complaint.roomNo },
            {
              label: "Block No",
              stateKey: "blockNo",
              value: complaint.blockNo,
            },
          ].map((field, index) => (
            <TextField
              key={index}
              className="w-full md:w-1/2 px-2 mb-4"
              label={field.label}
              required
              value={field.value}
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
            value={complaint?.elaboration}
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
          onClick={handleComplaintSubmit}
        >
          Submit
        </Button>
      </Paper>
    </div>
  );
};

export default ComplaintForm;
