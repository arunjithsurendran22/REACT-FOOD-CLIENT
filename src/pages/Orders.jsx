import { useState, useEffect } from "react";
import api from "../components/authorization/api";

const Orders = () => {
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response=await api.get("")
      } catch (error) {
        console.log("failed to fetch order details");
      }
    };
  });

  return (
    <div
      className="flex justify-center w-3/6 h-96 absolute bottom-28 left-1/3"
      style={{ border: "2px solid red" }}
    ></div>
  );
};

export default Orders;
