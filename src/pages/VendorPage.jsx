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
import api from "../components/authorization/api";

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

  const handleClick = async (productId, vendorId) => {
    await api.post(`/products/add-to-cart/create/${productId}/${vendorId}`);
    console.log(productId);
    console.log(vendorId);
  };

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
      <div className="container mx-auto mt-20 ">
        {vendorData.products && vendorData.products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {vendorData.products.map((product) => (
              <Card
                key={product._id}
                className="w-80 shadow-lg border border-gray-400"
              >
                <CardHeader shadow={false} floated={false} className="h-72">
                  <img
                    src={product.image}
                    alt={product.productTitle}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                      {product.productTitle}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                      ₹{product.price.toFixed(2)}
                    </Typography>
                  </div>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal opacity-75"
                  >
                    {product.description}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-300 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    onClick={() =>
                      handleClick(product._id, vendorData.vendorId)
                    }
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default VendorPage;
