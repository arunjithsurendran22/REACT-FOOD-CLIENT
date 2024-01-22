import { GrHome } from "react-icons/gr";
import { BsCart3 } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";

export  const NAVEBAR_LINKS = [
  {
    key: "home",
    label: "Home",
    path: "/",
    icon: <GrHome />,
  },
  {
    key: "search",
    label: "Search",
    path: "/search",
    icon: <IoIosSearch />,
  },
  {
    key: "cart",
    label: "Cart",
    path: "/cart",
    icon: <BsCart3 />,
  },
  {
    key: "profile",
    label: "Profile",
    path: "/profile",
    icon: <BsCart3 />,
  },
];
