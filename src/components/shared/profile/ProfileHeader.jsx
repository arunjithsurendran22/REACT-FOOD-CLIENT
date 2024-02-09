import { useState, useEffect } from "react";
import api from "../../authorization/api";
import { toast } from "react-toastify";
import ProfileEdit from "./ProfileEdit";
import ProfilePhoto from "./ProfilePhoto";

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
                className="w-24 rounded-full shadow-lg relative"
              />
              <ProfilePhoto />

              <div>
                <p>
                  <strong>{profile.name}</strong>
                </p>
                <p>{profile.email}</p>
                <p>{profile.mobile}</p>
              </div>
            </div>
            <div>
              <ProfileEdit />
            </div>
          </div>
        ) : (
          <p>please login</p>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
