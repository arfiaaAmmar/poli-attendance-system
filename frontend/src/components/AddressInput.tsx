import { STATES_IN_MALAYSIA } from "shared-library/src/declarations/constants";

type AddressInputProp = {
  title: string;
  handleSubmit: () => void;
};

const AddressInput = ({ title, handleSubmit }: AddressInputProp) => {
  return (
    <div className="w-3/5">
      <div className="col-span-2">
        <label className="block font-medium text-gray-700">
          {title ?? "Emergency Contact Address"}
        </label>
      </div>
      <div className="mb-1 col-span-2">
        <input
          type="text"
          name="emergencyContact.address.street"
          className="mt-1 p-2 border rounded w-full"
          placeholder="Street"
        />
      </div>
      <div className="mb-1 col-span-2">
        <input
          type="text"
          name="emergencyContact.address.city"
          className="mt-1 p-2 border rounded w-full"
          placeholder="City"
        />
      </div>
      <div className="mb-1 col-span-2">
        <select
          name="emergencyContact.address.state"
          className="mt-1 p-2 border rounded w-full"
        >
          {STATES_IN_MALAYSIA.map((state) => (
            <option value={state}>{state}</option>
          ))}
        </select>
      </div>
      <div className="mb-1 col-span-2">
        <input
          type="text"
          name="emergencyContact.address.postalCode"
          className="mt-1 p-2 border rounded w-full"
          placeholder="Postal Code"
        />
      </div>
    </div>
  );
};

export default AddressInput;
