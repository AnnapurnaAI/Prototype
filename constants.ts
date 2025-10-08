
import type { NutrientGoals, Recipe } from './types';

export const DEFAULT_NUTRIENT_GOALS: NutrientGoals = {
  calories: 2000,
  protein: 100,
  carbs: 250,
  fat: 70,
  water: 3000, // 3 Liters
};

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'High-Protein Paneer Tikka',
    imageUrl: 'https://picsum.photos/seed/paneer/400/300',
    tags: ['High Protein', 'Vegetarian', 'Quick'],
    ingredients: [
      '200g Paneer, cubed',
      '1 cup Thick Yogurt',
      '1 tbsp Ginger-Garlic Paste',
      '1 tsp Turmeric Powder',
      '1 tsp Red Chili Powder',
      '1 tbsp Lemon Juice',
      'Salt to taste',
      '1 Capsicum, cubed',
      '1 Onion, cubed'
    ],
    steps: [
      'Mix yogurt and all spices in a bowl.',
      'Add paneer, capsicum, and onion cubes. Marinate for 30 minutes.',
      'Arrange on skewers.',
      'Grill in a preheated oven or on a pan until golden brown.',
      'Serve hot with mint chutney.'
    ]
  },
  {
    id: '2',
    title: 'Iron-Rich Spinach Dal',
    imageUrl: 'https://picsum.photos/seed/dal/400/300',
    tags: ['Rich in Iron', 'Vegan', 'Healthy'],
    ingredients: [
      '1 cup Toor Dal (pigeon peas)',
      '2 cups chopped Spinach',
      '1 Onion, finely chopped',
      '1 Tomato, finely chopped',
      '2 cloves Garlic, minced',
      '1 tsp Cumin Seeds',
      '1/2 tsp Turmeric Powder',
      'Salt to taste'
    ],
    steps: [
      'Pressure cook dal with turmeric and salt until soft.',
      'In a pan, heat oil, add cumin seeds, garlic, and onion. Sauté until golden.',
      'Add tomato and cook until soft.',
      'Add spinach and cook until wilted.',
      'Pour the tempering over the cooked dal and mix well.',
      'Simmer for 5 minutes and serve.'
    ]
  },
    {
    id: '3',
    title: 'Sprouted Moong Salad',
    imageUrl: 'https://picsum.photos/seed/salad/400/300',
    tags: ['Low Calorie', 'High Fiber', 'Vegan'],
    ingredients: [
      '2 cups Sprouted Moong Beans',
      '1 Onion, finely chopped',
      '1 Tomato, finely chopped',
      '1/2 Cucumber, chopped',
      '1 Green Chili, finely chopped',
      'Coriander leaves, chopped',
      '1 tbsp Lemon Juice',
      'Chaat Masala to taste',
      'Salt to taste'
    ],
    steps: [
        'In a large bowl, combine sprouted moong beans, onion, tomato, cucumber, and green chili.',
        'Add chopped coriander leaves.',
        'Drizzle with lemon juice.',
        'Sprinkle chaat masala and salt.',
        'Toss everything well to combine.',
        'Serve immediately for a refreshing and healthy salad.'
    ]
  },
  {
    id: '4',
    title: 'Masala Oats Upma',
    imageUrl: 'https://picsum.photos/seed/oats/400/300',
    tags: ['Breakfast', 'Quick', 'Healthy'],
    ingredients: [
        '1 cup Rolled Oats',
        '1 Onion, finely chopped',
        '1 Carrot, grated',
        '1/4 cup Green Peas',
        '1 tsp Mustard Seeds',
        '1 tsp Urad Dal',
        'A few Curry Leaves',
        '1/2 tsp Turmeric Powder',
        '2 cups Water',
        'Salt to taste'
    ],
    steps: [
        'Dry roast the oats for 2-3 minutes and set aside.',
        'Heat oil in a pan, add mustard seeds, urad dal, and curry leaves.',
        'Add chopped onion and sauté until translucent.',
        'Add carrot, peas, and turmeric powder. Cook for 2 minutes.',
        'Pour in water and bring to a boil. Add salt.',
        'Slowly add the roasted oats while stirring continuously.',
        'Cook for 3-4 minutes until the oats are cooked and the mixture thickens.',
        'Garnish with coriander and serve hot.'
    ]
  }
];
