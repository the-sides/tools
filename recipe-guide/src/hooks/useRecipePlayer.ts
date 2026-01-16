import { useState, useEffect, useRef, useCallback } from 'react';
import type {
  Recipe,
  BurnerState,
  Cookware,
  IngredientState,
  RecipeStep,
} from '../types/recipe';

export const useRecipePlayer = (recipe: Recipe) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [burners, setBurners] = useState<BurnerState[]>([
    { position: 'front-left', heatLevel: 'off' },
    { position: 'front-right', heatLevel: 'off' },
    { position: 'back-left', heatLevel: 'off' },
    { position: 'back-right', heatLevel: 'off' },
  ]);
  const [cookware, setCookware] = useState<Cookware[]>(
    recipe.cookware.map(cw => ({ ...cw, ingredients: [] as string[] }))
  );
  const [ingredientStates, setIngredientStates] = useState<Map<string, IngredientState>>(
    new Map()
  );
  const [activeSteps, setActiveSteps] = useState<string[]>([]);
  const [usedIngredients, setUsedIngredients] = useState<string[]>([]);

  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(Date.now());

  // Apply recipe actions based on current time
  const applyActionsUpToTime = useCallback((time: number) => {
    // Reset state
    const newBurners: BurnerState[] = [
      { position: 'front-left', heatLevel: 'off' },
      { position: 'front-right', heatLevel: 'off' },
      { position: 'back-left', heatLevel: 'off' },
      { position: 'back-right', heatLevel: 'off' },
    ];
    const newCookware = recipe.cookware.map(cw => ({ ...cw, ingredients: [] as string[] }));
    const newIngredientStates = new Map<string, IngredientState>();
    const newUsedIngredients: string[] = [];

    // Apply all steps up to current time
    recipe.steps.forEach(step => {
      if (step.startTime <= time) {
        step.actions.forEach(action => {
          switch (action.type) {
            case 'set-heat':
              if (action.burner && action.heatLevel) {
                const burner = newBurners.find(b => b.position === action.burner);
                if (burner) {
                  burner.heatLevel = action.heatLevel;
                }
              }
              break;

            case 'place-cookware':
              if (action.cookwareId && action.burner) {
                const cookwareItem = newCookware.find(c => c.id === action.cookwareId);
                if (cookwareItem) {
                  cookwareItem.burner = action.burner;
                  const burner = newBurners.find(b => b.position === action.burner);
                  if (burner) {
                    burner.cookwareId = action.cookwareId;
                  }
                }
              }
              break;

            case 'add-ingredient':
              if (action.ingredientId && action.cookwareId) {
                const cookwareItem = newCookware.find(c => c.id === action.cookwareId);
                if (cookwareItem && !cookwareItem.ingredients.includes(action.ingredientId)) {
                  cookwareItem.ingredients.push(action.ingredientId);
                  newUsedIngredients.push(action.ingredientId);
                  newIngredientStates.set(action.ingredientId, 'cooking');
                }
              }
              break;

            case 'add-lid':
              if (action.cookwareId) {
                const cookwareItem = newCookware.find(c => c.id === action.cookwareId);
                if (cookwareItem) {
                  cookwareItem.hasLid = true;
                }
              }
              break;

            case 'remove-lid':
              if (action.cookwareId) {
                const cookwareItem = newCookware.find(c => c.id === action.cookwareId);
                if (cookwareItem) {
                  cookwareItem.hasLid = false;
                }
              }
              break;

            case 'remove-cookware':
              if (action.cookwareId) {
                const cookwareItem = newCookware.find(c => c.id === action.cookwareId);
                if (cookwareItem && cookwareItem.burner) {
                  const burner = newBurners.find(b => b.position === cookwareItem.burner);
                  if (burner) {
                    burner.cookwareId = undefined;
                  }
                  cookwareItem.burner = undefined;
                }
              }
              break;
          }
        });
      }
    });

    setBurners(newBurners);
    setCookware(newCookware);
    setIngredientStates(newIngredientStates);
    setUsedIngredients(newUsedIngredients);

    // Update active steps
    const active = recipe.steps
      .filter(step => step.startTime <= time && step.startTime + step.duration >= time)
      .map(step => step.id);
    setActiveSteps(active);
  }, [recipe]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTimeRef.current) / 1000; // Convert to seconds
      lastTimeRef.current = now;

      setCurrentTime(prev => {
        const newTime = prev + delta * playbackSpeed;
        if (newTime >= recipe.totalTime) {
          setIsPlaying(false);
          return recipe.totalTime;
        }
        return newTime;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = Date.now();
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, recipe.totalTime]);

  // Apply actions when time changes
  useEffect(() => {
    applyActionsUpToTime(currentTime);
  }, [currentTime, applyActionsUpToTime]);

  // Get current step instructions
  const getCurrentInstructions = useCallback((): RecipeStep[] => {
    return recipe.steps.filter(step =>
      activeSteps.includes(step.id)
    );
  }, [recipe.steps, activeSteps]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const reset = useCallback(() => {
    setCurrentTime(0);
    setIsPlaying(false);
    applyActionsUpToTime(0);
  }, [applyActionsUpToTime]);

  const seek = useCallback((time: number) => {
    setCurrentTime(Math.max(0, Math.min(time, recipe.totalTime)));
  }, [recipe.totalTime]);

  const changeSpeed = useCallback((speed: number) => {
    setPlaybackSpeed(speed);
  }, []);

  return {
    currentTime,
    isPlaying,
    playbackSpeed,
    burners,
    cookware,
    ingredientStates,
    usedIngredients,
    activeSteps,
    getCurrentInstructions,
    togglePlayPause,
    reset,
    seek,
    changeSpeed,
    totalTime: recipe.totalTime,
  };
};
