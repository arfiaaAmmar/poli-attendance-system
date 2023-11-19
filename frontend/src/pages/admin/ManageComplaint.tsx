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
  Checkbox,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MessageIcon from "@mui/icons-material/Message";
import { updateComplaint } from "../../api/complaint-api";
import { handleDelete } from "../../api/_shared-api";
import { isEmpty, truncateText } from "../../helpers/shared-helpers";
import {
  initialFeedback,
  initialComplaint,
  FM,
} from "shared-library/src/declarations/constants";
import { useAllComplaints } from "../../hooks/hooks";
import {
  Complaint,
  ComplaintType,
  Feedback,
} from "shared-library/src/declarations/types";
import { ADMIN_PAGES_PATH } from "shared-library/src/declarations/constants.js";
import { Link } from "react-router-dom";

type ComplaintCurrentPage = "default" | "viewComplaint" | "adminResponse";

const ManageComplaint = ({ type }: { type: ComplaintType }) => {
  const [currentPage, setCurrentPage] =
    useState<ComplaintCurrentPage>("default");
  const [feedback, setFeedback] = useState<Feedback>(initialFeedback);
  const [complaint, setComplaint] = useState<Complaint>(initialComplaint);
  const fetchedComplaints = useAllComplaints();

  const handleSubmitResponse = async (id: string | undefined) => {
    if (isEmpty(complaint.adminResponse)) {
      setFeedback({ ...feedback, error: FM.pleaseFillTheResponse });
      return;
    }
    try {
      await updateComplaint(id, { adminResponse: complaint?.adminResponse! });
      setComplaint(initialComplaint);
      setFeedback({ ...feedback, success: FM.complaintAdded });

      setTimeout(() => {
        setFeedback({ ...feedback, success: "" });
      }, 3000);
      fetchedComplaints.refetch();
    } catch (error: any) {
      setFeedback(error);
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
              {/* <TableCell>Download</TableCell> */}
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
                        setComplaint(complaint);
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
          <li>Nama : {complaint.name}</li>
          <li>No Bilik : {complaint.roomNo}</li>
          <li>No Telefon : {complaint.phone}</li>
          <li>No Bilik : {complaint.blockNo}</li>
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
          {complaint.elaboration}
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
              checked={complaint.adminActionTaken}
              onChange={(e) =>
                setComplaint({
                  ...complaint,
                  adminActionTaken: e.target.checked,
                })
              }
            />
            <label htmlFor="adminActionTaken">Admin Action Taken</label>
          </div>
          <div>
            <Checkbox
              id="adminCheck"
              checked={complaint.adminCheck}
              onChange={(e) =>
                setComplaint({
                  ...complaint,
                  adminCheck: e.target.checked,
                })
              }
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
              await handleDelete(complaint._id, "complaint");
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
          <li>Nama: {complaint.name}</li>
          <li>No Bilik: {complaint.roomNo}</li>
          <li>No Telefon: {complaint.phone}</li>
          <li>No Bilik: {complaint.blockNo}</li>
        </ul>
        <TextareaAutosize
          value={complaint?.adminResponse}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setComplaint({
              ...complaint,
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
          onClick={() => handleSubmitResponse(complaint._id)}
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
