import { useState, useEffect } from "react";
import AddAddress from "../components/shared/AddAddress";
import api from "../components/authorization/api";

const Address = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await api.get("/profile/add-address/get");
        setAddresses(response.data.addresses);
      } catch (error) {
        console.error("Failed to fetch addresses", error);
      }
    };
    fetchAddress();
  }, []);

  return (
    <div className="flex flex-wrap justify-center p-4">
      {addresses.map((address) => (
        <div
          key={address._id}
          className="max-w-sm mx-4 mb-8 bg-white rounded shadow-md p-6"
        >
          <h2 className="text-xl font-bold mb-4">Address</h2>
          <p>
            <strong>Street:</strong> {address.street}
          </p>
          <p>
            <strong>City:</strong> {address.city}
          </p>
          <p>
            <strong>State:</strong> {address.state}
          </p>
          <p>
            <strong>Landmark:</strong> {address.landmark}
          </p>
          <p>
            <strong>Pincode:</strong> {address.pincode}
          </p>
        </div>
      ))}
      <div className="max-w-sm mx-4 mb-8 bg-white rounded shadow-md p-6">
        {/* AddAddress component goes here */}
        <AddAddress />
      </div>
    </div>
  );
};

export default Address;
