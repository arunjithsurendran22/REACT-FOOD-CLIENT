import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout, CiLogin } from "react-icons/ci";
import { MdOutlineAccountCircle } from "react-icons/md";

const NavbarBottom = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set initial state to false
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Handle logout logic
    setIsLoggedIn(false);
    localStorage.removeItem("accessTokenUser");
    localStorage.removeItem("refreshTokenUser");
    navigate("/login"); // Redirect to login after logout
  };

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true); // Update isLoggedIn state upon successful login
  };

  return (
    <div className="fixed bottom-0 w-full p-2 navbar-bottom md:hidden flex justify-around text-3xl items-center border-t border-gray-200 bg-white shadow-md">
      <Link to="/" className="hover:text-red-500 transition duration-300">
        <button className="focus:outline-none">
          <FaHome />
        </button>
      </Link>
      <Link
        to="/notifications"
        className="hover:text-red-500 transition duration-300"
      >
        <button className="focus:outline-none">
          <IoMdNotificationsOutline />
        </button>
      </Link>
      <Link to="/profile">
        <button>
          <MdOutlineAccountCircle />
        </button>
      </Link>
      <Link to="/cart" className="hover:text-red-500 transition duration-300">
        <button className="focus:outline-none">
          <TiShoppingCart />
        </button>
      </Link>
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="hover:text-red-500 transition duration-300"
        >
          <CiLogout />
        </button>
      ) : (
        <Link to="/login">
          <button className="hover:text-red-500 transition duration-300" onClick={handleLogin}>
            <CiLogin />
          </button>
        </Link>
      )}
    </div>
  );
};

export default NavbarBottom;
