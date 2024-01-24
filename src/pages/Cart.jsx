import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../components/authorization/api";
import Payment from "../components/shared/Payment";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await api.get("/products/cart-items/get/list");
        const { cart, total } = response.data;

        const cartItems = cart.products;
        const cartId = cart._id;
        setCartId(cartId);
        setCartData(cartItems);
        setTotal(total);
      } catch (error) {
        console.error(error, "Failed to fetch Cart Items");
        toast.error("Failed to fetch Cart Items");
      }
    };

    fetchCartData();
  }, []);

  const handleDelete = async (Id) => {
    try {
      const response = await api.delete(`/products/cart-items-delete/${Id}`);
      const { cartItem, total } = response.data;

      const items = cartItem.products;
      setCartData(items);
      setTotal(total);
      toast.success("Item removed from the cart");
    } catch (error) {
      console.error(error, "Failed to remove item from the cart");
      toast.error("Failed to remove item from the cart");
    }
  };

  const handleUpdateQuantity = async (Id, newQuantity) => {
    try {
      if (newQuantity >= 1) {
        const response = await api.put(`products/add-to-cart/update/${Id}`, {
          quantity: newQuantity,
        });

        const { cartItem, total } = response.data;

        if (cartItem && cartItem.products && Array.isArray(cartItem.products)) {
          setCartData(cartItem.products);
          setTotal(total);
        } else {
          console.error("Invalid cart data received", cartItem);
          toast.error("Failed to update quantity");
        }
      } else {
        console.error("cannot decrese the value");
      }
    } catch (error) {
      console.error(error, "Failed to update quantity");
      toast.error("Failed to update quantity");
    }
  };

  return (
    <div className="bg-gray-200">
      {/* Address and Payment Section */}
      <div className="md:flex">
        {/* On small devices (mobile-first), show Payment section above Cart section */}
        <div className="md:w-8/12 mx-2 mb-4 md:mb-0 bg-white p-4 rounded-md border border-gray-400 shadow-lg">
          <div className="mt-4">
            <Payment
              total={total}
              cartId={cartId}
              vendorId={cartData[0]?.vendorId}
            />
          </div>
        </div>

        {/* On small devices (mobile-first), show Cart section below Payment section */}
        <div className="md:w-4/12 mx-2 bg-white p-4 rounded-md border border-gray-300 shadow-lg">
          {cartData.length > 0 ? (
            <div className="space-y-4">
              {cartData.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-4 rounded-md border border-gray-300 shadow-md flex items-center space-x-4"
                >
                  <img
                    src={item.image}
                    alt={item.productTitle}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-lg font-semibold">{item.productTitle}</p>
                    <p>Price: ₹{item.price}</p>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity - 1)
                      }
                      className="text-blue-500 hover:underline border border-gray-500"
                    >
                      <GrFormSubtract />
                    </button>
                    {item.quantity}
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity + 1)
                      }
                      className="text-blue-500 hover:underline border border-gray-500"
                    >
                      <IoIosAdd />
                    </button>
                    <p>Total Price: ₹{item.totalPrice}</p>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:underline"
                    >
                      <IoCloseSharp />
                    </button>
                  </div>
                </div>
              ))}
              <p className="text-xl font-semibold mt-4">Total: ₹{total}</p>
            </div>
          ) : (
            <p className="text-xl">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
