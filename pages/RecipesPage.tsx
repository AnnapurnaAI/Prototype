
import React, { useState } from 'react';
import { MOCK_RECIPES } from '../constants';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import type { Recipe } from '../types';

const RecipesPage: React.FC = () => {
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    return (
        <div className="w-full p-4 md:p-6 lg:p-8">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Recipe Suggestions</h1>
                <p className="text-gray-600">Discover healthy and delicious Indian recipes.</p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {MOCK_RECIPES.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
                ))}
            </div>
            <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
        </div>
    );
};

export default RecipesPage;
