import { Outlet } from "react-router-dom";
import ProfileSideBar from "../components/shared/profile/ProfileSideBar";
import ProfileHeader from "../components/shared/profile/ProfileHeader";

const Profile = () => {
  return (
    <div className="container mx-auto my-10 h-dvh" style={{border:"2px solid red"}}>
      <ProfileHeader />
      <div className="flex flex-row my-10">
        <ProfileSideBar />
        <div>{<Outlet />}</div>
      </div>
    </div>
  );
};

export default Profile;
