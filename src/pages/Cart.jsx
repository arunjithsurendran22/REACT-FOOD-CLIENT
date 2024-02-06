import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../components/authorization/api";
import Payment from "../components/shared/Payment";
import {
  setCartItems,
  updateCartItemQuantity,
  removeCartItem,
} from "../components/ReduxToolkit/cartReducer";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const items = cartItems.map(item => item.vendorId);
const vendorId = items.length > 0 ? items[0] : null;
console.log(vendorId);


  useEffect(() => {
    const fetchCartItemsFromApi = async () => {
      try {
        const response = await api.get("/products/cart-items/get/list");
        dispatch(setCartItems(response.data.cart.products));
      } catch (error) {
        toast.error("Failed to get cart items");
        console.error("Failed to get cart items:", error);
      }
    };

    fetchCartItemsFromApi();
  }, [dispatch]);

  const handleUpdateQuantity = async (Id, newQuantity) => {
    try {
      await api.put(`/products/add-to-cart/update/${Id}`, {
        quantity: newQuantity,
      });
      dispatch(updateCartItemQuantity({ itemId: Id, newQuantity }));
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (Id) => {
    try {
      await api.delete(`/products/cart-items-delete/${Id}`);
      dispatch(removeCartItem(Id));
    } catch (error) {
      console.log("Failed to delete item");
    }
  };

  // Calculate the item total, delivery fee, platform fee, GST, and total to pay
  const itemTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = 40;
  const tip = 0;
  const platformFee = 5;
  const gstAndCharges = 72;

  const totalToPay =
    itemTotal + deliveryFee + tip + platformFee + gstAndCharges;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-xl mx-auto mt-10 p-4 bg-gray-100 rounded shadow-md">
      {/* Left Side - Address */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Delivery Address</h1>
        <Payment cartItem={cartItems} totalToPay={totalToPay} vendorId={vendorId}/>
      </div>

      {/* Right Side - Cart */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between bg-white p-4 mb-4 rounded shadow-md"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.productTitle}
                className="w-16 h-16 object-cover mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.productTitle}</h2>
                <p className="text-gray-500">Price: ₹{item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="text-xl font-bold">{item.quantity}</span>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2"
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-lg">₹{item.totalPrice.toFixed(2)}</p>
              <button
                className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => handleRemoveItem(item._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
        {cartItems.length === 0 && (
          <p className="text-center">Your cart is empty.</p>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Bill Details</h2>
          <div className="flex justify-between mb-2">
            <p>Item Total</p>
            <p>₹{itemTotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Delivery Fee | 3.0 kms</p>
            <p>₹{deliveryFee.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Delivery Tip</p>
            <p>₹{tip.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Platform Fee</p>
            <p>₹{platformFee.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>GST and Restaurant Charges</p>
            <p>₹{gstAndCharges.toFixed(2)}</p>
          </div>
          <hr className="my-4 border-t border-gray-300" />
          <div className="flex justify-between mt-4">
            <p className="text-xl font-bold">TO PAY</p>
            <p className="text-xl font-bold">₹ {totalToPay.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
