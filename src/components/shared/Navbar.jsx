import React, { useState } from "react";
import {
  FaHome,
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { VscSignIn } from "react-icons/vsc";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Input } from "@material-tailwind/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { key: "home", label: "Home", path: "/", icon: <FaHome /> },
    { key: "search", label: "Search", path: "/search", icon: <FaSearch /> },
    { key: "cart", label: "Cart", path: "/cart", icon: <FaShoppingCart /> },
    { key: "login", label: "Login", path: "/login", icon: <VscSignIn /> },
    {
      key: "register",
      label: "Register",
      path: "/register",
      icon: <SiGnuprivacyguard />,
    },
    { key: "profile", label: "Profile", path: "/profile", icon: <FaUserTie /> },
  ];

  return (
    <nav className="shadow-md p-4 fixed top-0 left-0 right-0 bg-white z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-900">
            <img
              src="https://i.pinimg.com/originals/72/7e/f7/727ef7286f28b289fd1188eefdd2b626.jpg"
              alt=""
              className="w-10"
            />
          </span>
        </div>

        <div className="hidden md:flex space-x-4">
          {links.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              className="flex items-center text-gray-700 hover:text-gray-900 transition duration-300 border px-4 py-2 rounded-full"
            >
              {link.icon}
              <span className="ml-2 text-shadow">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="w-72 md:hidden">
          <Input label="Search ...." />
        </div>

        {/* Toggle button only for small screens */}
        {/* <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-3xl"
            style={{ backgroundColor: "white" }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div> */}
      </div>

      {/* Render navbar links for small screens */}
      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col items-center flex-grow">
          {links.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              className="flex items-center text-gray-700 hover:text-gray-900 transition duration-300 mb-2 px-4 py-2 w-full rounded-md"
              style={{ backgroundColor: "#f0f0f0" }}
            >
              {link.icon}
              <span className="ml-2">{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
