import { Outlet } from "react-router-dom";
import ProfileSideBar from "../components/shared/profile/ProfileSideBar";
import ProfileHeader from "../components/shared/profile/ProfileHeader";

const Profile = () => {
  return (
    <div className="">
      <div className="container mx-auto  h-dvh">
        <ProfileHeader  />
        <div className="flex flex-row my-10">
          <ProfileSideBar />
          <div>{<Outlet />}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
