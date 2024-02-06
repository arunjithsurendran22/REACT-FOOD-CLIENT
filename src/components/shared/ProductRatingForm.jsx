import React, { useState } from 'react';
import axios from 'axios';
import { Rating } from '@material-tailwind/react';

const ProductRatingForm = ({ productId, userId }) => {
  const [rating, setRating] = useState(1); 

  const handleRatingChange = async (newRating) => {
    setRating(newRating);

    try {
      const response = await axios.post(`/api/products/${productId}/rating`, { rating: newRating }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userId}`, // Add your authentication token here
        },
      });

      console.log('Product rated successfully. Average Rating:', response.data.averageRating);
      // You can update the UI or show a success message here
    } catch (error) {
      console.error('Failed to rate the product:', error.response?.data.message || 'Unknown error');
      // Handle error and show a proper error message to the user
    }
  };

  return (
    <div>
      <label htmlFor="rating">Rating:</label>
      <Rating
        id="rating"
        value={rating}
        onChange={handleRatingChange}
        size="large" 
        precision={1} 
      />
    </div>
  );
};

export default ProductRatingForm;
