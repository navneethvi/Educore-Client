import CategoryIcon from '@mui/icons-material/Category';
import React from 'react';

const CategoryCard: React.FC = () => {
  return (
    <div className="category-card-container border-2 shadow-sm h-auto rounded-lg text-center p-4 hover:shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105">
      <CategoryIcon className="text-gray-700 text-lg mt-4" />
      <h1 className="font-reem-kufi text-2xl m-4 text-gray-600">Category Name</h1>
    </div>
  );
}

export default CategoryCard;
