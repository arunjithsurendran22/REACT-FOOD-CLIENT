import { useState } from "react";
import api from "../../authorization/api";
import { toast } from "react-toastify";
import { BiSolidImageAdd } from "react-icons/bi";

const ProfilePhoto = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleProfilePhoto = async () => {
    // Simulate clicking the hidden file input
    document.getElementById("file-upload").click();
  };

  const handleFileChange = async (e) => {
    const selectedPhoto = e.target.files[0];
    setProfilePhoto(selectedPhoto);
    await uploadProfilePhoto(selectedPhoto);
  };

  const uploadProfilePhoto = async (selectedPhoto) => {
    try {
      const formData = new FormData();
      formData.append("image", selectedPhoto);

      const response = await api.post("/profile/add-profile-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Optionally, you can handle the response if needed

      toast.success("Successfully uploaded profile photo");
    } catch (error) {
      console.error("Failed to upload profile photo", error);
      toast.error("Failed to upload profile photo");
    }
  };

  return (
    <div className="mx-auto flex items-center justify-center flex-col">
      {profilePhoto && (
        <div className="mb-4">
          <img
            src={URL.createObjectURL(profilePhoto)}
            alt="Profile Preview"
            className="rounded-full h-20 w-20 object-cover"
          />
        </div>
      )}
      <div>
        <button
          onClick={handleProfilePhoto}
          className="bg-red-200 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          <BiSolidImageAdd className="mr-2" />
        </button>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          required
        />
      </div>
    </div>
  );
};

export default ProfilePhoto;
