import React from 'react';
import type { BurnerState, HeatLevel, Cookware, Ingredient } from '../../types/recipe';
import CookwareDisplay from './CookwareDisplay';

interface BurnerProps {
  burner?: BurnerState;
  cookware?: Cookware;
  ingredients: Ingredient[];
}

const Burner: React.FC<BurnerProps> = ({ burner, cookware, ingredients }) => {
  const heatLevel = burner?.heatLevel || 'off';

  // Calculate visual properties based on heat level
  const getHeatVisuals = (level: HeatLevel) => {
    switch (level) {
      case 'high':
        return {
          glow: 'shadow-[0_0_40px_rgba(255,100,0,0.8)]',
          color: 'from-red-600 via-orange-500 to-yellow-400',
          rings: 4,
          animate: 'animate-pulse',
        };
      case 'medium-high':
        return {
          glow: 'shadow-[0_0_30px_rgba(255,120,0,0.6)]',
          color: 'from-red-500 via-orange-400 to-yellow-300',
          rings: 3,
          animate: 'animate-pulse',
        };
      case 'medium':
        return {
          glow: 'shadow-[0_0_20px_rgba(255,150,0,0.5)]',
          color: 'from-orange-500 via-orange-400 to-yellow-200',
          rings: 3,
          animate: '',
        };
      case 'medium-low':
        return {
          glow: 'shadow-[0_0_15px_rgba(255,180,0,0.4)]',
          color: 'from-orange-400 via-yellow-400 to-yellow-100',
          rings: 2,
          animate: '',
        };
      case 'low':
        return {
          glow: 'shadow-[0_0_10px_rgba(255,200,0,0.3)]',
          color: 'from-yellow-400 via-yellow-300 to-yellow-100',
          rings: 2,
          animate: '',
        };
      default:
        return {
          glow: '',
          color: 'from-gray-700 to-gray-800',
          rings: 1,
          animate: '',
        };
    }
  };

  const visuals = getHeatVisuals(heatLevel);
  const isOn = heatLevel !== 'off';

  return (
    <div className="relative flex items-center justify-center min-h-[240px]">
      {/* Burner base */}
      <div className="relative w-32 h-32 rounded-full bg-gray-900 border-2 border-gray-600 flex items-center justify-center">
        {/* Heat rings */}
        {isOn && (
          <div className={`absolute inset-0 rounded-full ${visuals.animate}`}>
            {Array.from({ length: visuals.rings }).map((_, i) => (
              <div
                key={i}
                className={`absolute rounded-full bg-gradient-radial ${visuals.glow}`}
                style={{
                  inset: `${i * 15}%`,
                  background: `radial-gradient(circle, ${
                    i === 0 ? 'rgba(255,200,100,0.9)' :
                    i === 1 ? 'rgba(255,150,50,0.6)' :
                    i === 2 ? 'rgba(255,100,0,0.4)' :
                    'rgba(255,50,0,0.2)'
                  }, transparent)`,
                }}
              />
            ))}
          </div>
        )}

        {/* Burner grate */}
        <div className="relative z-10 w-28 h-28 rounded-full border-4 border-gray-700 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-gray-700 flex items-center justify-center">
            {/* Center hole */}
            <div className="w-8 h-8 rounded-full bg-gray-950" />
          </div>
        </div>

        {/* Glow effect when on */}
        {isOn && (
          <div className={`absolute inset-0 rounded-full ${visuals.glow} opacity-50 blur-xl`} />
        )}
      </div>

      {/* Cookware positioned on top of burner with animation */}
      {cookware && (
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 animate-in fade-in zoom-in duration-500"
          style={{
            animationFillMode: 'both'
          }}
        >
          <CookwareDisplay
            cookware={cookware}
            ingredients={ingredients}
            position={{ x: 0, y: 0 }}
          />
        </div>
      )}
    </div>
  );
};

export default Burner;
