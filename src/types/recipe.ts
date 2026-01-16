// Core recipe types for the visual cooking guide

export type BurnerPosition = 'front-left' | 'front-right' | 'back-left' | 'back-right';

export type HeatLevel = 'off' | 'low' | 'medium-low' | 'medium' | 'medium-high' | 'high';

export type CookwareType = 'pan' | 'pot' | 'saucepan' | 'skillet' | 'wok';

export type IngredientState = 'raw' | 'cooking' | 'simmering' | 'browning' | 'done' | 'burning';

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  // Visual representation
  color: string;
  // Current state for visualization
  state?: IngredientState;
}

export interface Cookware {
  id: string;
  type: CookwareType;
  name: string;
  burner?: BurnerPosition;
  // Contents of this cookware
  ingredients: string[]; // ingredient IDs
  // Visual state
  hasLid?: boolean;
  oilAmount?: number; // 0-100 percentage
}

export interface BurnerState {
  position: BurnerPosition;
  heatLevel: HeatLevel;
  cookwareId?: string;
}

export type ActionType =
  | 'set-heat'
  | 'place-cookware'
  | 'add-ingredient'
  | 'stir'
  | 'flip'
  | 'add-lid'
  | 'remove-lid'
  | 'remove-cookware'
  | 'wait';

export interface RecipeAction {
  type: ActionType;
  // For set-heat
  burner?: BurnerPosition;
  heatLevel?: HeatLevel;
  // For place-cookware
  cookwareId?: string;
  // For add-ingredient
  ingredientId?: string;
  // For wait actions
  description?: string;
}

export interface RecipeStep {
  id: string;
  // When this step occurs (in seconds from recipe start)
  startTime: number;
  // How long this step takes
  duration: number;
  // What to display to the user
  instruction: string;
  // Actions that occur at this step
  actions: RecipeAction[];
  // Visual indicators
  isImportant?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  // Total time in seconds
  totalTime: number;
  // All ingredients used
  ingredients: Ingredient[];
  // All cookware used
  cookware: Cookware[];
  // Steps in chronological order
  steps: RecipeStep[];
  // Servings
  servings: number;
}

// Runtime state for the recipe player
export interface RecipePlayerState {
  currentTime: number; // seconds elapsed
  isPlaying: boolean;
  playbackSpeed: number; // 1 = normal, 2 = 2x, etc.
  burners: BurnerState[];
  cookware: Cookware[];
  // Track which steps are currently active
  activeSteps: string[];
  // Ingredient states
  ingredientStates: Map<string, IngredientState>;
}
