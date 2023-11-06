import { useState } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { isEmptyObject } from "../../../helpers/shared-helpers";
import {
  EmergencyContact,
  Feedback,
  FormType,
  RegisterForm,
  TenantInfo,
} from "shared-library/src/declarations/types";
import {
  initialTenantInfo,
  initialEmergencyContact,
  initialFeedback,
  FM,
  initialRegisterForm,
  FORM_TYPE,
} from "shared-library/src/declarations/constants";
import TenantInfoInput from "./TenantInfoInput";
import EmergencyContactInput from "./EmergencyContactInput";
import { postRegisterForm } from "frontend/src/api/registration-api";

const StudentRegisterForm = () => {
  const [feedback, setFeedback] = useState<Feedback>(initialFeedback);
  const [tenantInfo, setTenantInfo] = useState<TenantInfo>(initialTenantInfo);
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact>(
    initialEmergencyContact
  );
  const [fileUploaded, setFileUploaded] = useState(false);
  const [form, setForm] = useState<RegisterForm>({
    tenantInfo: tenantInfo,
    formType: FORM_TYPE.masuk,
    roomNo: "1",
    blockNo: "1",
    resitNo: "123ABC",
    offerLetterFile: null,
    paymentReceiptFile: null,
    emergencyContact: emergencyContact,
    tenantAgreement: false,
    timestamp: Date.now(),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const offerLetterFile = e?.target?.files?.[0];
    const paymentReceiptFile = e?.target?.files?.[1];
    if (offerLetterFile) {
      setForm({ ...form, offerLetterFile: offerLetterFile });
    }
    if (paymentReceiptFile) {
      setForm({ ...form, paymentReceiptFile: paymentReceiptFile });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (isEmptyObject(form)) {
      setFeedback({
        ...feedback,
        error: FM.pleaseFillNecessaryInformation,
      });
      return;
    }
    try {
      await postRegisterForm(tenantInfo, emergencyContact, form);
      setFeedback({
        ...feedback,
        success: FM.registerFormAdded,
      });

      setTimeout(() => {
        setFeedback({ ...feedback, success: "" });
      }, 3000);
      setForm(initialRegisterForm);
    } catch (error: any) {
      setFeedback({ ...feedback, error: error });
    }
  };

  return (
    <Paper className="p-4 border rounded-md border-gray-300">
      <Typography variant="h5" className="text-xl mb-4">
        Student Registration Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TenantInfoInput
          tenantInfo={tenantInfo}
          setTenantInfo={setTenantInfo}
        />
        <div className="mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Race
          </label>
          <select
            name="tenantInfo.race"
            value={form.formType}
            onChange={(e) =>
              setForm({ ...form, formType: e.target.value as FormType })
            }
            className="mt-1 p-2 border rounded w-full"
          >
            <option value={FORM_TYPE.masuk}>Daftar Masuk</option>
            <option value={FORM_TYPE.keluar}>Daftar Keluar</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Room No
          </label>
          <input
            type="text"
            name="roomNo"
            value={form?.roomNo || ""!}
            onChange={(e) => setForm({ ...form, roomNo: e.target.value })}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Block No
          </label>
          <input
            type="text"
            name="blockNo"
            value={form?.blockNo || ""!}
            onChange={(e) => setForm({ ...form, blockNo: e.target.value })}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Resit No
          </label>
          <input
            type="text"
            name="resitNo"
            value={form?.resitNo || ""!}
            onChange={(e) => setForm({ ...form, resitNo: e.target.value })}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <input
          type="file"
          accept="image/jpeg, application/pdf"
          required
          className="w-full mb-4"
          onChange={handleFileChange}
          multiple
        />
        <input
          type="file"
          accept="image/jpeg, application/pdf"
          required
          className="w-full mb-4"
          onChange={handleFileChange}
          multiple
        />
        {!fileUploaded && (
          <p className="text-red-500">Please select at least one file.</p>
        )}

        <EmergencyContactInput
          data={emergencyContact}
          setData={setEmergencyContact}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            I agree to the terms and conditions
          </label>
          <input
            type="checkbox"
            name="tenantAgreement"
            checked={form?.tenantAgreement!}
            onChange={(e) =>
              setForm({ ...form, tenantAgreement: e.target.checked })
            }
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className="bg-blue-500 text-white p-2 rounded cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default StudentRegisterForm;
