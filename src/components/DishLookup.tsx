import React, { useState } from 'react';
import { Search, AlertCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { analyzeDishesByName } from '../services/apiService';
import { NutritionResults } from './NutritionResults';
import { IngredientsList } from './IngredientsList';
import { DishType } from '../types';

export const DishLookup: React.FC = () => {
  const [dishName, setDishName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DishType | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dishName.trim()) {
      setError('Please enter a dish name');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const data = await analyzeDishesByName(dishName);
      setResult(data);
    } catch (err) {
      setError('Error analyzing dish. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate matched/unmatched counts safely
  const getIngredientCounts = (result: DishType) => {
const totalIngredients = result?.ingredients_extracted?.length || 0;
    const unmatchedCount = result.logs?.length || 0;
    return {
      matched: totalIngredients - unmatchedCount,
      unmatched: unmatchedCount
    };
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Dish Analysis</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              className="input-field pl-10"
              placeholder="Enter Indian dish name (e.g., Butter Chicken, Paneer Tikka)"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center text-error text-sm p-2 bg-red-50 rounded-md"
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </motion.div>
          )}
          
          <button 
            type="submit" 
            className="btn-primary w-full flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Calculate Nutrition'
            )}
          </button>
        </form>
      </div>

      {result && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🍽️ {result.dish}
            </h3>
            
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
              <div className="flex-1">
                <IngredientsList 
                  ingredients={result.ingredients_extracted}
                  {...getIngredientCounts(result)}
                />
              </div>
              
              <div className="flex-1">
                <NutritionResults
                  nutrition={result.nutrition_per_serving}
                  category={result.category}
                  servingWeight={result.serving_weight_g}
                />
              </div>
            </div>
          </div>
          
          {result.logs && result.logs.length > 0 && (
            <div className="card bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                📝 Analysis Logs
              </h3>
              <ul className="space-y-2">
                {result.logs.map((log, index) => (
                  <li 
                    key={index} 
                    className={`text-sm p-2 rounded-md ${
                      log.includes('⚠️') ? 'bg-amber-50 text-amber-800' : 'bg-gray-100'
                    }`}
                  >
                    {log}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};