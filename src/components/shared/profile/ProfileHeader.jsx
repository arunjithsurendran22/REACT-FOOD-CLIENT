import { useState, useEffect } from "react";
import api from "../../authorization/api";
import { toast } from "react-toastify";

const ProfileHeader = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile/get-profile");
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        toast.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);
  return (
    <div className="">
      <div className="">
        {Object.keys(profile).length > 0 ? (
          <div className="flex justify-between items-center px-10 py-5 shadow-lg rounded-lg border border-b-gray-200 bg-white">
            <div className="flex justify-between w-80 items-center">
              <img
                src={profile.image}
                alt="profile-image"
                className="w-24 rounded-full shadow-lg"
              />
              <div>
                <p>
                  <strong>{profile.name}</strong>
                </p>
                <p>{profile.email}</p>
                <p>{profile.mobile}</p>
              </div>
            </div>
            <div className="">
              <button className="px-16 py-2 rounded-lg shadow-lg bg-orange-300 font-bold hover:bg-orange-600">
                EDIT
              </button>
            </div>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
