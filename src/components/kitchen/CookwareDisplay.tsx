import React from 'react';
import type { Cookware, Ingredient } from '../../types/recipe';

interface CookwareDisplayProps {
  cookware: Cookware;
  ingredients: Ingredient[];
  position?: { x: number; y: number };
}

const CookwareDisplay: React.FC<CookwareDisplayProps> = ({
  cookware,
  ingredients,
}) => {
  // Get ingredients that are in this cookware
  const contentsIngredients = ingredients.filter(ing =>
    cookware.ingredients.includes(ing.id)
  );

  // Render different cookware types
  const renderCookware = () => {
    const baseClasses = "relative transition-all duration-500";

    switch (cookware.type) {
      case 'pan':
      case 'skillet':
        return (
          <div className={`${baseClasses} w-40 h-40`}>
            {/* Pan body */}
            <div className="relative w-full h-full">
              {/* Pan circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 shadow-2xl border-4 border-gray-700">
                {/* Inner cooking surface */}
                <div className="absolute inset-3 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
                  {/* Oil layer */}
                  {cookware.oilAmount && cookware.oilAmount > 0 && (
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-yellow-200/60 to-yellow-100/40"
                      style={{ height: `${Math.min(cookware.oilAmount, 30)}%` }}
                    />
                  )}

                  {/* Ingredients */}
                  <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-1 p-2">
                    {contentsIngredients.map((ing, idx) => (
                      <div
                        key={ing.id}
                        className="relative w-8 h-8 rounded-full shadow-lg transition-all duration-300"
                        style={{
                          backgroundColor: ing.color,
                          transform: `rotate(${idx * 45}deg) translateX(${idx * 2}px)`,
                          opacity: ing.state === 'burning' ? 0.3 : 1,
                        }}
                      >
                        {ing.state === 'cooking' && (
                          <div className="absolute inset-0 rounded-full animate-pulse bg-orange-400/30" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pan handle */}
              <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-16 h-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-r-full shadow-lg" />
            </div>

            {/* Lid if present */}
            {cookware.hasLid && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 shadow-2xl border-2 border-gray-500 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-gray-600 shadow-inner" />
              </div>
            )}
          </div>
        );

      case 'pot':
      case 'saucepan':
        return (
          <div className={`${baseClasses} w-36 h-40`}>
            {/* Pot body */}
            <div className="relative w-full h-full">
              {/* Pot shape - taller than pan */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-36 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 rounded-b-3xl shadow-2xl border-4 border-gray-700">
                {/* Inner cooking surface */}
                <div className="absolute inset-3 rounded-b-3xl bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
                  {/* Contents */}
                  <div className="absolute inset-0 flex flex-col justify-end p-2">
                    {contentsIngredients.length > 0 && (
                      <div
                        className="w-full rounded-lg transition-all duration-500"
                        style={{
                          height: `${Math.min(30 + contentsIngredients.length * 15, 80)}%`,
                          background: `linear-gradient(to top, ${contentsIngredients[0]?.color || '#8B4513'}, ${contentsIngredients[0]?.color || '#8B4513'}CC)`,
                        }}
                      >
                        {/* Bubbles if cooking */}
                        {contentsIngredients.some(i => i.state === 'simmering' || i.state === 'cooking') && (
                          <div className="relative w-full h-full">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-2 h-2 bg-white/40 rounded-full animate-bounce"
                                style={{
                                  left: `${20 + i * 15}%`,
                                  bottom: `${10 + (i % 3) * 20}%`,
                                  animationDelay: `${i * 0.2}s`,
                                  animationDuration: '1.5s',
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Pot handles */}
              <div className="absolute top-8 -left-4 w-6 h-12 border-4 border-gray-600 rounded-l-full" />
              <div className="absolute top-8 -right-4 w-6 h-12 border-4 border-gray-600 rounded-r-full" />
            </div>

            {/* Lid if present */}
            {cookware.hasLid && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-t-full shadow-2xl border-2 border-gray-500 flex items-center justify-center">
                <div className="w-6 h-4 rounded-full bg-gray-600 shadow-inner" />
              </div>
            )}
          </div>
        );

      case 'wok':
        return (
          <div className={`${baseClasses} w-44 h-44`}>
            {/* Wok shape - rounded bottom */}
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-700 shadow-2xl border-4 border-gray-700"
                   style={{ borderRadius: '50% 50% 70% 70% / 40% 40% 60% 60%' }}>
                {/* Inner surface */}
                <div className="absolute inset-3 bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden"
                     style={{ borderRadius: '50% 50% 70% 70% / 40% 40% 60% 60%' }}>
                  {/* Ingredients scattered in wok */}
                  <div className="absolute inset-0 flex flex-wrap items-end justify-center gap-2 p-4">
                    {contentsIngredients.map((ing) => (
                      <div
                        key={ing.id}
                        className="w-6 h-6 rounded-lg shadow-lg"
                        style={{ backgroundColor: ing.color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Wok handles */}
              <div className="absolute top-1/4 -left-8 w-12 h-3 bg-gray-700 rounded-l-lg" />
              <div className="absolute top-1/4 -right-8 w-12 h-3 bg-gray-700 rounded-r-lg" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {renderCookware()}

      {/* Cookware label */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="text-xs font-medium text-gray-300 bg-gray-900/80 px-2 py-1 rounded">
          {cookware.name}
        </div>
      </div>
    </div>
  );
};

export default CookwareDisplay;
