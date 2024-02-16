import { useState, useEffect } from "react";
import api from "../authorization/api";
import { Rating } from "@material-tailwind/react";
import { toast } from "react";

const RatingStar = ({ value, onClick, userRating }) => {
  return (
    <span
      className="rating-star"
      onClick={() => onClick(value)}
      style={{ color: userRating >= value ? 'yellow' : 'gray', cursor: 'pointer' }}
    >
      &#9733; {/* Unicode for a star */}
    </span>
  );
};


const ProductRating = ({ vendorId, productId }) => {
  const [rating, setRating] = useState(null); // Initialize with null
  const [averageRating, setAverageRating] = useState(null);
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    const fetchProductRating = async () => {
      try {
        // Fetch average rating for the product
        const response = await api.get(
          `/products/product-rating/get/${vendorId}/${productId}`
        );
        setAverageRating(response.data.averageRating);
          console.log(response.data);
        // Fetch user's rating for the product
        const userRatingResponse = await api.get(
          `/product-rating/get/${vendorId}/${productId}`
        );
        setUserRating(userRatingResponse.data.userRating);
        setRating(userRatingResponse.data.userRating); // Set rating to user's previous rating
      } catch (error) {
        console.error("Error fetching product rating:", error);
        toast.error("Failed to fetch product rating");
      }
    };

    fetchProductRating();
  }, [vendorId, productId]);

  const handleRatingChange = async (newRating) => {
    setRating(newRating);
    console.log(newRating);
    try {
      // Post user's rating for the product
      await api.post(`/products/product-rating/${vendorId}/${productId}`, {
        rating: newRating,
      });
      toast.success("Product rating submitted successfully");

      // Update user's rating after posting
      setUserRating(newRating);
    } catch (error) {
      console.error("Error submitting product rating:", error);
      toast.error("Failed to submit product rating");
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <RatingStar
          key={value}
          value={value}
          onClick={handleRatingChange}
          userRating={userRating}
        />
      ))}
    </div>
  );
};

export default ProductRating;
