import { Dispatch, SetStateAction } from "react";
import { RELATIONSHIP } from "shared-library/src/declarations/constants";
import {
  Contact,
  Relationship,
} from "shared-library/src/declarations/types";

type EmergencyContactProp = {
  data: Contact;
  setData: Dispatch<SetStateAction<Contact>>;
};

const EmergencyContactInput = ({ data, setData }: EmergencyContactProp) => {
  return (
    <div className="flex gap-4 w-full">
      <div className="w-2/5">
        <div className="mb-4 flex gap-2">
          <label className="block w-1/3 font-medium text-gray-700">
            Emergency Contact Name
          </label>
          <input
            type="text"
            name="emergencyContact.name"
            value={data?.name!}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4 flex gap-2">
          <label className="block w-1/3 font-medium text-gray-700">
            Emergency Contact Phone
          </label>
          <input
            type="text"
            name="emergencyContact.phone"
            value={data?.phone!}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4 flex gap-2">
          <label className="block w-1/3 font-medium text-gray-700">
            Relationship
          </label>
          <select
            name="emergencyContact.relationship"
            value={data?.relationship!}
            onChange={(e) =>
              setData({ ...data, relationship: e.target.value as Relationship })
            }
            className="mt-1 p-2 border rounded w-full"
          >
            <option value={RELATIONSHIP.bapa}>Bapa</option>
            <option value={RELATIONSHIP.ibu}>Ibu</option>
            <option value={RELATIONSHIP.adikBeradik}>Adik Beradik</option>
            <option value={RELATIONSHIP.penjaga}>Penjaga</option>
          </select>
        </div>
      </div>

      <div className="w-3/5">
        <div className="col-span-2">
          <label className="block font-medium text-gray-700">
            Emergency Contact Address
          </label>
        </div>
        <div className="mb-1 col-span-2">
          <input
            type="text"
            name="emergencyContact.address.street"
            value={data?.address?.street!}
            onChange={(e) =>
              setData({
                ...data,
                address: { ...data.address, street: e.target.value },
              })
            }
            className="mt-1 p-2 border rounded w-full"
            placeholder="Street"
          />
        </div>
        <div className="mb-1 col-span-2">
          <input
            type="text"
            name="emergencyContact.address.city"
            value={data?.address?.city!}
            onChange={(e) =>
              setData({
                ...data,
                address: { ...data.address, city: e.target.value },
              })
            }
            className="mt-1 p-2 border rounded w-full"
            placeholder="City"
          />
        </div>
        <div className="mb-1 col-span-2">
          <input
            type="text"
            name="emergencyContact.address.state"
            value={data?.address?.state!}
            onChange={(e) =>
              setData({
                ...data,
                address: { ...data.address, state: e.target.value },
              })
            }
            className="mt-1 p-2 border rounded w-full"
            placeholder="State"
          />
        </div>
        <div className="mb-1 col-span-2">
          <input
            type="text"
            name="emergencyContact.address.postalCode"
            value={data?.address?.postalCode!}
            onChange={(e) =>
              setData({
                ...data,
                address: { ...data.address, postalCode: e.target.value },
              })
            }
            className="mt-1 p-2 border rounded w-full"
            placeholder="Postal Code"
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactInput;
