import { Dispatch, SetStateAction } from "react";
import { GENDER, ETHNICITY } from "shared-library/src/declarations/constants";
import {
  CheckInForm,
  Gender,
  TenantInfo,
} from "shared-library/src/declarations/types";
import { Ethnicity } from "shared-library/src/declarations/types.js";

type TenantInfoProp = {
  form: CheckInForm;
  tenantInfo: TenantInfo;
  setForm: Dispatch<SetStateAction<CheckInForm>>;
  setTenantInfo: Dispatch<SetStateAction<TenantInfo>>;
};

const TenantInfoInput = ({
  form,
  tenantInfo,
  setForm,
  setTenantInfo,
}: TenantInfoProp) => {
  return (
    <>
      <div className="mb-1 flex gap-2">
        <label className="block text-sm font-medium text-gray-700">
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
      <div className="mb-1 flex gap-2">
        <label className="block text-sm font-medium text-gray-700">
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
      <div className="mb-4 flex gap-2">
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
      <div className="mb-4 flex gap-2">
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
      <div className="mb-4 flex gap-2">
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
      <div className="mb-1 flex gap-2">
        <label className="block text-sm font-medium text-gray-700">Phone</label>
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
      <div className="mb-1 flex gap-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
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
      <div className="mb-1 flex gap-2">
        <label className="block text-sm font-medium text-gray-700">
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
        <div className="mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Race
          </label>
          <select
            name="tenantInfo.race"
            value={tenantInfo?.race || ""}
            onChange={(e) =>
              setTenantInfo({ ...tenantInfo, race: e.target.value as Ethnicity })
            }
            className="mt-1 p-2 border rounded w-full"
          >
            {Object.values(ETHNICITY).map((race) => (
              <option value={race}>{race}</option>
            ))}
          </select>
        </div>
        <div className="mb-1 flex gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            name="tenantInfo.gender"
            value={tenantInfo?.gender || ""}
            onChange={(e) =>
              setTenantInfo({ ...tenantInfo, gender: e.target.value as Gender })
            }
            className="mt-1 p-2 border rounded w-full"
          >
            <option value={GENDER.lelaki}>Lelaki</option>
            <option value={GENDER.perempuan}>Perempuan</option>
          </select>
        </div>
      </div>
      <div className="mb-1 flex gap-2">
        <label className="block text-sm font-medium text-gray-700">
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
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
      </div>
      <div className="mb-1 col-span-2">
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
      <div className="mb-1 col-span-2">
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
      <div className="mb-1 col-span-2">
        <input
          type="text"
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
          placeholder="State"
        />
      </div>
      <div className="mb-1 col-span-2">
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
    </>
  );
};

export default TenantInfoInput;
