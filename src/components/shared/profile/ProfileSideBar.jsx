import { Link } from "react-router-dom";

const ProfileSideBar = () => {
  return (
    <div className="shadow-lg border border-gray-300 rounded-lg  w-56 flex justify-center items-center">
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
  );
};

export default ProfileSideBar;
