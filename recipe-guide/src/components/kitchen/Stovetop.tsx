import React from 'react';
import type { BurnerState } from '../../types/recipe';
import Burner from './Burner';

interface StovetopProps {
  burners: BurnerState[];
}

const Stovetop: React.FC<StovetopProps> = ({ burners }) => {
  // Find burner by position
  const getBurner = (position: string) => {
    return burners.find(b => b.position === position);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Stovetop surface */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border-4 border-gray-700">
        {/* Control panel at top */}
        <div className="mb-6 flex justify-around px-4">
          {['back-left', 'back-right', 'front-left', 'front-right'].map(pos => {
            const burner = getBurner(pos);
            return (
              <div key={pos} className="text-center">
                <div className="text-xs text-gray-400 mb-1">
                  {pos.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </div>
                <div className="text-sm font-bold text-orange-400">
                  {burner?.heatLevel !== 'off' ? burner?.heatLevel.toUpperCase() : 'OFF'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Burner grid */}
        <div className="grid grid-cols-2 gap-12 p-4">
          {/* Back row */}
          <Burner burner={getBurner('back-left')} />
          <Burner burner={getBurner('back-right')} />

          {/* Front row */}
          <Burner burner={getBurner('front-left')} />
          <Burner burner={getBurner('front-right')} />
        </div>
      </div>

      {/* Stovetop label */}
      <div className="text-center mt-4 text-sm text-gray-500 font-medium">
        STOVETOP
      </div>
    </div>
  );
};

export default Stovetop;
