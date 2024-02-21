import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { VscSignIn, VscSignOut } from "react-icons/vsc";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaUserTie } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [isLoggedIn]);
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { key: "home", label: "Home", path: "/", icon: <FaHome /> },
    { key: "search", label: "Search", path: "/search", icon: <FaSearch /> },
    { key: "cart", label: "Cart", path: "/cart", icon: <FaShoppingCart /> },
    isLoggedIn && {
      key: "logout",
      label: "Logout",
      icon: <VscSignOut />,
      onClick: handleLogout,
    },
    !isLoggedIn && {
      key: "login",
      label: "Login",
      path: "/login",
      icon: <VscSignIn />,
    },
    !isLoggedIn && {
      key: "register",
      label: "Register",
      path: "/register",
      icon: <SiGnuprivacyguard />,
    },
    { key: "profile", label: "Profile", path: "/profile", icon: <FaUserTie /> },
  ].filter(Boolean); // This filters out any falsey values

  return (
    <nav className="shadow-md p-1 md:p-4 fixed top-0 left-0 right-0 bg-white z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-900">
            <Link to="/">
              <img
                src="https://i.pinimg.com/originals/72/7e/f7/727ef7286f28b289fd1188eefdd2b626.jpg"
                alt="Logo"
                className="w-10"
              />
            </Link>
          </span>
        </div>

        <div className="hidden md:flex space-x-4">
          {links.map((link) => (
            <React.Fragment key={link.key}>
              {link.path ? (
                <Link
                  to={link.path}
                  className="flex items-center text-gray-700 hover:text-gray-900 transition duration-300 border px-4 py-2 rounded-full"
                >
                  {link.icon}
                  <span className="ml-2 text-shadow">{link.label}</span>
                </Link>
              ) : (
                <button
                  onClick={link.onClick}
                  className="flex items-center text-gray-700 hover:text-gray-900 transition duration-300 border px-4 py-2 rounded-full"
                >
                  {link.icon}
                  <span className="ml-2 text-shadow">{link.label}</span>
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl"
            style={{ backgroundColor: "transparent" }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col items-center">
          {links.map((link) => (
            <React.Fragment key={link.key}>
              {link.path ? (
                <Link
                  to={link.path}
                  className="text-center text-gray-700 hover:text-gray-900 transition duration-300 mb-2 px-4 py-2 w-full"
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  <span className="ml-2">{link.label}</span>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    link.onClick();
                    setIsOpen(false);
                  }}
                  className="text-center text-gray-700 hover:text-gray-900 transition duration-300 mb-2 px-4 py-2 w-full"
                >
                  {link.icon}
                  <span className="ml-2">{link.label}</span>
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
