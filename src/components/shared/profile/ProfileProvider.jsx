import { createContext, useContext, useState, useEffect } from "react";
import api from "../../authorization/api";

// Create a new context
const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile/get-profile");
        setProfile(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, isLoggedIn, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useProfile = () => {
  return useContext(ProfileContext);
};

export default ProfileProvider;
