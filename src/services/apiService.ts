import axios from 'axios';
import { DishType } from '../types';

// API base URL - points to our Python backend
const API_BASE_URL = 'https://back-smart-production.up.railway.app';

/**
 * Analyze a single dish by name
 */
export const analyzeDishesByName = async (dishName: string): Promise<DishType> => {
  try {
const response = await axios.post(`${API_BASE_URL}/analyze-dish`, {
  dish_name: dishName, // ✅ correct key
});
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error('Error analyzing dish:', error);
    throw error;
  }
};

/**
 * Process JSON data with multiple dishes
 */
export const analyzeDishesByJson = async (jsonData: DishType[]): Promise<DishType[]> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze-json`, {
      entries: jsonData, // ✅ correct key for FastAPI
    });
    return response.data;
  } catch (error) {
    console.error('Error processing JSON data:', error);
    throw error;
  }
};
