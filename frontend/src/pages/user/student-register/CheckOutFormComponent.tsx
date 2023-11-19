import { Button, Typography } from "@mui/material";
import { CheckoutForm } from "shared-library/src/declarations/types";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { CHECKOUT_REASONS } from "shared-library/src/declarations/constants";

type CheckOutFormProp = {
  checkOutForm: CheckoutForm;
  fileUploaded: boolean;
  setCheckOutForm: Dispatch<SetStateAction<CheckoutForm>>;
  setFileUploaded: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CheckoutFormComponent = ({
  checkOutForm,
  fileUploaded,
  setCheckOutForm,
  setFileUploaded,
  handleSubmit,
  handleFileChange,
}: CheckOutFormProp) => {
  const handleCheckoutReasons = (checkoutReason: string) => {
    setCheckOutForm({ ...checkOutForm, checkoutReason: checkoutReason });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-5/6 mx-auto mt-12 h-screen">
        <Typography className="text-lg font-bold text-orange-500 my-2">
          BUTIRAN PERMOHONAN
        </Typography>
        <p className="font-semibold my-4">
          SILA TANDAKAN (/) PADA YANG BERKENAAN
        </p>
        <ol type="1" className="flex gap-8">
          <div>
            <li>
              {CHECKOUT_REASONS.roomChange.toUpperCase()} :
              <input
                className="ml-2"
                type="checkbox"
                checked={
                  checkOutForm.checkoutReason === CHECKOUT_REASONS.roomChange
                }
                onChange={() =>
                  handleCheckoutReasons(CHECKOUT_REASONS.roomChange)
                }
              />
            </li>
            <li>
              {CHECKOUT_REASONS.blockChange.toUpperCase()} :
              <input
                className="ml-2"
                type="checkbox"
                checked={
                  checkOutForm.checkoutReason === CHECKOUT_REASONS.blockChange
                }
                onChange={() =>
                  handleCheckoutReasons(CHECKOUT_REASONS.blockChange)
                }
              />
            </li>
            <li>
              {CHECKOUT_REASONS.semesterBreak.toUpperCase()} :
              <input
                className="ml-2"
                type="checkbox"
                checked={
                  checkOutForm.checkoutReason === CHECKOUT_REASONS.semesterBreak
                }
                onChange={() =>
                  handleCheckoutReasons(CHECKOUT_REASONS.semesterBreak)
                }
              />
            </li>
          </div>
          <div>
            <li>
              {CHECKOUT_REASONS.internship.toUpperCase()} :
              <input
                className="ml-2"
                type="checkbox"
                checked={
                  checkOutForm.checkoutReason === CHECKOUT_REASONS.internship
                }
                onChange={() =>
                  handleCheckoutReasons(CHECKOUT_REASONS.internship)
                }
              />
            </li>
            <li>
              {CHECKOUT_REASONS.graduated.toUpperCase()} :
              <input
                className="ml-2"
                type="checkbox"
                checked={
                  checkOutForm.checkoutReason === CHECKOUT_REASONS.graduated
                }
                onChange={() =>
                  handleCheckoutReasons(CHECKOUT_REASONS.graduated)
                }
              />
            </li>
            <li>
              {CHECKOUT_REASONS.others.toUpperCase()} :
              <input
                className="ml-2"
                type="checkbox"
                checked={
                  checkOutForm.checkoutReason === CHECKOUT_REASONS.others
                }
                onChange={() => handleCheckoutReasons(CHECKOUT_REASONS.others)}
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
                name="checkOutForm.name"
                value={checkOutForm.name || ""}
                onChange={(e) =>
                  setCheckOutForm({ ...checkOutForm, name: e.target.value })
                }
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
                value={checkOutForm?.roomNo || ""!}
                onChange={(e) =>
                  setCheckOutForm({ ...checkOutForm, roomNo: e.target.value })
                }
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
                value={checkOutForm?.blockNo || ""!}
                onChange={(e) =>
                  setCheckOutForm({ ...checkOutForm, blockNo: e.target.value })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="items-center mb-1 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="checkOutForm.phone"
                value={checkOutForm?.phone || ""}
                onChange={(e) =>
                  setCheckOutForm({ ...checkOutForm, phone: e.target.value })
                }
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
        <Button
          variant="contained"
          color="primary"
          className="bg-blue-500 text-white p-2 rounded cursor-pointer mt-12"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default CheckoutFormComponent;
