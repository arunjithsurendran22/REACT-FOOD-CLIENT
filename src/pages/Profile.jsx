import { useState, useEffect } from "react";
import api from "../components/authorization/api";
import { toast } from "react-toastify";
import ProfilePhoto from "../components/shared/profile/ProfilePhoto";
import AddAddress from "../components/shared/profile/AddAddress";
const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile/get-profile");
        setProfile(response.data);
        toast.success("Successfully fetched profile");
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        toast.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {Object.keys(profile).length > 0 ? (
        <div>
            <img src={profile.image} alt='profile-image' className="w-28 rounded-md"/>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Mobile:</strong> {profile.mobile}
          </p>
          {/* You can display additional profile information here */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      <div>
        <ProfilePhoto />
      </div>
      <div>
        <AddAddress/>
      </div>
    </div>
  );
};

export default Profile;
