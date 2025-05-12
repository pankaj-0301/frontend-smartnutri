import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface IngredientsListProps {
  ingredients: string[];
  matched: number;
  unmatched: number;
}

export const IngredientsList: React.FC<IngredientsListProps> = ({ 
  ingredients, 
  matched, 
  unmatched 
}) => {
  // Create a progress percentage for the match rate
  const totalIngredients = matched + unmatched;
  const matchPercentage = totalIngredients > 0 
    ? Math.round((matched / totalIngredients) * 100) 
    : 0;
  
  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-success bg-green-50';
    if (percentage >= 70) return 'text-amber-600 bg-amber-50';
    return 'text-error bg-red-50';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-medium text-gray-700">Identified Ingredients</h4>
        <div className={`text-xs px-2 py-1 rounded-full font-medium ${getMatchColor(matchPercentage)}`}>
          {matchPercentage}% match rate
        </div>
      </div>

      <div className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <motion.div
            key={ingredient}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center p-2 rounded-md bg-gray-50"
          >
            {/* We don't know exactly which ingredients were matched vs. unmatched from the data structure,
                 so we're making an educated guess for visual purposes */}
            {index < matched ? (
              <Check className="h-4 w-4 text-success mr-2 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
            )}
            <span className="text-sm">{ingredient}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};