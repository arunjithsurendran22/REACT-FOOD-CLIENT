import { useState, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout, CiLogin } from "react-icons/ci";
import { MdOutlineAccountCircle } from "react-icons/md";

const NavbarBottom = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in based on localStorage or any other method
    const storedAccessToken = localStorage.getItem("accessTokenUser");
    const storedRefreshToken = localStorage.getItem("refreshTokenUser");
    if (storedAccessToken && storedRefreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("accessTokenUser");
    localStorage.removeItem("refreshTokenUser");
    navigate("/login");
  };

  return (
    <div className="fixed bottom-0 w-full p-2 navbar-bottom md:hidden flex justify-around text-3xl items-center border-t border-gray-200 bg-white shadow-md">
      <Link to="/" className="hover:text-red-500 transition duration-300">
        <button className="focus:outline-none">
          <AiOutlineHome />
        </button>
      </Link>
      
      <Link to="/profile">
        <button className="hover:text-red-500 transition duration-300">
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
          <button className="hover:text-red-500 transition duration-300">
            <CiLogin />
          </button>
        </Link>
      )}
    </div>
  );
};

export default NavbarBottom;
