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
} from "shared-library/src/declarations/types";
import { useSessionStorage } from "usehooks-ts";
import { handleDelete } from "../../../api/_shared-api";
import { updateComplaint } from "../../../api/complaint-api";
import {
  firstLetterUppercase,
  isEmpty,
  sendNotification,
  timeStampFormatter,
  truncateText,
} from "../../../helpers/shared-helpers";
import { useAllComplaints } from "../../../hooks/hooks";

const ManageComplaint = ({ type }: { type: ComplaintType }) => {
  const [modal, setModal] = useState("default");
  const [feedback, setFeedback] = useState(initialFeedback);
  const [selected, setSelected] = useSessionStorage(
    "selectedManagedComplaint",
    initialComplaint
  );
  const fetchedComplaints = useAllComplaints();
  const filteredComplaints = fetchedComplaints.data?.filter(
    (complaint) => complaint.complaintType === type
  );


  const handleSubmitResponse = async (
    complaintId: string,
    complaintAuthorId: string
  ) => {
    try {
      if (isEmpty(selected.adminResponse)) {
        setFeedback({ ...feedback, error: FM.pleaseFillTheResponse });
        return;
      }
      await updateComplaint(complaintId, {
        adminResponse: selected?.adminResponse!,
      });
      await sendNotification({
        title: selected?.title,
        remarks: "Response has been submitted by admin",
        receiverId: complaintAuthorId,
      });

      setTimeout(() => {
        setFeedback({ ...feedback, success: "" });
      }, 3000);
      setSelected(initialComplaint);
      setModal("default");
      setFeedback({ ...feedback, success: FM.complaintAdded });
      fetchedComplaints.refetch();
    } catch (error: any) {
      setFeedback(error);
      console.error(error);
    }
  };

  if (modal === "default") {
    return (
      <div className="p-8 h-screen bg-yellow-50">
        <Typography
          variant="h4"
          className="mb-4 bg-blue-800 text-white rounded-2xl p-2"
        >
          Complaint Report {'>'} {firstLetterUppercase(type)}
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
            {filteredComplaints?.map(
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
                        setSelected(complaint);
                        setModal("viewComplaint");
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

  if (modal === "viewComplaint") {
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
          <li>Nama : {selected.name}</li>
          <li>No Bilik : {selected.roomNo}</li>
          <li>No Telefon : {selected.phone}</li>
          <li>No Bilik : {selected.blockNo}</li>
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
            minHeight: "200px",
            maxHeight: "200px",
          }}
        >
          {selected.elaboration}
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
              checked={selected.adminActionTaken}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  adminActionTaken: selected.adminActionTaken,
                })
              }
            />
            <label htmlFor="adminActionTaken">Tindakan telah diambil</label>
          </div>
          <div>
            <Checkbox
              id="adminCheck"
              checked={selected.adminCheck}
              onChange={(e) => {
                setSelected({
                  ...selected,
                  adminCheck: selected.adminCheck ?? e.target.checked,
                });
              }}
            />
            <label htmlFor="adminCheck">Admin Check</label>
          </div>
          <div className="flex items-center gap-2">
            <MessageIcon
              fontSize="large"
              className="mt-4 hover:cursor"
              onClick={() => setModal("adminResponse")}
            ></MessageIcon>
            <p>Maklum Balas</p>
          </div>
          <Button
            variant="contained"
            color="secondary"
            className="mt-4"
            onClick={() => setModal("default")}
          >
            Keluar
          </Button>
          <Button
            className="mt-4 bg-red-500 text-white absolute bottom-2 right-2"
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={async () => {
              await handleDelete(selected._id, "complaint");
              setModal("default");
              fetchedComplaints.refetch();
            }}
          >
            Delete Complaint
          </Button>
        </div>
      </div>
    );
  }

  if (modal === "adminResponse") {
    return (
      <div className="p-8 h-screen bg-yellow-50">
        <Typography className="bg-blue-800 text-white rounded-2xl p-2">
          <Link to={ADMIN_PAGES_PATH.pengurusanAduan}>Complaint Report</Link>{" "}
          {">"} Maklum Balas Aduan Pelajar
        </Typography>
        <p>Menghantar Maklum Balas Kepada Pelajar dibawah :</p>
        <ul className="text-lg font-semibold">
          <li>Nama: {selected.name}</li>
          <li>No Bilik: {selected.roomNo}</li>
          <li>No Telefon: {selected.phone}</li>
          <li>No Bilik: {selected.blockNo}</li>
        </ul>
        <TextareaAutosize
          value={selected?.adminResponse}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setSelected({
              ...selected,
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
            handleSubmitResponse(selected._id, selected.authorId);
          }}
          className="mt-4"
        >
          Hantar
        </Button>
        <div className="flex items-center gap-2">
          <MessageIcon
            fontSize="large"
            className="mt-4 hover:cursor"
            onClick={() => setModal("adminResponse")}
          ></MessageIcon>
          <p>Maklum Balas</p>
        </div>
        <Button
          variant="contained"
          color="secondary"
          className="mt-4"
          onClick={() => setModal("default")}
        >
          Keluar
        </Button>
      </div>
    );
  }
};

export default ManageComplaint;
