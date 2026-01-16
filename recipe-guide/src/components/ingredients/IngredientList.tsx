import React from 'react';
import type { Ingredient } from '../../types/recipe';

interface IngredientListProps {
  ingredients: Ingredient[];
  usedIngredients?: string[]; // IDs of ingredients already used
}

const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  usedIngredients = []
}) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">
        Ingredients
      </h3>

      <div className="space-y-2">
        {ingredients.map((ingredient) => {
          const isUsed = usedIngredients.includes(ingredient.id);

          return (
            <div
              key={ingredient.id}
              className={`flex items-center gap-3 p-2 rounded transition-all duration-300 ${
                isUsed
                  ? 'bg-gray-700/50 opacity-50'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {/* Visual indicator */}
              <div
                className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: ingredient.color,
                  opacity: isUsed ? 0.5 : 1,
                }}
              >
                {isUsed && (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeWidth={2}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              {/* Ingredient info */}
              <div className="flex-1">
                <div className={`font-medium ${isUsed ? 'line-through text-gray-400' : 'text-white'}`}>
                  {ingredient.name}
                </div>
                <div className="text-sm text-gray-400">
                  {ingredient.amount}
                </div>
              </div>

              {/* State indicator */}
              {ingredient.state && ingredient.state !== 'raw' && (
                <div className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300">
                  {ingredient.state}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IngredientList;
