
import React from 'react';
import type { Recipe } from '../types';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img className="h-64 w-full object-cover rounded-t-xl" src={recipe.imageUrl} alt={recipe.title} />
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{recipe.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingredients</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {recipe.ingredients.map((ing, index) => <li key={index}>{ing}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Steps</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              {recipe.steps.map((step, index) => <li key={index}>{step}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
