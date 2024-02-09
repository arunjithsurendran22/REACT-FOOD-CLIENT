import { useState } from "react";
import api from "../../authorization/api";
import { toast } from "react-toastify";
import { BiSolidImageAdd } from "react-icons/bi";

const ProfilePhoto = () => {
  const [selectFile, setSelectFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectFile);
      const response = await api.post("/profile/add-profile-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      toast.success("Successfully Upload Profile Photo");
    } catch (error) {
      console.error("Failed to upload profile photo", error);
      toast.error("Failed to upload profile photo");
    }
  };

  return (
    <div>
      <label htmlFor="file-upload" className="custom-file-upload">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }} 
          className="cursor-pointer"
        />
        <BiSolidImageAdd onClick={handleUpload} />
      </label>
    </div>
  );
};

export default ProfilePhoto;
