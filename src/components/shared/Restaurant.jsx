import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/products/restaurant/get/list"
        );
        setRestaurants(response.data.restaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        // Handle error (e.g., show an error message to the user)
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-col-2 lg:grid-col-3 gap-16">
      {restaurants.map((restaurant) => (
        <Card key={restaurant._id} className="mt-6 w-96 shadow-lg border-2">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src={restaurant.backgroundImage}
              alt="card-image"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Restaurant Name 
            </Typography>
            <Typography>
              Description 
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button>Read More</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Restaurant;
