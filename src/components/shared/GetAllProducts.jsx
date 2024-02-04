import axios from "axios";
import React, { useEffect, useState } from "react";

const GetAllProducts = ({ vendorId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/products/add-on-product/get/product-all-list/${vendorId}`
        );
        setProducts(response.data.product);
        console.log(response.data);
      } catch (error) {
        console.log("Failed to get all products");
      }
    };
    fetchAllProducts();
  }, [vendorId]);

  return (
    <div>
      {products && Array.isArray(products) && products.length > 0 && (
        <div>
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
                    onClick={() => handleAddToCart(product._id, product.vendorId)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllProducts;
