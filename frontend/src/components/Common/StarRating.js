import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  // Ensure rating is a number between 0 and 5
  const roundedRating = Math.round(rating * 2) / 2;
  const totalStars = 5;

  return (
    <div>
      {[...Array(totalStars)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <FaStar
            key={index}
            color={ratingValue <= roundedRating ? "#ffd700" : "#e4e5e9"}
            size={24}
          />
        );
      })}
      {/* Label next to stars */}
      <span style={{ marginLeft: '10px', verticalAlign: 'middle' }}>
        {roundedRating.toFixed(1)} / 5 stars
      </span>
    </div>
  );
};

export default StarRating;