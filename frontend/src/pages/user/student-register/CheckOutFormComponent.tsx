import { Button, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  CHECKOUT_REASONS,
  FM,
  initialCheckoutForm,
  initialFeedback,
} from "shared-library/src/declarations/constants";
import FeedbackMessage from "../../../components/ResponseMessage";
import { isEmptyObject } from "../../../helpers/shared-helpers";
import { postCheckOutForm } from "../../../api/registration-api";
import { getUserSessionData } from "../../../api/user-api";

const formComponent = () => {
  const user = getUserSessionData();
  const [form, setForm] = useState({
    ...initialCheckoutForm,
    authorId: user._id,
  });
  const [feedback, setFeedback] = useState(initialFeedback);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkoutEvidenceFile = e?.target?.files?.[0];
    if (checkoutEvidenceFile) {
      setForm({ ...form, checkoutEvidenceFile });
    }
  };

  const handleCheckoutReasons = (checkoutReason: string) => {
    setForm({ ...form, checkoutReason });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isEmptyObject(form)) {
      setFeedback({ ...feedback, error: FM.pleaseFillNecessaryInformation });
      return;
    }
    try {
      await postCheckOutForm(form);
      setFeedback({ ...feedback, success: FM.registerFormAdded });

      setTimeout(() => {
        setFeedback(initialFeedback);
      }, 3000);
      setForm(initialCheckoutForm);
    } catch (error: any) {
      setFeedback({ ...feedback, error: error });
    }
  };

  const {
    roomChange,
    blockChange,
    graduated,
    internship,
    others,
    semesterBreak,
  } = CHECKOUT_REASONS;

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="w-5/6 mx-auto mt-12 h-screen"
      >
        <Typography className="text-lg font-bold text-orange-500 my-2">
          BUTIRAN PERMOHONAN
        </Typography>
        <p className="font-semibold my-4">
          SILA TANDAKAN (/) PADA YANG BERKENAAN
        </p>
        <ol type="1" className="flex gap-8">
          <div>
            <li>
              {roomChange.toUpperCase()} :
              <input
                className="ml-2"
                type="checkbox"
                checked={form.checkoutReason === roomChange}
                onChange={() => handleCheckoutReasons(roomChange)}
              />
            </li>
            <li>
              {blockChange.toUpperCase()} :
              <input
                className="ml-2"
                type="checkbox"
                checked={form.checkoutReason === blockChange}
                onChange={() => handleCheckoutReasons(blockChange)}
              />
            </li>
            <li>
              {semesterBreak.toUpperCase()} :
              <input
                className="ml-2"
                type="checkbox"
                checked={form.checkoutReason === semesterBreak}
                onChange={() => handleCheckoutReasons(semesterBreak)}
              />
            </li>
          </div>
          <div>
            <li>
              {internship.toUpperCase()} :
              <input
                className="ml-2"
                type="checkbox"
                checked={form.checkoutReason === internship}
                onChange={() => handleCheckoutReasons(internship)}
              />
            </li>
            <li>
              {graduated.toUpperCase()} :
              <input
                className="ml-2"
                type="checkbox"
                checked={form.checkoutReason === graduated}
                onChange={() => handleCheckoutReasons(graduated)}
              />
            </li>
            <li>
              {others.toUpperCase()} :
              <input
                className="ml-2"
                type="checkbox"
                checked={form.checkoutReason === others}
                onChange={() => handleCheckoutReasons(others)}
              />
            </li>
          </div>
        </ol>
        <Typography className="text-lg font-bold text-orange-500 my-2">
          MAKLUMAT PELAJAR
        </Typography>
        <div className="flex gap-4">
          <div className="w-1/2">
            <div className="items-center mb-1 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Nama
              </label>
              <input
                type="text"
                name="form.name"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4 items-center flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
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
            <div className="mb-4 items-center flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
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
            <div className="items-center mb-1 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="form.phone"
                value={form?.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
          </div>
          <div className="w-1/2">
            <p className="block font-semibold text-gray-700 mb-2">
              Sila muat Naik Gambar Perabot Dalam Bilik
            </p>
            <ul className="font-semibold flex gap-4 mb-4">
              <div>
                <li>- Meja Belajar</li>
                <li>- Almari</li>
              </div>
              <div>
                <li>- Katil</li>
                <li>- Tingkap</li>
              </div>
            </ul>
            <input
              type="file"
              accept="image/jpeg, application/pdf"
              required
              className="w-full mb-4 items-center"
              onChange={handleFileChange}
              multiple
            />
            {!fileUploaded && (
              <p className="text-red-500">Please select at least one file.</p>
            )}
          </div>
        </div>
        <Typography className="text-lg font-bold text-orange-500 mt-8 mb-4">
          AKUAN PELAJAR
        </Typography>
        <p className="font-bold">
          SAYA SEPERTI PENAMA DIATAS DENGAN INI MEMBUAT AKUAN BAHWASANYA :
        </p>
        <ul className="font-bold">
          <li>- Telah menutup tingkap dan mengunci pintu.</li>
          <li>- Telah memulangi kunci.</li>
          <li>- Memastikan semua perabot dalam keadaan baik.</li>
          <li>- Mematikan semua suis elektrik.</li>
          <li>- Telah mengeluarkan semua barangan peribadi dari bilik.</li>
          <li>- Tidak berada di dalam bilik selepas kunci dipulangkan.</li>
        </ul>
        <FeedbackMessage success={feedback.success} error={feedback.error} />
        <Button
          variant="contained"
          color="primary"
          className="bg-blue-500 text-white p-2 rounded cursor-pointer mt-12"
          onClick={handleFormSubmit}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default formComponent;
