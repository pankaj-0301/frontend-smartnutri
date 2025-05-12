import { DishType } from '../types';

/**
 * Mock implementation of dish analysis by name
 */
export const mockAnalyzeDishesByName = (dishName: string): DishType => {
  // Here we'll provide realistic mock data based on the dish name
  const mockData: Record<string, DishType> = {
    'butter chicken': {
      dish: 'Butter Chicken',
      ingredients_extracted: [
        'Chicken, broiler, curry cut, flesh, raw (Gallus gallus domesticus)',
        'Onion, fresh, bulb, big (Allium cepa)',
        'Tomato, ripe, raw (Solanum lycopersicum)',
        'Butter, table, salted (bovine)',
        'Yogurt, curd, plain',
        'Cream (bovine), low fat, 25% fat'
      ],
      logs: [
        'Extracted ingredients using Gemini: ["Chicken, broiler, curry cut, flesh, raw (Gallus gallus domesticus)", "Onion, fresh, bulb, big (Allium cepa)", "Tomato, ripe, raw (Solanum lycopersicum)", "Butter, table, salted (bovine)", "Yogurt, curd, plain", "Cream (bovine), low fat, 25% fat"]',
        '⚠️ No nutritional match found for \'Garam masala\' - likely missing in DB or spelling variation.'
      ],
      category: 'Non - Veg Gravy',
      serving_weight_g: 150,
      nutrition_per_serving: {
        energy_kj: 905.25,
        energy_kcal: 216.45,
        carb_g: 6.75,
        protein_g: 24.30,
        fat_g: 11.85,
        freesugar_g: 3.15,
        fibre_g: 1.50
      }
    },
    'paneer tikka': {
      dish: 'Paneer Tikka',
      ingredients_extracted: [
        'Cottage cheese, paneer (buffalo)',
        'Yogurt, curd, plain',
        'Bell pepper, capsicum, green, whole (Capsicum annuum)',
        'Onion, fresh, bulb, big (Allium cepa)'
      ],
      logs: [
        'Extracted ingredients using Gemini: ["Cottage cheese, paneer (buffalo)", "Yogurt, curd, plain", "Bell pepper, capsicum, green, whole (Capsicum annuum)", "Onion, fresh, bulb, big (Allium cepa)"]'
      ],
      category: 'Veg Fry',
      serving_weight_g: 100,
      nutrition_per_serving: {
        energy_kj: 837.0,
        energy_kcal: 200.0,
        carb_g: 5.0,
        protein_g: 14.0,
        fat_g: 15.0,
        freesugar_g: 2.5,
        fibre_g: 1.0
      }
    },
    'palak paneer': {
      dish: 'Palak Paneer',
      ingredients_extracted: [
        'Spinach, palak, whole (Spinacia oleracea)',
        'Cottage cheese, paneer (buffalo)',
        'Onion, fresh, bulb, big (Allium cepa)',
        'Tomato, ripe, raw (Solanum lycopersicum)',
        'Cream (bovine), low fat, 25% fat'
      ],
      logs: [
        'Extracted ingredients using Gemini: ["Spinach, palak, whole (Spinacia oleracea)", "Cottage cheese, paneer (buffalo)", "Onion, fresh, bulb, big (Allium cepa)", "Tomato, ripe, raw (Solanum lycopersicum)", "Cream (bovine), low fat, 25% fat"]'
      ],
      category: 'Veg Gravy',
      serving_weight_g: 150,
      nutrition_per_serving: {
        energy_kj: 913.5,
        energy_kcal: 219.0,
        carb_g: 8.25,
        protein_g: 13.5,
        fat_g: 16.5,
        freesugar_g: 3.0,
        fibre_g: 3.75
      }
    },
    'dal makhani': {
      dish: 'Dal Makhani',
      ingredients_extracted: [
        'Black gram, whole, dried, raw (Vigna mungo)',
        'Kidney beans, whole, dried, raw, rajma (Phaseolus vulgaris)',
        'Onion, fresh, bulb, big (Allium cepa)',
        'Tomato, ripe, raw (Solanum lycopersicum)',
        'Butter, table, salted (bovine)',
        'Cream (bovine), low fat, 25% fat'
      ],
      logs: [
        'Extracted ingredients using Gemini: ["Black gram, whole, dried, raw (Vigna mungo)", "Kidney beans, whole, dried, raw, rajma (Phaseolus vulgaris)", "Onion, fresh, bulb, big (Allium cepa)", "Tomato, ripe, raw (Solanum lycopersicum)", "Butter, table, salted (bovine)", "Cream (bovine), low fat, 25% fat"]'
      ],
      category: 'Dals',
      serving_weight_g: 150,
      nutrition_per_serving: {
        energy_kj: 1057.5,
        energy_kcal: 252.0,
        carb_g: 27.0,
        protein_g: 13.5,
        fat_g: 10.5,
        freesugar_g: 3.0,
        fibre_g: 9.0
      }
    }
  };

  // Convert dish name to lowercase for case-insensitive lookup
  const normalizedDishName = dishName.toLowerCase();
  
  // Return matching dish data or default
  if (mockData[normalizedDishName]) {
    return mockData[normalizedDishName];
  }
  
  // Create a generic response for any dish not in our mock data
  return {
    dish: dishName,
    ingredients_extracted: [
      'Onion, fresh, bulb, big (Allium cepa)',
      'Tomato, ripe, raw (Solanum lycopersicum)',
      'Rice, raw, milled (Oryza sativa)',
      'Vegetable oil, refined (mixed vegetable oil)'
    ],
    logs: [
      `Extracted ingredients using Gemini: ["Onion, fresh, bulb, big (Allium cepa)", "Tomato, ripe, raw (Solanum lycopersicum)", "Rice, raw, milled (Oryza sativa)", "Vegetable oil, refined (mixed vegetable oil)"]`,
      '⚠️ Could not classify dish, defaulted to 100g serving.'
    ],
    category: 'Unknown',
    serving_weight_g: 100,
    nutrition_per_serving: {
      energy_kj: 753.0,
      energy_kcal: 180.0,
      carb_g: 30.0,
      protein_g: 4.0,
      fat_g: 5.0,
      freesugar_g: 2.0,
      fibre_g: 2.0
    }
  };
};

/**
 * Mock implementation of JSON batch processing
 */
export const mockAnalyzeDishesByJson = (jsonData: string): DishType[] => {
  try {
    const parsedData = JSON.parse(jsonData);
    
    if (!Array.isArray(parsedData)) {
      throw new Error('JSON data must be an array of dish objects');
    }
    
    return parsedData.map(item => {
      if (typeof item.dish === 'string') {
        // Generate mock response for each dish
        const result = mockAnalyzeDishesByName(item.dish);
        
        // Add any issues from the input JSON
        if (item.issues && Array.isArray(item.issues)) {
          item.issues.forEach(issue => {
            result.logs.push(`⚠️ Issue from input: ${issue}`);
          });
        }
        
        return result;
      } else {
        throw new Error('Each item must have a "dish" property');
      }
    });
  } catch (error) {
    throw error;
  }
};