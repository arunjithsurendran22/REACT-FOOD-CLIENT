import AddAddress from "./AddAddress";
import { IoMdClose } from "react-icons/io";

const AddAddressModal = ({ isOpen, onClose ,updateAddresses }) => {

  
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white w-96 rounded-lg">
        <div className="flex justify-end">
          <button className="absolute text-black  p-9" onClick={onClose}>
            <IoMdClose className="text-red-600 hover:text-2xl font-extrabold" />
          </button>
        </div>
        <AddAddress onClose={onClose}updateAddresses={updateAddresses} /> 
      </div>
    </div>
  );
};

export default AddAddressModal;
