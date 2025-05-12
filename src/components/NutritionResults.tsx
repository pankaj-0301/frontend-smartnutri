import React from 'react';
import { motion } from 'framer-motion';
import { NutritionChart } from './NutritionChart';
import { NutritionType, MacroBreakdown } from '../types';

interface NutritionResultsProps {
  nutrition: NutritionType;
  category: string;
  servingWeight: number;
}

export const NutritionResults: React.FC<NutritionResultsProps> = ({ 
  nutrition, 
  category,
  servingWeight 
}) => {
  // Calculate macronutrient breakdown for the chart
  const calculateMacroBreakdown = (): MacroBreakdown[] => {
    const carbs = nutrition.carb_g;
    const protein = nutrition.protein_g;
    const fat = nutrition.fat_g;
    const total = carbs + protein + fat;
    
    return [
      { name: 'Carbs', value: carbs, percentage: Math.round((carbs / total) * 100), color: '#3c7d63' },
      { name: 'Protein', value: protein, percentage: Math.round((protein / total) * 100), color: '#dc782f' },
      { name: 'Fat', value: fat, percentage: Math.round((fat / total) * 100), color: '#f97316' },
    ];
  };

  const macros = calculateMacroBreakdown();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-md font-medium text-gray-700">Per Serving Nutrition</h4>
          <p className="text-sm text-gray-500">
            {category} ({servingWeight}g per serving)
          </p>
        </div>
        <div className="bg-primary-50 px-3 py-1 rounded-full text-primary-800 font-semibold text-sm">
          {Math.round(nutrition.energy_kcal)} kcal
        </div>
      </div>
      
      <div className="h-[200px] w-full">
        <NutritionChart data={macros} />
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        {macros.map((macro, index) => (
          <motion.div
            key={macro.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 p-3 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{macro.name}</span>
              <span className="text-xs bg-white px-2 py-1 rounded-full" style={{ color: macro.color }}>
                {macro.percentage}%
              </span>
            </div>
            <p className="text-lg font-semibold mt-1">{macro.value.toFixed(1)}g</p>
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 p-3 rounded-lg"
        >
          <span className="text-sm font-medium">Sugar</span>
          <p className="text-lg font-semibold mt-1">{nutrition.freesugar_g.toFixed(1)}g</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 p-3 rounded-lg"
        >
          <span className="text-sm font-medium">Fiber</span>
          <p className="text-lg font-semibold mt-1">{nutrition.fibre_g.toFixed(1)}g</p>
        </motion.div>
      </div>
    </div>
  );
};