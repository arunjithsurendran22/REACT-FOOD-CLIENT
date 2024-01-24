import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import api from "../authorization/api";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/products/product-items/get/list"
        );
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error, "failed to fetch products items");
        toast.error("failed to fetch products items");
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const response = await api.post(
        `/products/add-to-cart/create/${productId}`
      );
      toast.success("Successfully item added to Cart");
    } catch (error) {
      console.log(error, "failed to add cart");
      toast.error("failed to add cart");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-16 mt-16">
      {products.map((item) => (
        <Card className="mt-6 w-96 shadow-lg border-2" key={item._id}>
          <CardHeader color="blue-gray" className="relative h-52 shadow-lg border-2 ">
            <img
              src={item.image}
              alt="card-image"
              className="w-full h-full object-fill "
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {item.productTitle}
            </Typography>
            <Typography>{item.description}</Typography>
            <Typography>₹ {item.price}</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={() => handleAddToCart(item._id)}>Buy Now</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Products;
