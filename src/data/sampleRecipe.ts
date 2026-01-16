import type { Recipe } from '../types/recipe';

// Sample recipe: Simple Scrambled Eggs
export const scrambledEggsRecipe: Recipe = {
  id: 'scrambled-eggs-1',
  name: 'Perfect Scrambled Eggs',
  description: 'Learn how to make creamy, fluffy scrambled eggs',
  totalTime: 180, // 3 minutes
  servings: 2,

  ingredients: [
    {
      id: 'eggs',
      name: 'Eggs',
      amount: '4 large',
      color: '#FFF8DC',
    },
    {
      id: 'butter',
      name: 'Butter',
      amount: '2 tbsp',
      color: '#FFE4B5',
    },
    {
      id: 'salt',
      name: 'Salt',
      amount: '1/4 tsp',
      color: '#F5F5F5',
    },
    {
      id: 'pepper',
      name: 'Black Pepper',
      amount: '1/8 tsp',
      color: '#2F2F2F',
    },
  ],

  cookware: [
    {
      id: 'pan-1',
      type: 'pan',
      name: 'Non-stick Pan',
      ingredients: [],
    },
  ],

  steps: [
    {
      id: 'step-1',
      startTime: 0,
      duration: 10,
      instruction: 'Place the non-stick pan on the front-left burner',
      actions: [
        {
          type: 'place-cookware',
          cookwareId: 'pan-1',
          burner: 'front-left',
        },
      ],
    },
    {
      id: 'step-2',
      startTime: 10,
      duration: 15,
      instruction: 'Turn the burner to medium-low heat',
      isImportant: true,
      actions: [
        {
          type: 'set-heat',
          burner: 'front-left',
          heatLevel: 'medium-low',
        },
      ],
    },
    {
      id: 'step-3',
      startTime: 25,
      duration: 15,
      instruction: 'Add butter to the pan and let it melt',
      actions: [
        {
          type: 'add-ingredient',
          cookwareId: 'pan-1',
          ingredientId: 'butter',
        },
      ],
    },
    {
      id: 'step-4',
      startTime: 40,
      duration: 10,
      instruction: 'Once butter is melted, add the beaten eggs',
      isImportant: true,
      actions: [
        {
          type: 'add-ingredient',
          cookwareId: 'pan-1',
          ingredientId: 'eggs',
        },
      ],
    },
    {
      id: 'step-5',
      startTime: 50,
      duration: 5,
      instruction: 'Add salt and pepper',
      actions: [
        {
          type: 'add-ingredient',
          cookwareId: 'pan-1',
          ingredientId: 'salt',
        },
        {
          type: 'add-ingredient',
          cookwareId: 'pan-1',
          ingredientId: 'pepper',
        },
      ],
    },
    {
      id: 'step-6',
      startTime: 55,
      duration: 60,
      instruction: 'Gently stir the eggs with a spatula, pushing them from the edges to the center. Continue stirring slowly.',
      isImportant: true,
      actions: [
        {
          type: 'stir',
          cookwareId: 'pan-1',
        },
      ],
    },
    {
      id: 'step-7',
      startTime: 115,
      duration: 45,
      instruction: 'Keep stirring gently until eggs are almost set but still slightly runny (they will continue cooking)',
      actions: [
        {
          type: 'stir',
          cookwareId: 'pan-1',
        },
      ],
    },
    {
      id: 'step-8',
      startTime: 160,
      duration: 5,
      instruction: 'Turn off the heat',
      isImportant: true,
      actions: [
        {
          type: 'set-heat',
          burner: 'front-left',
          heatLevel: 'off',
        },
      ],
    },
    {
      id: 'step-9',
      startTime: 165,
      duration: 15,
      instruction: 'Remove pan from burner and serve immediately. Enjoy your perfect scrambled eggs!',
      actions: [
        {
          type: 'remove-cookware',
          cookwareId: 'pan-1',
        },
      ],
    },
  ],
};

// Sample recipe: Simple Pasta
export const pastaRecipe: Recipe = {
  id: 'pasta-1',
  name: 'Simple Pasta with Sauce',
  description: 'Learn how to cook pasta and make a quick tomato sauce',
  totalTime: 420, // 7 minutes
  servings: 2,

  ingredients: [
    {
      id: 'pasta',
      name: 'Pasta',
      amount: '200g',
      color: '#F5DEB3',
    },
    {
      id: 'water',
      name: 'Water',
      amount: '1 liter',
      color: '#ADD8E6',
    },
    {
      id: 'salt-pasta',
      name: 'Salt',
      amount: '1 tbsp',
      color: '#F5F5F5',
    },
    {
      id: 'olive-oil',
      name: 'Olive Oil',
      amount: '2 tbsp',
      color: '#6B8E23',
    },
    {
      id: 'garlic',
      name: 'Garlic',
      amount: '3 cloves, minced',
      color: '#F5F5DC',
    },
    {
      id: 'tomatoes',
      name: 'Crushed Tomatoes',
      amount: '400g can',
      color: '#DC143C',
    },
  ],

  cookware: [
    {
      id: 'pot-1',
      type: 'pot',
      name: 'Large Pot',
      ingredients: [],
    },
    {
      id: 'pan-2',
      type: 'pan',
      name: 'Sauté Pan',
      ingredients: [],
    },
  ],

  steps: [
    // Boiling water for pasta
    {
      id: 'step-1',
      startTime: 0,
      duration: 10,
      instruction: 'Place the large pot on the back-left burner and add water',
      actions: [
        {
          type: 'place-cookware',
          cookwareId: 'pot-1',
          burner: 'back-left',
        },
        {
          type: 'add-ingredient',
          cookwareId: 'pot-1',
          ingredientId: 'water',
        },
      ],
    },
    {
      id: 'step-2',
      startTime: 10,
      duration: 120,
      instruction: 'Turn burner to high heat and bring water to a boil',
      isImportant: true,
      actions: [
        {
          type: 'set-heat',
          burner: 'back-left',
          heatLevel: 'high',
        },
      ],
    },
    {
      id: 'step-3',
      startTime: 130,
      duration: 10,
      instruction: 'Add salt to the boiling water',
      actions: [
        {
          type: 'add-ingredient',
          cookwareId: 'pot-1',
          ingredientId: 'salt-pasta',
        },
      ],
    },
    {
      id: 'step-4',
      startTime: 140,
      duration: 180,
      instruction: 'Add pasta and cook for 8-10 minutes, stirring occasionally',
      isImportant: true,
      actions: [
        {
          type: 'add-ingredient',
          cookwareId: 'pot-1',
          ingredientId: 'pasta',
        },
      ],
    },

    // Making sauce simultaneously
    {
      id: 'step-5',
      startTime: 140,
      duration: 10,
      instruction: 'While pasta cooks, place the sauté pan on front-right burner',
      actions: [
        {
          type: 'place-cookware',
          cookwareId: 'pan-2',
          burner: 'front-right',
        },
      ],
    },
    {
      id: 'step-6',
      startTime: 150,
      duration: 20,
      instruction: 'Turn front-right burner to medium heat and add olive oil',
      actions: [
        {
          type: 'set-heat',
          burner: 'front-right',
          heatLevel: 'medium',
        },
        {
          type: 'add-ingredient',
          cookwareId: 'pan-2',
          ingredientId: 'olive-oil',
        },
      ],
    },
    {
      id: 'step-7',
      startTime: 170,
      duration: 30,
      instruction: 'Add minced garlic and sauté until fragrant (30 seconds)',
      actions: [
        {
          type: 'add-ingredient',
          cookwareId: 'pan-2',
          ingredientId: 'garlic',
        },
      ],
    },
    {
      id: 'step-8',
      startTime: 200,
      duration: 120,
      instruction: 'Add crushed tomatoes and let simmer',
      actions: [
        {
          type: 'add-ingredient',
          cookwareId: 'pan-2',
          ingredientId: 'tomatoes',
        },
      ],
    },

    // Finishing
    {
      id: 'step-9',
      startTime: 320,
      duration: 10,
      instruction: 'Turn off both burners',
      isImportant: true,
      actions: [
        {
          type: 'set-heat',
          burner: 'back-left',
          heatLevel: 'off',
        },
        {
          type: 'set-heat',
          burner: 'front-right',
          heatLevel: 'off',
        },
      ],
    },
    {
      id: 'step-10',
      startTime: 330,
      duration: 90,
      instruction: 'Drain pasta and add to the sauce. Toss to combine and serve!',
      actions: [
        {
          type: 'remove-cookware',
          cookwareId: 'pot-1',
        },
        {
          type: 'remove-cookware',
          cookwareId: 'pan-2',
        },
      ],
    },
  ],
};

export const recipes = [scrambledEggsRecipe, pastaRecipe];
export default scrambledEggsRecipe;
