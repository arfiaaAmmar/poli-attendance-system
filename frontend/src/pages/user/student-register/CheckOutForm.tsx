import { Button, Typography } from "@mui/material";
import {
  EmergencyContact,
  FormType,
  Gender,
  Race,
  RegisterForm,
  TenantInfo,
} from "shared-library/src/declarations/types.js";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  HTMLInputTypeAttribute,
  SetStateAction,
} from "react";
import {
  FORM_TYPE,
  GENDER,
  RACE,
} from "shared-library/src/declarations/constants.js";
import EmergencyContactInput from "./EmergencyContactInput.js";

type CheckOutFormProp = {
  form: RegisterForm;
  tenantInfo: TenantInfo;
  emergencyContact: EmergencyContact;
  fileUploaded: boolean;
  setForm: Dispatch<SetStateAction<RegisterForm>>;
  setTenantInfo: Dispatch<SetStateAction<TenantInfo>>;
  setEmergencyContact: Dispatch<SetStateAction<EmergencyContact>>;
  setFileUploaded: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CheckOutForm = ({
  form,
  tenantInfo,
  emergencyContact,
  fileUploaded,
  setForm,
  setTenantInfo,
  setEmergencyContact,
  setFileUploaded,
  handleSubmit,
  handleFileChange,
}: CheckOutFormProp) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="w-5/6 mx-auto mt-12">
        <Typography className="text-lg font-bold text-orange-500 my-2">
          BUTIRAN PERMOHONAN
        </Typography>
        <p className="font-semibold my-4">
          SILA TANDAKAN (/) PADA YANG BERKENAAN
        </p>
        <ol type="1" className="flex gap-8">
          <div>
            <li>
              TUKAR BILIK PENGINAPAN :<input className="ml-2" type="checkbox" />
            </li>
            <li>
              TUKAR BLOK KEDIAMAN :<input className="ml-2" type="checkbox" />
            </li>
            <li>
              CUTI SEMESTER :<input className="ml-2" type="checkbox" />
            </li>
          </div>
          <div>
            <li>
              LATIHAN INDUSTRI :<input className="ml-2" type="checkbox" />
            </li>
            <li>
              TAMAT PENGAJIAN :<input className="ml-2" type="checkbox" />
            </li>
            <li>
              LAIN-LAIN :<input className="ml-2" type="checkbox" />
            </li>
          </div>
        </ol>
        <Typography className="text-lg font-bold text-orange-500 my-2">
          BAHAGIAN A : MAKLUMAT PENGHUNI
        </Typography>
        <div className="flex gap-4">
          <div className="w-1/2">
            <div className="items-center mb-1 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Nama
              </label>
              <input
                type="text"
                name="tenantInfo.name"
                value={tenantInfo.name || ""}
                onChange={(e) =>
                  setTenantInfo({ ...tenantInfo, name: e.target.value })
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
                name="tenantInfo.phone"
                value={tenantInfo?.phone || ""}
                onChange={(e) =>
                  setTenantInfo({ ...tenantInfo, phone: e.target.value })
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
          BAHAGIAN B : SAUDARA TERDEKAT YANG BOLEH DIHUBUNGI SEMASA KECEMASAN
        </Typography>
        <EmergencyContactInput
          data={emergencyContact}
          setData={setEmergencyContact}
        />
        <Typography className="text-lg font-bold text-orange-500 mt-8 mb-4">
          BAHAGIAN C : PENGAKUAN PENGHUNI KAMSIS
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
        <div className="mb-4 items-center flex w-32 mr-0 ml-auto">
          <label className="w-1/3 text-2xl font-medium text-gray-700">
            Setuju
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
    </>
  );
};

export default CheckOutForm;

type Input = {
  type: HTMLInputTypeAttribute | undefined;
  name?: string;
  value: string;
  label: string;
  className: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => Dispatch<SetStateAction<any>>;
};
