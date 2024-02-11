import { useState, useEffect } from "react";
import AddAddressModal from "../components/shared/AddAddressModal";
import api from "../components/authorization/api";
import { FaPlus, FaTimes } from "react-icons/fa"; // Import the plus and times icons from react-icons library
import { toast } from "react-toastify";


const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await api.get("/profile/add-address/get");
        setAddresses(response.data.addresses);
      } catch (error) {
        toast.error("failed to delete address");
        console.error("Failed to fetch addresses", error);
      }
    };
    fetchAddress();
  }, []);

  const handleAddAddress = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDeleteAddress = async (addressId) => {
    try {
      console.log(addressId);
      await api.delete(`/profile/delete-address/${addressId}`);
      // Filter the addresses array based on the address ID
      setAddresses(addresses.filter((address) => address._id !== addressId));
    } catch (error) {
      console.error("Failed to delete address", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center p-4">
      <div className="max-w-sm mx-4 mb-8 bg-white rounded shadow-md p-6 w-72 border border-gray-300 flex justify-center">
        <button
          className="flex items-center text-black font-bold py-2 px-4 rounded-full transition duration-300"
          onClick={handleAddAddress}
        >
          <FaPlus />
        </button>
      </div>
      {addresses.map((address) => (
        <div
          key={address._id}
          className="relative max-w-sm mx-4 mb-8 bg-white rounded shadow-md p-6 w-72 border border-gray-300"
        >
          <button
            className="absolute top-0 right-0 mt-2 mr-2 p-2 rounded-full bg-red-500 text-white focus:outline-none"
            onClick={() => handleDeleteAddress(address._id)}
          >
            <FaTimes />
          </button>
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
      <div className="">
        <AddAddressModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default Address;
