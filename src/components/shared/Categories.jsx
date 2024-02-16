import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
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
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { addToCart } from "../ReduxToolkit/cartReducer";
import "./styles.css"

const Categories = ({ vendorId }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await api.get(
          `/products/add-on-category/get-unique-category/list/${vendorId}`
        );
        setCategories(categoriesResponse.data.filteredCategories);

        if (categoryId) {
          const productsResponse = await api.get(
            `/products/add-on-product/get/product-list/${vendorId}/${categoryId}`
          );
          setProducts(productsResponse.data.products);
          setShowAllProducts(false);
        } else {
          const allProductsResponse = await api.get(
            `/products/add-on-product/get/product-all-list/${vendorId}`
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

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setVisibleSlides(4);
      } else if (screenWidth < 768) {
        setVisibleSlides(4);
      } else if (screenWidth < 1024) {
        setVisibleSlides(8);
      } else {
        setVisibleSlides(8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const handleNext = () => {
  //   setActiveIndex((prevIndex) =>
  //     prevIndex === categories.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const handleBack = () => {
  //   setActiveIndex((prevIndex) =>
  //     prevIndex === 0 ? categories.length - 1 : prevIndex - 1
  //   );
  // };

  const handleCategoryId = (Id) => {
    setCategoryId(Id);
    setShowAllProducts(true);
  };

  const handleAddToCart = async (productId) => {
    try{
     const response= await api.post(`/products/add-to-cart/create/${productId}/${vendorId}`);
      dispatch(addToCart({ _id: productId, quantity: 1 }));
      toast.success(response.data.message);
    }catch(error){
      console.log("failed to add cart");
      toast.error("failed to add product /please login")
    }
   
  };

  const handleSort = (sortType) => {
    let sortedProducts;
    if (sortBy === sortType) {
      // Toggle sorting direction if same sort type is clicked again
      sortedProducts = [...allProducts].reverse();
    } else {
      // Sort products based on the selected sort type
      sortedProducts = [...allProducts].sort((a, b) =>
        sortType === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    setAllProducts(sortedProducts);
    setSortBy(sortType);
  };

  return (
    <div className="container mx-auto p-4">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={110}
        totalSlides={categories.length}
        visibleSlides={visibleSlides}
        currentSlide={activeIndex}
      >
        <Slider>
          {categories.map((category, index) => (
            <Slide index={index} key={category._id}>
              <button onClick={() => handleCategoryId(category._id)}>
                <img
                  src={category.image}
                  alt={category.title}
                  className="cursor-pointer w-40 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                />
              </button>
            </Slide>
          ))}
        </Slider>
        {/* <ButtonBack onClick={handleBack}>Back</ButtonBack>
        <ButtonNext onClick={handleNext}>Next</ButtonNext> */}
      </CarouselProvider>
      <div className="flex justify-between mt-4">
        <button
          className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-3xl hover:bg-green-700 focus:outline-none"
          onClick={() => handleSort("lowToHigh")}
        >
          Low to High
          {sortBy === "lowToHigh" && <FaArrowUp className="ml-2" />}
        </button>
        <button
          className="flex items-center bg-gray-800  text-white px-4 py-2 rounded-3xl hover:bg-green-700 focus:outline-none"
          onClick={() => handleSort("highToLow")}
        >
          High to Low
          {sortBy === "highToLow" && <FaArrowDown className="ml-2" />}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mx-auto mb-20">
        {(showAllProducts ? allProducts : products).map((product) => (
          <div key={product._id} className="">
            <div className="bg-white h-80 md:h-96 rounded-lg  transform transition duration-300 hover:scale-105 hover:shadow-lg my-5 border border-gray-300">
              <img
                src={product.image}
                alt={product.productTitle}
                className="w-full h-36 md:h-52 object-fill  rounded-t-md "
              />
              <div className="px-2 h-24">
                <p className="text-xs md:text-md font-bold text-gray-800 mb-2 product-title">
                  {product.productTitle}
                </p>
                <p className="text-gray-600 mb-4 italic md:text-sm description">
                  {product.description}
                </p>
              </div>
              <div className="h-20 mx-4">
                <p className="text-gray-700 font-extrabold text-md">
                  ₹{product.price}
                </p>
                <button
                  className=" text-white  py-1  bg-green-300 rounded hover:bg-red-700 focus:outline-none mt-4 transition duration-300  w-full "
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
