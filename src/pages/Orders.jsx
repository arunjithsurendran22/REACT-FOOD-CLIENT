import { useState, useEffect } from "react";
import api from "../components/authorization/api";
import { Rating } from "@material-tailwind/react";
import ProductRatingForm from "../components/shared/ProductRatingForm";

const Orders = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/products/order-list/get");
        setOrderDetails(response.data.userOrders);
      } catch (error) {
        console.log("Failed to fetch order details");
      }
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      await api.post(`/products/order-list/cancel-order/${orderId}`);
      const response = await api.get("/products/order-list/get");
      setOrderDetails(response.data.userOrders);
    } catch (error) {
      console.log("failed to handle cancel");
    }
  };

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 lg:gap-4 gap-4 mx-20 sm:mx-0">
      {orderDetails.map((order) => (
        <div
          key={order._id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 relative"
        >
          <h3 className="text-xl font-bold">{order.orderId}</h3>
          <div className="flex justify-between mb-4">
            <div className="text-sm text-gray-500 mt-3">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-500 mt-3">{order.status}</div>
          </div>

          <div className="products-list mt-4">
            {order.products.map((product) => (
              <div key={product._id} className="product-card mb-4">
                <img
                  src={product.image}
                  alt={product.productTitle}
                  className="w-16 h-16 object-cover mb-2 rounded-full shadow-md"
                />
                <p className="text-sm font-bold text-gray-800 mb-2">
                  {product.productTitle}
                </p>
                <p className="text-blue-500 font-bold">
                  Price: ₹{product.price}
                </p>
              </div>
            ))}
          </div>
          <p className="text-blue-500 font-bold text-xl mt-4">
            Grand Total: ₹{order.totalAmount}
            {order.status === "Delivered" ? (
              <ProductRatingForm
                userId={order.userId}
                productId={order.products.productId}
              />
            ) : (
              <button
                onClick={() => handleCancelOrder(order.orderId)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-900 focus:outline-none transform transition-transform w-full mt-5"
              >
                Cancel Order
              </button>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
