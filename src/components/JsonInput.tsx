import React, { useState } from 'react';
import { Code, AlertCircle, FileJson, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { analyzeDishesByJson } from '../services/apiService';
import { NutritionResultsCompact } from './NutritionResultsCompact';
import { DishType } from '../types';

export const JsonInput: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<DishType[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!jsonInput.trim()) {
    setError('Please enter JSON data');
    return;
  }

  setIsLoading(true);
  setError(null);
  
  try {
    // ✅ Parse the input string into a proper JS object
    const parsedData: DishType[] = JSON.parse(jsonInput);

    // ✅ Pass parsed data to API (not the raw string)
    const data = await analyzeDishesByJson(parsedData);
    setResults(data);
  } catch (err) {
    if (err instanceof SyntaxError) {
      setError('Invalid JSON format: ' + err.message);
    } else {
      setError('Error processing data. Please try again.');
    }
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};


  const sampleJson = `[
  {
    "dish": "Butter Chicken",
    "issues": []
  },
  {
    "dish": "Palak Paneer",
    "issues": ["No nutritional data for paneer"]
  }
]`;

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Batch Analysis</h2>
          <button 
            onClick={() => setJsonInput(sampleJson)}
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
          >
            <FileJson className="h-4 w-4 mr-1" />
            Load Sample
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute left-3 top-3">
              <Code className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              className="input-field pl-10 min-h-[200px] font-mono text-sm"
              placeholder='Enter JSON data for batch processing...'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
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
            className="btn-secondary w-full flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Processing JSON...
              </>
            ) : (
              'Process JSON'
            )}
          </button>
        </form>
      </div>

      {results.length > 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Results</h3>
          <div className="space-y-4">
            {results.map((result, index) => (
              <NutritionResultsCompact 
                key={index}
                dish={result}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};