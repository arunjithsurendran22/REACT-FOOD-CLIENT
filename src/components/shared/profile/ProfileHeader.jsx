import { useState, useEffect } from "react";
import api from "../../authorization/api";
import { toast } from "react-toastify";
import ProfileEdit from "./ProfileEdit";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

// Placeholder image URL
const placeholderImage =
  "https://tse1.mm.bing.net/th?id=OIP.mpXg7tyCFEecqgUsoW9eQwHaHk&pid=Api&P=0&h=180";

const ProfileHeader = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile/get-profile");
        setProfile(response.data);
        setIsLoggedIn(true); // Set login status to true after fetching profile
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setIsLoggedIn(false); // Set login status to false if there's an error
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/profile/logout-user");
      localStorage.removeItem("accessTokenUser");
      localStorage.removeItem("refreshTokenUser");
      navigate("/");
      setIsLoggedIn(false);
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="flex justify-between items-center px-10 py-5 shadow-lg rounded-lg border border-b-gray-200 bg-white">
          <div className="flex justify-between w-72 items-center">
            <img
              src={profile.image || placeholderImage}
              alt="profile-image"
              className="w-24 rounded-full shadow-lg relative"
            />

            <div>
              <p>
                <strong>{profile.name || "Guest"}</strong>
              </p>
              <p>{profile.email || "guest@example.com"}</p>
              <p>{profile.mobile || "+123456789"}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between h-16 items-center">
            {isLoggedIn && (
              <button onClick={handleLogout}>
                <LiaSignOutAltSolid  className=""/>
              </button>
            )}
            <ProfileEdit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
