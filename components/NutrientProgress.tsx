
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

interface NutrientProgressProps {
  value: number;
  goal: number;
  name: string;
  unit: string;
  color: string;
}

const NutrientProgress: React.FC<NutrientProgressProps> = ({ value, goal, name, unit, color }) => {
  const percentage = goal > 0 ? Math.min((value / goal) * 100, 100) : 0;
  const data = [
    { name: 'consumed', value: percentage },
    { name: 'remaining', value: 100 - percentage },
  ];
  const COLORS = [color, '#e5e7eb'];

  return (
    <div className="flex flex-col items-center justify-center text-center p-2">
      <div className="w-24 h-24 sm:w-28 sm:h-28">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="90%"
              startAngle={90}
              endAngle={450}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
               <Label
                  value={`${Math.round(value)}`}
                  position="center"
                  className="text-lg sm:text-xl font-bold fill-gray-700"
                  dy={-5}
                />
                <Label
                  value={unit}
                  position="center"
                  className="text-xs fill-gray-500"
                  dy={12}
                />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-sm font-semibold text-gray-800">{name}</p>
      <p className="text-xs text-gray-500">Goal: {goal} {unit}</p>
    </div>
  );
};

export default NutrientProgress;
