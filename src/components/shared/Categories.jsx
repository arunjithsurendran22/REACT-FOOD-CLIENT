import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../authorization/api";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";


const Categories = ({ vendorId }) => {

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(
          `http://localhost:3000/api/v1/user/products/add-on-category/get-unique-category/list/${vendorId}`
        );
        setCategories(categoriesResponse.data.filteredCategories);

        if (categoryId) {
          const productsResponse = await axios.get(
            `http://localhost:3000/api/v1/user/products/add-on-product/get/product-list/${vendorId}/${categoryId}`
          );
          setProducts(productsResponse.data.products);
          setShowAllProducts(false);
        } else {
          const allProductsResponse = await axios.get(
            `http://localhost:3000/api/v1/user/products/add-on-product/get/product-all-list/${vendorId}`
          );
          setAllProducts(allProductsResponse.data);
          setShowAllProducts(true);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, [vendorId, categoryId]);

  const handleCategoryId = (Id) => {
    setCategoryId(Id);
    setShowAllProducts(true);
  };

  const handleAddToCart = async (productId) => {
    await api.post(`/products/add-to-cart/create/${productId}/${vendorId}`);

  };

  return (
    <div className="container mx-auto p-4">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={categories.length}
        visibleSlides={6}
      >
        <Slider>
          {categories.map((category, index) => (
            <Slide index={index} key={category._id}>
              <button onClick={() => handleCategoryId(category._id)}>
                <img
                  src={category.image}
                  alt={category.title}
                  className="cursor-pointer w-40"
                />
              </button>
            </Slide>
          ))}
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>

      {showAllProducts ? (
        <div className="flex flex-wrap -mx-4 mt-4">
          {allProducts.map((product) => (
            <div
              key={product._id}
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8"
            >
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <img
                  src={product.image}
                  alt={product.productTitle}
                  className="w-full h-32 object-cover mb-4 rounded-md"
                />
                <p className="text-lg font-bold text-gray-800 mb-2">
                  {product.productTitle}
                </p>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-blue-500 font-bold">${product.price}</p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none mt-4"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap -mx-4 mt-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-lg transition duration-300">
                <img
                  src={product.image}
                  alt={product.productTitle}
                  className="w-full h-32 object-cover mb-4 rounded-md"
                />
                <p className="text-lg font-bold text-gray-800 mb-2">
                  {product.productTitle}
                </p>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-blue-500 font-bold">${product.price}</p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none mt-4"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
