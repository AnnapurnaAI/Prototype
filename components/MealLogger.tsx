
import React, { useState, useRef, useEffect } from 'react';
import type { MealLog } from '../types';
import { getNutrientInfoForMeal } from '../services/geminiService';

interface MealLoggerProps {
  mealLogs: MealLog[];
  onAddMeal: (meal: MealLog) => void;
}

const MealLogger: React.FC<MealLoggerProps> = ({ mealLogs, onAddMeal }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mealLogs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const nutrientInfo = await getNutrientInfoForMeal(input);
      const newMeal: MealLog = {
        id: new Date().toISOString(),
        name: input,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...nutrientInfo,
      };
      onAddMeal(newMeal);
      setInput('');
    } catch (err) {
      setError('Could not analyze meal. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col h-full max-h-[45vh] lg:max-h-[70vh]">
      <div className="p-4 border-b">
        <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <span className="text-xl mr-2">🍛</span> Meal Log
        </h3>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {mealLogs.length === 0 ? (
           <div className="text-center text-gray-500 pt-8">
            <p>Log your first meal below!</p>
            <p className="text-sm">e.g., "2 rotis and dal"</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mealLogs.map((meal) => (
              <div key={meal.id} className="flex flex-col items-end">
                <div className="bg-primary text-white p-3 rounded-lg rounded-br-none max-w-xs sm:max-w-sm">
                  <p className="font-bold capitalize">{meal.name}</p>
                  <p className="text-xs opacity-90">
                    {meal.calories} kcal, {meal.protein}g P, {meal.carbs}g C, {meal.fat}g F
                  </p>
                   <p className="text-right text-xs opacity-70 mt-1">{meal.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>
      <div className="p-4 border-t bg-gray-50 rounded-b-xl">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What did you eat?"
            className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? '...' : 'Log'}
          </button>
        </form>
         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default MealLogger;
