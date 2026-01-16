import React from 'react';
import type { BurnerState, Cookware, Ingredient } from '../../types/recipe';
import Stovetop from './Stovetop';

interface KitchenViewProps {
  burners: BurnerState[];
  cookware: Cookware[];
  ingredients: Ingredient[];
}

const KitchenView: React.FC<KitchenViewProps> = ({ burners, cookware, ingredients }) => {
  return (
    <div className="relative w-full">
      {/* Kitchen title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Visual Recipe Guide</h2>
        <p className="text-gray-400">Watch your recipe come to life</p>
      </div>

      {/* Main cooking area */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
        {/* Stovetop with integrated cookware */}
        <Stovetop burners={burners} cookware={cookware} ingredients={ingredients} />

        {/* Unused cookware display at bottom */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Available Cookware</h4>
          <div className="flex flex-wrap gap-4 justify-center">
            {cookware
              .filter(cw => !cw.burner)
              .map(cw => (
                <div
                  key={cw.id}
                  className="text-center opacity-50 hover:opacity-100 transition-opacity duration-300"
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
