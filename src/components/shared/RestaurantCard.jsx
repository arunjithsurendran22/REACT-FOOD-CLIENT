import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../authorization/api";
import "./styles.css";

const RestaurantCard = () => {
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await api.get("/products/vendor-card/get");
        setVendorData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch vendor data:", error);
        toast.error("Failed to fetch vendor data");
        setLoading(false);
      }
    };
    fetchVendorData();
  }, []);

  const handleClick = (vendorId) => {
    navigate(`/vendor-page/${vendorId}`);
  };

  return (
    <div className="container mx-auto  sm:mt-10">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 mx-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-10 pb-20 ">
          {vendorData.map((vendor) => (
            <div
              key={vendor.vendorId}
              onClick={() => handleClick(vendor.vendorId)}
              className="cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg  "
            >
              <div className="bg-white shadow-lg rounded-lg overflow-hidden md:h-72 card-height">
                <img
                  src={vendor.backgroundImage}
                  alt={vendor.name}
                  className="w-full h-40 object-cover object-center"
                />
                <div className="p-4 h-36">
                  <h6 className="text-gray-900 font-bold  text-xs md:text-lg mb-2 ">
                    {vendor.name}
                  </h6>
                  <p className="text-gray-600 text-xs mb-2 md:text-md restaurant">
                    {vendor.address.street}, {vendor.address.state}
                  </p>
                  <p className="text-gray-600  md:text-md mb-2 ">
                    {vendor.workingHours.map((hour) => (
                      <span key={hour.day} className="time md:text-md">
                        {hour.day}: {hour.openingHours} {hour.openingState} -{" "}
                        {hour.closingHours} {hour.closingState}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantCard;
