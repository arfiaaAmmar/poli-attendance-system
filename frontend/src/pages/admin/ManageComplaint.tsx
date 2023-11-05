import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import { updateComplaint } from "../../api/complaint-api";
import { downloadPDF } from "../../utils/pdfGenerate";
import { handleDelete } from "../../api/_shared-api";
import { isEmptyObject } from "../../helpers/shared-helpers";
import {
  initialFeedback,
  initialComplaint,
  FM,
} from "shared-library/declarations/constants";
import { Feedback, Complaint } from "shared-library/declarations/types";
import { useAllComplaints } from "../../hooks/hooks";

const ManageComplaint = () => {
  const [feedback, setFeedback] = useState<Feedback>(initialFeedback);
  const [complaint, setComplaint] = useState<Complaint>(initialComplaint);
  const complaints = useAllComplaints();

  const handleSubmitResponse = async (id: string | undefined) => {
    if (isEmptyObject(complaint)) {
      setFeedback({ ...feedback, error: "Please fill the response" });
      return;
    }
    try {
      await updateComplaint(id, { adminResponse: complaint?.adminResponse! });
      setComplaint(initialComplaint);
      setFeedback({ ...feedback, success: FM.complaintAdded });

      setTimeout(() => {
        setFeedback({ ...feedback, success: "" });
      }, 3000);
      complaints.refetch();
    } catch (error: any) {
      setFeedback(error);
    }
  };

  return (
    <div className="p-8 h-screen">
      <Typography variant="h4" className="mb-4">
        Complaint Report
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="text-center">No.</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            {/* <TableCell>Download</TableCell> */}
            <TableCell>Elaboration</TableCell>
            <TableCell>Response</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {complaint &&
            complaints?.data?.map((complaint: Complaint, index: number) => (
              <TableRow key={complaint._id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>{complaint.title}</TableCell>
                <TableCell>
                  {new Date(complaint?.timestamp).toLocaleDateString("en-GB")}
                </TableCell>
                {/* <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => downloadPDF(complaint, "complaint")}
                  >
                    Download
                  </Button>
                </TableCell> */}
                <TableCell>{complaint.elaboration}</TableCell>
                <TableCell>
                  {complaint.adminResponse !== undefined &&
                  complaint.adminResponse !== "" ? (
                    <Typography
                      color="error"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setComplaint({ ...complaint });
                      }}
                    >
                      {complaint.adminResponse}
                    </Typography>
                  ) : (
                    <Typography
                      color="primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => setComplaint(complaint)}
                    >
                      Add Response
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                  onClick={async () => {
                    await handleDelete(complaint._id, "complaint");
                    complaints.refetch();
                  }}
                  color="error"
                >
                  Delete
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {complaint && (
        <>
          <Typography variant="h6" className="mt-8 mb-4">
            Response
          </Typography>
          <Typography>Complaint Title: {complaint?.title}</Typography>
          <TextareaAutosize
            value={complaint?.adminResponse}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComplaint({ ...complaint, adminResponse: e.target.value })
            }
            name="response"
            id="response"
            cols={30}
            className="border-2 border-neutral-500 w-full"
          />
          {feedback.error ? (
            <Typography variant="body1" color="error" fontWeight="bold">
              {feedback.error}
            </Typography>
          ) : feedback.success ? (
            <Typography variant="body1" color="success" fontWeight="bold">
              {feedback.success}
            </Typography>
          ) : null}
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSubmitResponse(complaint._id)}
            className="mt-4"
          >
            Submit
          </Button>
        </>
      )}
    </div>
  );
};

export default ManageComplaint;
