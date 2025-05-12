export interface NutritionType {
  energy_kj: number;
  energy_kcal: number;
  carb_g: number;
  protein_g: number;
  fat_g: number;
  freesugar_g: number;
  fibre_g: number;
}

export interface DishType {
  dish: string;
  ingredients_extracted: string[];
  logs: string[];
  category: string;
  serving_weight_g: number;
  nutrition_per_serving: NutritionType;
}

export interface MacroBreakdown {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface FoodDataItem {
  food_name: string;
  energy_kj: string;
  energy_kcal: string;
  carb_g: string;
  protein_g: string;
  fat_g: string;
  freesugar_g: string;
  fibre_g: string;
}