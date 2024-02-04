import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Categories from "../components/shared/Categories";


const VendorPage = () => {
  const { vendorId } = useParams();
  const [vendorData, setVendorData] = useState({});

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/products/vendor-page/${vendorId}`
        );
        setVendorData(response.data.formattedData);
      } catch (error) {
        console.log("failed to get restaurant data");
      }
    };
    fetchVendorData();
  }, [vendorId]);

  return (
    <>
      <div>
        {vendorData.address && (
          <figure className="relative h-96 w-full container mx-auto mt-20">
            <img
              className="h-full w-full rounded-xl object-cover object-center"
              src={vendorData.backgroundImage}
              alt={vendorData.name}
            />
            <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
              <div>
                <Typography
                  variant="h5"
                  color="blue-gray "
                  className="flex items-center justify-between"
                >
                  <img
                    src={vendorData.logoImage}
                    alt={vendorData.name}
                    className="w-16 mr-5 rounded-full"
                  />
                  <div className="flex flex-col">
                    <Typography variant="h5">{vendorData.name}</Typography>
                    <Typography color="gray">
                      <IoLocation />
                      {`${vendorData.address.street}, ${vendorData.address.city}`}
                    </Typography>
                  </div>
                </Typography>
              </div>
              <div className="flex flex-col justify-center">
                {vendorData.workingHours &&
                  vendorData.workingHours.length > 0 &&
                  vendorData.workingHours.map((day) => (
                    <Typography key={day.day} color="gray">
                      {`${day.day}: ${day.openingHours}${day.openingState} - ${day.closingHours}${day.closingState}`}
                    </Typography>
                  ))}
              </div>
            </figcaption>
          </figure>
        )}
      </div>

      <Categories vendorId={vendorId} />
    </>
  );
};

export default VendorPage;
