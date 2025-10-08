
import React, { useContext, useMemo } from 'react';
import { DailyLogContext, UserContext } from '../App';
import NutrientProgress from '../components/NutrientProgress';
import WaterTracker from '../components/WaterTracker';
import MealLogger from '../components/MealLogger';
import { DEFAULT_NUTRIENT_GOALS } from '../constants';
import type { MealLog, NutrientInfo } from '../types';

const DashboardPage: React.FC = () => {
    const { userProfile } = useContext(UserContext);
    const { dailyLog, setDailyLog } = useContext(DailyLogContext);

    const nutrientTotals = useMemo<NutrientInfo>(() => {
        return dailyLog.meals.reduce((totals, meal) => ({
            calories: totals.calories + meal.calories,
            protein: totals.protein + meal.protein,
            carbs: totals.carbs + meal.carbs,
            fat: totals.fat + meal.fat,
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
    }, [dailyLog.meals]);

    const handleAddMeal = (meal: MealLog) => {
        setDailyLog(prevLog => ({
            ...prevLog,
            meals: [...prevLog.meals, meal],
        }));
    };

    const handleAddWater = (amount: number) => {
        setDailyLog(prevLog => ({
            ...prevLog,
            waterIntake: prevLog.waterIntake + amount,
        }));
    };
    
    return (
        <div className="w-full p-4 md:p-6 lg:p-8">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Hi, {userProfile.name}!</h1>
                <p className="text-gray-600">Here's your nutritional summary for today.</p>
            </header>
            
            <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-4 rounded-xl shadow-md">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Macronutrients</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                           <NutrientProgress name="Calories" value={nutrientTotals.calories} goal={DEFAULT_NUTRIENT_GOALS.calories} unit="kcal" color="#fb923c" />
                           <NutrientProgress name="Protein" value={nutrientTotals.protein} goal={DEFAULT_NUTRIENT_GOALS.protein} unit="g" color="#34d399" />
                           <NutrientProgress name="Carbs" value={nutrientTotals.carbs} goal={DEFAULT_NUTRIENT_GOALS.carbs} unit="g" color="#60a5fa" />
                           <NutrientProgress name="Fat" value={nutrientTotals.fat} goal={DEFAULT_NUTRIENT_GOALS.fat} unit="g" color="#f87171" />
                        </div>
                    </div>
                    <WaterTracker 
                        waterIntake={dailyLog.waterIntake} 
                        waterGoal={DEFAULT_NUTRIENT_GOALS.water}
                        onAddWater={handleAddWater}
                    />
                </div>
                <div className="lg:col-span-1">
                    <MealLogger mealLogs={dailyLog.meals} onAddMeal={handleAddMeal} />
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
