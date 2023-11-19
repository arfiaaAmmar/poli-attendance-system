import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import Tabs from "../../components/Tabs";
import { FORM_TYPE, initialFeedback } from "shared-library/src/declarations/constants";
import { useAllRegistrationForms } from "../../hooks/hooks";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { FormType } from "shared-library/src/declarations/types";

const ManageRegisterForm = ({type}:{type: FormType}) => {
  const [feedback, setFeedback] = useState(initialFeedback);
  const labels = ["Masuk", "Keluar"];
  const [selectedTab, setSelectedTab] = useState(0);
  const registrationForms = useAllRegistrationForms();

  const handleTabChange = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  // TODO: Implement this function to get the student registration status
  const _getStudentRegistrationStatus = () => {};

  return (
    <div className="p-8 h-screen bg-yellow-50">
      <Typography
        variant="h5"
        className="mb-4 bg-blue-800 text-white rounded-2xl p-2 text-4xl"
      >
        Pengurusan Pendaftaran
      </Typography>
      {registrationForms.isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Tabs labels={labels} defaultTab={0} onTabChange={handleTabChange} />
          <Table>
            <TableHead>
              <TableRow className="font-semibold">
                <TableCell className="font-semibold text-lg">No</TableCell>
                <TableCell className="font-semibold text-lg">Nama</TableCell>
                <TableCell className="font-semibold text-lg">Matrik</TableCell>
                <TableCell className="font-semibold text-lg">NRIC</TableCell>
                <TableCell className="font-semibold text-lg">
                  Semester
                </TableCell>
                <TableCell className="font-semibold text-lg">
                  No Resit
                </TableCell>
                <TableCell className="font-semibold text-lg">
                  No Bilik
                </TableCell>
                <TableCell className="font-semibold text-lg">Jenis</TableCell>
                <TableCell className="font-semibold text-lg">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registrationForms?.data
                ?.filter(
                  (form) => selectedTab === 0 || form.formType === FORM_TYPE.masuk
                )
                .map((form, index) => (
                  <TableRow key={form?._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{form?.tenantInfo?.name}</TableCell>
                    <TableCell>{form?.tenantInfo?.matrikNo}</TableCell>
                    <TableCell>{form?.tenantInfo?.nric}</TableCell>
                    <TableCell>{form?.tenantInfo?.semester}</TableCell>
                    <TableCell>{form?.resitNo}</TableCell>
                    <TableCell>
                      {form?.blockNo} {form?.roomNo}
                    </TableCell>
                    <TableCell>{form?.formType}</TableCell>
                    <TableCell>{form?.timestamp}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default ManageRegisterForm;
