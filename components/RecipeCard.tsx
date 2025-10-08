
import React from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
      onClick={onClick}
    >
      <img className="h-48 w-full object-cover" src={recipe.imageUrl} alt={recipe.title} />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{recipe.title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <span key={tag} className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
