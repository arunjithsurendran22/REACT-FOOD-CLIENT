import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import api from "../authorization/api";


const CartMenuButton = () => {
    const [cartItems, setCartItems] = useState([]);
    
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get("/products/cart-items/get/list");
        setCartItems(response.data.cart.products);
      } catch (error) {
        console.error("Failed to get cart items:", error);
      }
    };

    fetchCartItems();
  }, []);


  return (
    <Menu>
      <MenuHandler>
        <Button className="bg-white text-black border border-gray-200 rounded-3xl w-24  shadow-none flex justify-between">
          <FaShoppingCart />
          <p>Cart</p>
        </Button>
      </MenuHandler>
      <MenuList className="max-h-72 w-2/12">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <MenuItem key={item._id} className="">
              <div className="flex justify-between">
                <img
                  src={item.image}
                  alt={item.productTitle}
                  className="w-16 rounded-md"
                />
                <p className="text-red-800">₹{item.totalPrice}</p>
              </div>
              <div>
                <p className="font-semibold">{item.productTitle}</p>
              </div>
            </MenuItem>
          ))
        ) : (
          <MenuItem>No items in the cart</MenuItem>
        )}
        <hr size="20" />

        <Link to="/cart">
          <button className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md w-full outline-none hover:outline-none">
            CHECK OUT
          </button>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default CartMenuButton;
