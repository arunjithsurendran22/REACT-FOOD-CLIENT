import { useState, useEffect } from "react";
import api from "../components/authorization/api";
import { toast } from "react-toastify";
import { Link, Outlet } from "react-router-dom"; // Import Outlet
import AddAddress from "../components/shared/profile/AddAddress";

const Profile = () => {
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
    <div className="bg-orange-300 h-screen flex justify-center ">
      <div className="container ">
        {Object.keys(profile).length > 0 ? (
          <div className="mx-auto my-10 bg-white rounded-md h-40 shadow-lg  md:flex justify-between items-center px-20">
            <div className="flex justify-between items-center w-80 ">
              <img
                src={profile.image}
                alt="profile-image"
                className="w-28 rounded-full shadow-lg"
              />
              <div>
                <p>
                  <strong>{profile.name}</strong>
                </p>
                <p>{profile.email}</p>
                <p>{profile.mobile}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-16 py-2 rounded-lg shadow-lg bg-orange-300 font-bold hover:bg-orange-600">
                EDIT
              </button>
            </div>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
        <div className="bg-white mx-auto mt-20 shadow-lg rounded-lg h-3/6 relative">
          <div className="bg-gray-400 w-56 h-full rounded-l-lg flex justify-center items-center">
            <ul className="font-bold text-2xl  flex flex-col justify-between h-60">
              <Link to="user-orders">
                <li>Orders</li>
              </Link>
              <Link to="user-address">
                <li>Address</li>
              </Link>
              <Link to="user-favourites">
                <li>Favourites</li>
              </Link>
              <Link to="settings">
                <li>Settings</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <Outlet /> 
      </div>
    </div>
  );
};

export default Profile;
