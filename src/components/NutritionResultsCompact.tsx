import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IngredientsList } from './IngredientsList';
import { DishType } from '../types';

interface NutritionResultsCompactProps {
  dish: DishType;
  index: number;
}

export const NutritionResultsCompact: React.FC<NutritionResultsCompactProps> = ({ 
  dish, 
  index 
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const { 
    dish: dishName, 
    category, 
    serving_weight_g, 
    nutrition_per_serving, 
    ingredients_extracted,
    logs
  } = dish;

  return (
    <motion.div 
      className="card border border-gray-200 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <h4 className="text-lg font-medium text-gray-800">{dishName}</h4>
          <p className="text-sm text-gray-500">
            {category} · {serving_weight_g}g per serving
          </p>
        </div>
        
        <div className="flex items-center">
          <div className="bg-primary-50 px-3 py-1 rounded-full text-primary-800 font-semibold text-sm mr-3">
            {Math.round(nutrition_per_serving.energy_kcal)} kcal
          </div>
          {expanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-md font-medium text-gray-700 mb-3">Ingredients</h5>
                  <IngredientsList 
                    ingredients={ingredients_extracted}
                    matched={logs.filter(log => 
                      !log.includes('No nutritional match found')).length}
                    unmatched={logs.filter(log => 
                      log.includes('No nutritional match found')).length}
                  />
                </div>
                
                <div>
                  <h5 className="text-md font-medium text-gray-700 mb-3">Nutrition Facts</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-sm">Calories</span>
                      <span className="text-sm font-medium">{nutrition_per_serving.energy_kcal.toFixed(1)} kcal</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-sm">Carbohydrates</span>
                      <span className="text-sm font-medium">{nutrition_per_serving.carb_g.toFixed(1)}g</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-sm">Protein</span>
                      <span className="text-sm font-medium">{nutrition_per_serving.protein_g.toFixed(1)}g</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-sm">Fat</span>
                      <span className="text-sm font-medium">{nutrition_per_serving.fat_g.toFixed(1)}g</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-sm">Sugar</span>
                      <span className="text-sm font-medium">{nutrition_per_serving.freesugar_g.toFixed(1)}g</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-sm">Fiber</span>
                      <span className="text-sm font-medium">{nutrition_per_serving.fibre_g.toFixed(1)}g</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h5 className="text-md font-medium text-gray-700 mb-2">Analysis Logs</h5>
                <div className="bg-gray-50 p-2 rounded-md">
                  <ul className="space-y-1 text-sm">
                    {logs.map((log, i) => (
                      <li 
                        key={i} 
                        className={`py-1 px-2 rounded ${
                          log.includes('⚠️') ? 'text-amber-800 bg-amber-50' : ''
                        }`}
                      >
                        {log}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};