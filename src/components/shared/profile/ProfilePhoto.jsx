import { useState } from "react";
import api from "../../authorization/api";
import { toast } from "react-toastify";

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
      toast.success("Successfully Upload ProfilePhoto");
    } catch (error) {
      console.error("Failed to upload profile photo", error);
      toast.error("Failed to upload profile photo");
    }
  };

  return (
    <div>
      <h1>Upload Profile Photo</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ProfilePhoto;
