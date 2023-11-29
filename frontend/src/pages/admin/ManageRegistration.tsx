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
import {
  FORM_TYPE,
  initialFeedback,
} from "shared-library/src/declarations/constants";
import { useAllCheckInForms, useAllCheckOutForms } from "../../hooks/hooks";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { FormType } from "shared-library/src/declarations/types";

const ManageRegisterForm = ({ type }: { type: FormType }) => {
  const fetchedCheckInForms = useAllCheckInForms();
  const fetchedCheckOutForms = useAllCheckOutForms();

  // TODO: Implement this function to get the student registration status
  const _getStudentRegistrationStatus = () => {};

  const renderManageRegisterForm = () => {
    if (type === FORM_TYPE.masuk) {
      return (
        <>
          <Typography
            variant="h5"
            className="mb-4 bg-blue-800 text-white rounded-2xl p-2 text-4xl"
          >
            Pengurusan Pendaftaran
          </Typography>
          {fetchedCheckInForms?.isLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow className="font-semibold">
                    <TableCell className="font-semibold text-lg">No</TableCell>
                    <TableCell className="font-semibold text-lg">
                      Nama
                    </TableCell>
                    <TableCell className="font-semibold text-lg">
                      Matrik
                    </TableCell>
                    <TableCell className="font-semibold text-lg">
                      Sem
                    </TableCell>
                    <TableCell className="font-semibold text-lg">
                      Resit
                    </TableCell>
                    <TableCell className="font-semibold text-lg">
                      Bilik
                    </TableCell>
                    <TableCell className="font-semibold text-lg">
                      Jenis
                    </TableCell>
                    <TableCell className="font-semibold text-lg">
                      Tarikh
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fetchedCheckInForms?.data?.map((form, index) => (
                    <TableRow key={form?._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{form?.tenantInfo?.name}</TableCell>
                      <TableCell>{form?.tenantInfo?.matrikNo}</TableCell>
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
        </>
      );
    }
    if (type === FORM_TYPE.keluar) {
      return (
        <>
          <Typography
            variant="h5"
            className="mb-4 bg-blue-800 text-white rounded-2xl p-2 text-4xl"
          >
            Pengurusan Pendaftaran
          </Typography>
          {fetchedCheckOutForms?.isLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow className="font-semibold">
                    <TableCell className="font-semibold text-lg">No</TableCell>
                    <TableCell className="font-semibold text-lg">
                      Nama
                    </TableCell>
                    <TableCell className="font-semibold text-lg">
                      Tarikh
                    </TableCell>
                    <TableCell className="font-semibold text-lg">
                      Bilik
                    </TableCell>
                    <TableCell className="font-semibold text-lg">
                      Alasan Keluar
                    </TableCell>
                    <TableCell className="font-semibold text-lg">
                      Jenis
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fetchedCheckOutForms?.data?.map((form, index) => (
                    <TableRow key={form?._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{form?.name}</TableCell>
                      <TableCell>{form?.timestamp}</TableCell>
                      <TableCell>
                        {form?.blockNo} {form?.roomNo}
                      </TableCell>
                      <TableCell>{form?.checkoutReason}</TableCell>
                      <TableCell>{form?.formType}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </>
      );
    }
  };

  return (
    <div className="p-8 h-screen bg-yellow-50">
      {renderManageRegisterForm()}
    </div>
  );
};

export default ManageRegisterForm;
