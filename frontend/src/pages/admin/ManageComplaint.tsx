import MessageIcon from "@mui/icons-material/Message";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ADMIN_PAGES_PATH,
  FM,
  initialComplaint,
  initialFeedback,
} from "shared-library/src/declarations/constants";
import {
  Complaint,
  ComplaintType,
  Feedback,
} from "shared-library/src/declarations/types";
import { handleDelete } from "../../api/_shared-api";
import { updateComplaint } from "../../api/complaint-api";
import {
  isEmpty,
  sendNotification,
  timeStampFormatter,
  truncateText,
} from "../../helpers/shared-helpers";
import { useAllComplaints } from "../../hooks/hooks";
import { postNotification } from "../../api/notification-api";

type ComplaintCurrentPage = "default" | "viewComplaint" | "adminResponse";

const ManageComplaint = () => {
  const [currentPage, setCurrentPage] =
    useState<ComplaintCurrentPage>("default");
  const [feedback, setFeedback] = useState<Feedback>(initialFeedback);
  const [selectedComplaint, setSelectedComplaint] = useState(initialComplaint);
  const fetchedComplaints = useAllComplaints();

  const handleSubmitResponse = async (
    complaintId: string,
    complaintAuthorId: string
  ) => {
    try {
      if (isEmpty(selectedComplaint.adminResponse)) {
        setFeedback({ ...feedback, error: FM.pleaseFillTheResponse });
        return;
      }
      await updateComplaint(complaintId, {
        adminResponse: selectedComplaint?.adminResponse!,
      });
      await sendNotification({
        title: selectedComplaint?.title,
        remarks: "Response has been submitted by admin",
        receiverId: complaintAuthorId,
      });

      setTimeout(() => {
        setFeedback({ ...feedback, success: "" });
      }, 3000);
      setSelectedComplaint(initialComplaint);
      setCurrentPage("default");
      setFeedback({ ...feedback, success: FM.complaintAdded });
      fetchedComplaints.refetch();
    } catch (error: any) {
      setFeedback(error);
      console.error(error);
    }
  };

  if (currentPage === "default") {
    return (
      <div className="p-8 h-screen bg-yellow-50">
        <Typography
          variant="h4"
          className="mb-4 bg-blue-800 text-white rounded-2xl p-2"
        >
          Complaint Report
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold">No.</TableCell>
              <TableCell className="font-semibold">Nama</TableCell>
              <TableCell className="font-semibold">Tajuk</TableCell>
              <TableCell className="font-semibold">Tarikh</TableCell>
              <TableCell className="font-semibold">Penjelasan</TableCell>
              <TableCell className="font-semibold">Respon Penyelia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedComplaints?.data?.map(
              (complaint: Complaint, index: number) => (
                <TableRow key={complaint._id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>{complaint.name}</TableCell>
                  <TableCell>{complaint.title}</TableCell>
                  <TableCell>
                    {timeStampFormatter(complaint?.timestamp).date}
                  </TableCell>
                  <TableCell>
                    {truncateText(complaint.elaboration, 30)}
                  </TableCell>
                  <TableCell className="flex justify-between">
                    {complaint && complaint?.adminResponse !== "" ? (
                      <Typography color="GrayText">
                        {complaint.adminResponse}
                      </Typography>
                    ) : (
                      <Typography color="primary">Add Response</Typography>
                    )}
                    <VisibilityIcon
                      style={{ cursor: "pointer" }}
                      className="text-sm"
                      onClick={() => {
                        setSelectedComplaint(complaint);
                        setCurrentPage("viewComplaint");
                      }}
                    />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (currentPage === "viewComplaint") {
    return (
      <div className="p-8 h-screen bg-yellow-50">
        <Typography
          variant="h4"
          className="mb-4 bg-blue-800 text-white text-2xl p-4 rounded-3xl"
        >
          <Link to={ADMIN_PAGES_PATH.pengurusanAduan}>Complaint Report</Link>{" "}
          {">"} Maklum Balas Aduan Pelajar
        </Typography>
        <Typography className="font-bold text-xl">
          Menghantar Maklum Balas Kepada Pelajar dibawah :
        </Typography>
        <ul className="text-lg font-semibold">
          <li>Nama : {selectedComplaint.name}</li>
          <li>No Bilik : {selectedComplaint.roomNo}</li>
          <li>No Telefon : {selectedComplaint.phone}</li>
          <li>No Bilik : {selectedComplaint.blockNo}</li>
        </ul>
        <Typography className="font-semibold text-lg mt-4">
          Penjelasan Pelajar
        </Typography>
        <Typography
          id="response"
          style={{
            border: "2px solid #ccc",
            width: "100%",
            padding: "8px",
            minHeight: "200px", // Set the fixed height here
            maxHeight: "200px", // Same value for fixed height
          }}
        >
          {selectedComplaint.elaboration}
        </Typography>
        {feedback.error ? (
          <Typography variant="body1" color="error" fontWeight="bold">
            {feedback.error}
          </Typography>
        ) : feedback.success ? (
          <Typography variant="body1" color="success" fontWeight="bold">
            {feedback.success}
          </Typography>
        ) : null}
        <div className="w-full flex justify-between">
          <div>
            <Checkbox
              id="adminActionTaken"
              checked={selectedComplaint.adminActionTaken}
              onChange={(e) =>
                setSelectedComplaint({
                  ...selectedComplaint,
                  adminActionTaken: selectedComplaint.adminActionTaken })
              }
            />
            <label htmlFor="adminActionTaken">Tindakan telah diambil</label>
          </div>
          <div>
            <Checkbox
              id="adminCheck"
              checked={selectedComplaint.adminCheck}
              onChange={(e) => {
                setSelectedComplaint({
                  ...selectedComplaint,
                  adminCheck: selectedComplaint.adminCheck ?? e.target.checked,
                });
              }}
            />
            <label htmlFor="adminCheck">Admin Check</label>
          </div>
          <div className="flex items-center gap-2">
            <MessageIcon
              fontSize="large"
              className="mt-4 hover:cursor"
              onClick={() => setCurrentPage("adminResponse")}
            ></MessageIcon>
            <p>Maklum Balas</p>
          </div>
          <Button
            variant="contained"
            color="secondary"
            className="mt-4"
            onClick={() => setCurrentPage("default")}
          >
            Keluar
          </Button>
          <Button
            className="mt-4 bg-red-500 text-white absolute bottom-2 right-2"
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={async () => {
              await handleDelete(selectedComplaint._id, "complaint");
              setCurrentPage("default");
              fetchedComplaints.refetch();
            }}
          >
            Delete Complaint
          </Button>
        </div>
      </div>
    );
  }

  if (currentPage === "adminResponse") {
    return (
      <div className="p-8 h-screen bg-yellow-50">
        <Typography className="bg-blue-800 text-white rounded-2xl p-2">
          <Link to={ADMIN_PAGES_PATH.pengurusanAduan}>Complaint Report</Link>{" "}
          {">"} Maklum Balas Aduan Pelajar
        </Typography>
        <p>Menghantar Maklum Balas Kepada Pelajar dibawah :</p>
        <ul className="text-lg font-semibold">
          <li>Nama: {selectedComplaint.name}</li>
          <li>No Bilik: {selectedComplaint.roomNo}</li>
          <li>No Telefon: {selectedComplaint.phone}</li>
          <li>No Bilik: {selectedComplaint.blockNo}</li>
        </ul>
        <TextareaAutosize
          value={selectedComplaint?.adminResponse}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setSelectedComplaint({
              ...selectedComplaint,
              adminResponse: e.target.value,
            })
          }
          name="response"
          id="response"
          cols={30}
          style={{ border: "2px solid #ccc", width: "100%", padding: "8px" }}
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
          onClick={() => {
            handleSubmitResponse(selectedComplaint._id, selectedComplaint.authorId);
          }}
          className="mt-4"
        >
          Hantar
        </Button>
        <div className="flex items-center gap-2">
          <MessageIcon
            fontSize="large"
            className="mt-4 hover:cursor"
            onClick={() => setCurrentPage("adminResponse")}
          ></MessageIcon>
          <p>Maklum Balas</p>
        </div>
        <Button
          variant="contained"
          color="secondary"
          className="mt-4"
          onClick={() => setCurrentPage("default")}
        >
          Keluar
        </Button>
      </div>
    );
  }
};

export default ManageComplaint;
