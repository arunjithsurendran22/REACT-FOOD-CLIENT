import React, { useState, useEffect } from "react";
import api from "../components/authorization/api";

const Orders = () => {
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/products/order-list/get");
        setOrderDetails(response.data.userOrders);
      } catch (error) {
        console.log("failed to fetch order details");
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {orderDetails.map((order) => (
        <div
          key={order._id}
          className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden m-4 border border-gray-100 p-2"
        >
          <div className="flex justify-between">
            <img
              className="w-16"
              src={order.cartItems[0].image}
              alt={order.cartItems[0].productTitle}
            />
            <p>{order.status}</p>
          </div>

          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              Order ID: {order.orderId}
            </div>
            <p className="text-gray-700 text-base">
              Total Amount: {order.total}
            </p>
            <p className="text-gray-700 text-base">Items:</p>
            <ul>
              {order.cartItems.map((item, index) => (
                <li key={index} className="text-gray-700 text-base">
                  {item.productTitle} - Quantity: {item.quantity} - Price:{" "}
                  {item.price}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 text-base">
              Created At: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
