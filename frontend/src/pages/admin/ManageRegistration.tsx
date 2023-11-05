import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { sampleRegistrationForms } from "../../dummy/test-data";
import {
  makeFirstLetterOfWordUpperCase,
  timeStampFormatter,
} from "../../helpers/shared-helpers";
import Tabs from "../../components/Tabs";
import { initialFeedback } from "shared-library/declarations/constants";
import { useAllRegistrationForms } from "../../hooks/hooks";

const ManageRegisterForm = () => {
  const [feedback, setFeedback] = useState(initialFeedback);
  const labels = ["Masuk", "Keluar"];
  const [selectedTab, setSelectedTab] = useState(0);
  const registrationForms = useAllRegistrationForms();

  const handleTabChange = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  // TODO: Implement this function to get the student registration status.1
  const _getStudentRegistrationStatus = () => {};

  return (
    <div className="p-8 h-full">
      <Typography variant="h5" className="mb-4">
        User List
      </Typography>
      {/* {forms.isLoading ? (
        <LoadingIndicator />
      ) : ( */}
      <Tabs labels={labels} defaultTab={0} onTabChange={handleTabChange} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nama</TableCell>
            <TableCell>No Matrik</TableCell>
            <TableCell>NRIC</TableCell>
            <TableCell>Semester</TableCell>
            <TableCell>No Resit</TableCell>
            <TableCell>No Bilik</TableCell>
            <TableCell>Jenis</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {registrationForms?.data
            ?.filter((form) => selectedTab === 0 || form.formType === "masuk")
            .map((form) => (
              <TableRow key={form?._id}>
                <TableCell>{form?.tenantInfo?.name}</TableCell>
                <TableCell>{form?.tenantInfo?.matrikNo}</TableCell>
                <TableCell>{form?.tenantInfo?.nric}</TableCell>
                <TableCell>{form?.tenantInfo?.semester}</TableCell>
                <TableCell>{form?.resitNo}</TableCell>
                <TableCell>
                  {form?.blockNo} {form?.roomNo}
                </TableCell>
                <TableCell>{form?.formType}</TableCell>
                <TableCell>
                  {form?.timestamp}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {/* )} */}
    </div>
  );
};

export default ManageRegisterForm;
