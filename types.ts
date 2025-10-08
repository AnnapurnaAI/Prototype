
export enum DietaryPreference {
  VEG = 'Vegetarian',
  NON_VEG = 'Non-Vegetarian',
  VEGAN = 'Vegan'
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  dietaryPreference: DietaryPreference;
}

export interface NutrientGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number; // in ml
}

export interface NutrientInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealLog extends NutrientInfo {
  id: string;
  name: string;
  timestamp: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  meals: MealLog[];
  waterIntake: number; // in ml
}

export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
}
