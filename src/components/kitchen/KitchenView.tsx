import React from 'react';
import type { BurnerState, Cookware, Ingredient } from '../../types/recipe';
import Stovetop from './Stovetop';
import CookwareDisplay from './CookwareDisplay';

interface KitchenViewProps {
  burners: BurnerState[];
  cookware: Cookware[];
  ingredients: Ingredient[];
}

const KitchenView: React.FC<KitchenViewProps> = ({ burners, cookware, ingredients }) => {
  // Calculate cookware positions based on burner positions
  const getCookwarePosition = (burnerPosition: string) => {
    const positions: Record<string, { x: number; y: number }> = {
      'back-left': { x: 50, y: 100 },
      'back-right': { x: 350, y: 100 },
      'front-left': { x: 50, y: 320 },
      'front-right': { x: 350, y: 320 },
    };
    return positions[burnerPosition] || { x: 0, y: 0 };
  };

  return (
    <div className="relative w-full">
      {/* Kitchen title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Visual Recipe Guide</h2>
        <p className="text-gray-400">Watch your recipe come to life</p>
      </div>

      {/* Main cooking area */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
        {/* Stovetop */}
        <Stovetop burners={burners} />

        {/* Cookware layer - positioned absolutely over burners */}
        <div className="relative mt-8">
          <div className="relative w-full max-w-2xl mx-auto" style={{ height: '500px' }}>
            {cookware
              .filter(cw => cw.burner)
              .map(cw => (
                <CookwareDisplay
                  key={cw.id}
                  cookware={cw}
                  ingredients={ingredients}
                  position={getCookwarePosition(cw.burner!)}
                />
              ))}
          </div>
        </div>

        {/* Unused cookware display at bottom */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Available Cookware</h4>
          <div className="flex flex-wrap gap-4 justify-center">
            {cookware
              .filter(cw => !cw.burner)
              .map(cw => (
                <div
                  key={cw.id}
                  className="text-center opacity-50 hover:opacity-100 transition-opacity"
                >
                  <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-2xl">🍳</span>
                  </div>
                  <div className="text-xs text-gray-400">{cw.name}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenView;
