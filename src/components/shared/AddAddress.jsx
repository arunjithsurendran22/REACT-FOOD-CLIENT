import { useState } from "react";
import api from "../authorization/api";
import { toast } from "react-toastify";

const AddAddress = () => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/profile/add-address/add", {
        street,
        city,
        state,
        landmark,
        pincode,
      });
      setStreet("");
      setCity("");
      setState("");
      setLandmark("");
      setPincode("");
      toast.success("Address added successfully");
    } catch (error) {
      console.error("Failed to add address", error);
      toast.error("Failed to add address");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add Address</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="street"
            className="block text-sm font-medium text-gray-600"
          >
            Street
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-600"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-600"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="landmark"
            className="block text-sm font-medium text-gray-600"
          >
            Landmark
          </label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="pincode"
            className="block text-sm font-medium text-gray-600"
          >
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddAddress;
