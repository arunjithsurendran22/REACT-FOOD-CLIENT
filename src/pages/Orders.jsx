import { useState, useEffect } from "react";
import api from "../components/authorization/api";
import ProductRatingForm from "../components/shared/ProductRating"


const Orders = () => {
  const [orderDetails, setOrderDetails] = useState([]);

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
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 lg:gap-4 gap-4 mx-20 sm:mx-0 mb-20">
      {orderDetails.map((order) => (
        <div
          key={order._id}
          className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 relative border border-gray-300 "
        >
          <h3 className="text-sm font-light">{order.orderId}</h3>
          <div className="flex justify-between mb-4">
            <div className="text-sm text-gray-500 mt-3">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-500 mt-3">{order.status}</div>
          </div>

          <div className="products-list mt-4">
            {order.products.map((product) => (
              <div key={product._id} className="product-card mb-4">
                <div className="flex items-center ">
                  <img
                    src={product.image}
                    alt={product.productTitle}
                    className="w-16 h-16 object-cover mb-2 rounded-full shadow-md"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-500 mb-2 mx-6 product-title">
                      {product.productTitle}
                    </p>
                    <p className="text-green-700  font-bold mx-6">
                      Price ₹{product.price}
                    </p>
                  </div>
                </div>
                {order.status === "Delivered" && (
                  <ProductRatingForm
                    key={product._id}
                    productId={product.productId}
                    vendorId={product.vendorId}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-red-700 font-normal text-md italic mt-4">
            Total: ₹{order.totalAmount}
            {order.status !== "Delivered" && (
              <button
                onClick={() => handleCancelOrder(order.orderId)}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-red-900 focus:outline-none transform transition-transform w-full mt-5"
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
