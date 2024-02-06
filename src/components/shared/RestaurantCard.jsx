import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../authorization/api";

export function RestaurantCard() {
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState([]);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await api.get("/products/vendor-card/get");
        setVendorData(response.data);
      } catch (error) {
        console.log("failed to fetch vendor data");
        toast.error("failed to fetch vendor data");
      }
    };
    fetchVendorData();
  }, []);

  const handleClick = (vendorId) => {
    navigate(`/vendor-page/${vendorId}`);
  };

  return (
    <>
      <div>
        {vendorData.map((vendor) => (
          <Card
            key={vendor.vendorId}
            className="w-80 h-96 overflow-hidden shadow-lg border border-gray-400 mb-10 cursor-pointer"
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 rounded-none"
            >
              <img
                src={vendor.backgroundImage}
                alt={vendor.name}
                onClick={() => handleClick(vendor.vendorId)}
              />
            </CardHeader>
            <CardBody>
              <div>
                {/* Move the div outside Typography */}
                <Typography variant="h4" color="blue-gray">
                  {vendor.name}
                </Typography>
              </div>
              <Typography
                variant="lead"
                color="gray"
                className="mt-3 font-normal"
              >
                {vendor.address && (
                  <div>
                    {vendor.address.street}, {vendor.address.city}
                  </div>
                )}
              </Typography>
            </CardBody>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center -space-x-3">
                {vendor.logoImage && (
                  <Tooltip content={vendor.name}>
                    <Avatar
                      size="xl"
                      variant="circular"
                      alt={vendor.name}
                      src={vendor.logoImage}
                      className="border-2 border-white hover:z-10"
                    />
                  </Tooltip>
                )}
              </div>
              {vendor.workingHours && vendor.workingHours.length > 0 && (
                <Typography className="font-normal">
                  {vendor.workingHours[0].day}{" "}
                  {vendor.workingHours[0].openingHours} -{" "}
                  {vendor.workingHours[0].closingHours}
                </Typography>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
