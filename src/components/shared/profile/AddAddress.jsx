import { useState } from "react";
import api from "../../authorization/api";
import { toast } from "react-toastify";
import { Button, Input } from "@material-tailwind/react";

const AddAddress = () => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");

  const handleAddAddress = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/profile/add-address/add", {
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
      console.log(response.data.message);
      toast.success("Address added successfully");
    } catch (error) {
      console.error("Failed to add address", error);
      toast.error("Failed to add address");
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Add Address</h1>
      <form onSubmit={handleAddAddress}>
        <Input
          type="text"
          value={street}
          variant="standard"
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Street"
          required
          className="mb-4"
        />
        <Input
          type="text"
          value={city}
          variant="standard"
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
          className="mb-4"
        />
        <Input
          type="text"
          value={state}
          variant="standard"
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
          required
          className="mb-4"
        />
        <Input
          type="text"
          value={landmark}
          variant="standard"
          onChange={(e) => setLandmark(e.target.value)}
          placeholder="Landmark"
          required
          className="mb-4"
        />
        <Input
          type="number"
          value={pincode}
          variant="standard"
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Pincode"
          required
          className="mb-6"
        />
        <Button color="indigo" type="submit" ripple={true}>
          Add Address
        </Button>
      </form>
    </div>
  );
};

export default AddAddress;
