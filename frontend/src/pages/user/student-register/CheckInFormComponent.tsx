import { Button, Typography } from "@mui/material";
import {
  CheckInForm,
  Contact,
  Gender,
  Races,
  TenantInfo,
} from "shared-library/src/declarations/types";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  HTMLInputTypeAttribute,
  SetStateAction,
} from "react";
import {
  GENDER,
  STATES_IN_MALAYSIA,
  RACES
} from "shared-library/src/declarations/constants";
import EmergencyContactInput from "./EmergencyContactInput";

type CheckInFormProp = {
  checkInForm: CheckInForm;
  tenantInfo: TenantInfo;
  emergencyContact: Contact;
  fileUploaded: boolean;
  setCheckInForm: Dispatch<SetStateAction<CheckInForm>>;
  setTenantInfo: Dispatch<SetStateAction<TenantInfo>>;
  setEmergencyContact: Dispatch<SetStateAction<Contact>>;
  setFileUploaded: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CheckInFormComponent = ({
  checkInForm,
  tenantInfo,
  emergencyContact,
  fileUploaded,
  setCheckInForm,
  setTenantInfo,
  setEmergencyContact,
  handleSubmit,
}: CheckInFormProp) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const offerLetterFile = e?.target?.files?.[0];
    const paymentReceiptFile = e?.target?.files?.[1];
    if (offerLetterFile) {
      setCheckInForm({ ...checkInForm, offerLetterFile: offerLetterFile });
    }
    if (paymentReceiptFile) {
      setCheckInForm({
        ...checkInForm,
        paymentReceiptFile: paymentReceiptFile,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-5/6 mx-auto mt-12">
        <Typography className="text-lg font-bold text-orange-500 my-2">
          BAHAGIAN A : MAKLUMAT PENGHUNI
        </Typography>
        <div className="flex gap-4">
          <div className="w-1/2">
            <div className="items-center mb-1 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Name Penuh
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
            <div className="items-center mb-1 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                No Matrik
              </label>
              <input
                type="text"
                name="tenantInfo.matrikNo"
                value={tenantInfo?.matrikNo || ""}
                onChange={(e) =>
                  setTenantInfo({ ...tenantInfo, matrikNo: e.target.value })
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
                value={checkInForm.roomNo || ""!}
                onChange={(e) =>
                  setCheckInForm({ ...checkInForm, roomNo: e.target.value })
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
                value={checkInForm.blockNo || ""!}
                onChange={(e) =>
                  setCheckInForm({ ...checkInForm, blockNo: e.target.value })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4 items-center flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Resit No
              </label>
              <input
                type="text"
                name="resitNo"
                placeholder="1234ABCD"
                value={checkInForm.resitNo}
                onChange={(e) =>
                  setCheckInForm({ ...checkInForm, resitNo: e.target.value })
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
                name="tenantInfo.phone"
                value={tenantInfo?.phone || ""}
                onChange={(e) =>
                  setTenantInfo({ ...tenantInfo, phone: e.target.value })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="items-center mb-1 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                name="tenantInfo.email"
                value={tenantInfo?.email || ""}
                onChange={(e) =>
                  setTenantInfo({ ...tenantInfo, email: e.target.value })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="items-center mb-1 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Semester
              </label>
              <input
                type="text"
                name="tenantInfo.semester"
                value={tenantInfo?.semester || ""}
                onChange={(e) =>
                  setTenantInfo({ ...tenantInfo, semester: e.target.value })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="flex gap-2">
              <div className="items-center mb-1 flex gap-2">
                <label className="w-1/3 block font-medium text-gray-700">
                  Race
                </label>
                <select
                  name="tenantInfo.race"
                  value={tenantInfo?.race || ""}
                  onChange={(e) =>
                    setTenantInfo({
                      ...tenantInfo,
                      race: e.target.value as Races,
                    })
                  }
                  className="mt-1 p-2 border rounded w-full"
                >
                  {RACES.map((race) => (
                    <option value={race}>{race}</option>
                  ))}
                </select>
              </div>
              <div className="items-center mb-1 flex gap-2">
                <label className="w-1/3 block font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="tenantInfo.gender"
                  value={tenantInfo?.gender || ""}
                  onChange={(e) =>
                    setTenantInfo({
                      ...tenantInfo,
                      gender: e.target.value as Gender,
                    })
                  }
                  className="mt-1 p-2 border rounded w-full"
                >
                  <option value={GENDER.lelaki}>Lelaki</option>
                  <option value={GENDER.perempuan}>Perempuan</option>
                </select>
              </div>
            </div>
            <div className="items-center mb-1 flex gap-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Illness
              </label>
              <input
                type="text"
                name="tenantInfo.illness"
                value={tenantInfo?.illness || ""}
                onChange={(e) =>
                  setTenantInfo({ ...tenantInfo, illness: e.target.value })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="col-span-2">
              <label className="w-1/3 block font-medium text-gray-700">
                Address
              </label>
            </div>
            <div className="items-center mb-1 col-span-2 mt-4">
              <input
                type="text"
                name="tenantInfo.address.street"
                value={tenantInfo?.address.street || ""}
                onChange={(e) =>
                  setTenantInfo({
                    ...tenantInfo,
                    address: {
                      ...tenantInfo.address,
                      street: e.target.value,
                    },
                  })
                }
                className="mt-1 p-2 border rounded w-full"
                placeholder="Street"
              />
            </div>
            <div className="items-center mb-1 col-span-2">
              <input
                type="text"
                name="tenantInfo.address.city"
                value={tenantInfo?.address.city || ""}
                onChange={(e) =>
                  setTenantInfo({
                    ...tenantInfo,
                    address: {
                      ...tenantInfo.address,
                      city: e.target.value,
                    },
                  })
                }
                className="mt-1 p-2 border rounded w-full"
                placeholder="City"
              />
            </div>
            <div className="items-center mb-1 col-span-2">
              <select
                name="tenantInfo.address.state"
                value={tenantInfo?.address.state || ""}
                onChange={(e) =>
                  setTenantInfo({
                    ...tenantInfo,
                    address: {
                      ...tenantInfo.address,
                      state: e.target.value,
                    },
                  })
                }
                className="mt-1 p-2 border rounded w-full"
              >
                {STATES_IN_MALAYSIA.map((state) => (
                  <option value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="items-center col-span-2 mb-8">
              <input
                type="text"
                name="tenantInfo.address.postalCode"
                value={tenantInfo?.address.postalCode || ""}
                onChange={(e) =>
                  setTenantInfo({
                    ...tenantInfo,
                    address: {
                      ...tenantInfo.address,
                      postalCode: e.target.value,
                    },
                  })
                }
                className="mt-1 p-2 border rounded w-full"
                placeholder="Postal Code"
              />
            </div>
            <p className="font-bold my-4">
              Sila muat naik Surat Tawaran dan Resit Bayaran
            </p>
            <input
              type="file"
              accept="image/jpeg, application/pdf"
              required
              className="w-full mb-4 items-center"
              onChange={handleFileChange}
              multiple
            />
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
        <p className="font-semibold">
          Saya yang bernama seperti di atas dengan ini mengaku dan bersetuju
          akan mematuhi segala peraturan dan undang-undang KAMSIS selama saya
          menjadi penghuni disini dan snggup menerima sebarang hukuman yang
          berkaitan “keasalahan-kesalahan serius seperti tercatat di dalam Buku
          Panduan Dan Peraturan Am Politeknik , Kementerian Pengajian Tinggi
          Malaysia dan Akta 174 , Akta Institusi-institusi Pelajaran 1976
          Bahagian II ( Tatatertib Asrama )
        </p>
        <div className="mb-4 items-center flex w-32 mr-0 ml-auto">
          <label className="w-1/3 text-2xl font-medium text-gray-700">
            Setuju
          </label>
          <input
            type="checkbox"
            name="tenantAgreement"
            checked={checkInForm.tenantAgreement!}
            onChange={(e) =>
              setCheckInForm({
                ...checkInForm,
                tenantAgreement: e.target.checked,
              })
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

export default CheckInFormComponent;

type Input = {
  type: HTMLInputTypeAttribute | undefined;
  name?: string;
  value: string;
  label: string;
  className: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => Dispatch<SetStateAction<any>>;
};
