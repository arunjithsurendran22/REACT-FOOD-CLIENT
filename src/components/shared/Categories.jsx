import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../authorization/api";

const Categories = ({ vendorId }) => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllproducts] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState(5);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/products/add-on-category/get/list"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        toast.error("Failed to fetch categories");
      }
    };

    const fetchProductByCategory = async () => {
      try {
        if (categoryId) {
          const response = await axios.get(
            `http://localhost:3000/api/v1/user/products/add-on-product/get/product-list/${vendorId}/${categoryId}`
          );
          setProducts(response.data.products);
          setShowAllProducts(false);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
        toast.error("Failed to fetch products");
      }
    };

    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/products/add-on-product/get/product-all-list/${vendorId}`
        );
        setAllproducts(response.data);
        setShowAllProducts(true); // Set the flag to true initially
      } catch (error) {
        console.log("Failed to fetch all products");
      }
    };

    fetchCategories();
    fetchProductByCategory();
    fetchAllProducts();
  }, [vendorId, categoryId]);

  const handleCategoryId = (Id) => {
    setCategoryId(Id);
    setShowAllProducts(true); // Set the flag to true when a category is clicked
  };

  const handleCategoryChange = (direction) => {
    if (direction === "next") {
      if (currentCategoryIndex + visibleCategories < categories.length) {
        setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
      }
    } else if (direction === "prev") {
      if (currentCategoryIndex > 0) {
        setCurrentCategoryIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  const visibleCategoryList = categories.slice(
    currentCategoryIndex,
    currentCategoryIndex + visibleCategories
  );

  const handleAddToCart = async (productId) => {
    await api.post(`/products/add-to-cart/create/${productId}/${vendorId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap -mx-4">
        {visibleCategoryList.map((category) => (
          <div
            key={category._id}
            className="w-full md:w-1/5 lg:w-1/5 xl:w-1/5 px-4 mb-8"
          >
            <div className="p-6 rounded-full shadow-md hover:shadow-lg transition duration-300 flex flex-col">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-32 object-cover mb-4 rounded-full"
              />
              <button
                onClick={() => handleCategoryId(category._id)}
                className="text-lg font-bold text-gray-800 hover:text-blue-500 items-center mb-4"
              >
                {category.title}
              </button>
            </div>
          </div>
        ))}
      </div>
      {categories.length > visibleCategories && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleCategoryChange("prev")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            Previous
          </button>
          <button
            onClick={() => handleCategoryChange("next")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            Next
          </button>
        </div>
      )}
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
      )}
    </div>
  );
};

export default Categories;
