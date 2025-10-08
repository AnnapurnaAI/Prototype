
import React from 'react';

interface WaterTrackerProps {
  waterIntake: number;
  waterGoal: number;
  onAddWater: (amount: number) => void;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ waterIntake, waterGoal, onAddWater }) => {
  const progress = waterGoal > 0 ? (waterIntake / waterGoal) * 100 : 0;
  const intakeLiters = (waterIntake / 1000).toFixed(2);
  const goalLiters = (waterGoal / 1000).toFixed(1);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
        <span className="text-xl mr-2">💧</span> Water Intake
      </h3>
      <div className="relative w-full bg-gray-200 rounded-full h-6">
        <div
          className="bg-blue-400 h-6 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
         <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-blue-900">
           {intakeLiters}L / {goalLiters}L
        </span>
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => onAddWater(250)}
          className="bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors"
        >
          +1 Glass (250ml)
        </button>
        <button
          onClick={() => onAddWater(1000)}
          className="bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors"
        >
          +1 Bottle (1L)
        </button>
      </div>
    </div>
  );
};

export default WaterTracker;
