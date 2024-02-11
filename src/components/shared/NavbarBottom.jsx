import { FaHome } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const NavbarBottom = () => {
  return (
    <div className="fixed bottom-0 w-full h-16 navbar-bottom md:hidden flex justify-around text-3xl items-center border-t border-gray-200 bg-white shadow-md">
      <Link to="/" className="hover:text-red-500 transition duration-300">
        <button className="focus:outline-none">
          <FaHome />
        </button>
      </Link>
      <Link
        to="/"
        className="hover:text-red-500 transition duration-300"
      >
        <button className="focus:outline-none">
          <IoMdNotificationsOutline />
        </button>
      </Link>
      <Link
        to="/profile"
        className="hover:text-red-500 transition duration-300"
      >
        <button className="focus:outline-none">
          <MdOutlineAccountCircle />
        </button>
      </Link>
      <Link to="/cart" className="hover:text-red-500 transition duration-300 ">
        <button className="focus:outline-none">
          <TiShoppingCart />
        </button>
      </Link>
    </div>
  );
};

export default NavbarBottom;
