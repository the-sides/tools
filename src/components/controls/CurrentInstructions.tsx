import React from 'react';
import type { RecipeStep } from '../../types/recipe';

interface CurrentInstructionsProps {
  steps: RecipeStep[];
  currentTime: number;
}

const CurrentInstructions: React.FC<CurrentInstructionsProps> = ({ steps, currentTime }) => {
  if (steps.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-3 md:p-6 text-center">
        <div className="text-gray-400 text-sm md:text-base">Press play to start cooking!</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-3 md:p-6 space-y-2 md:space-y-4">
      <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-4 border-b border-gray-700 pb-1 md:pb-2">
        Current Step{steps.length > 1 ? 's' : ''}
      </h3>

      {steps.map((step) => {
        const timeRemaining = step.startTime + step.duration - currentTime;
        const progress = ((currentTime - step.startTime) / step.duration) * 100;

        return (
          <div
            key={step.id}
            className={`p-2 md:p-4 rounded-lg border md:border-2 transition-all duration-300 ${
              step.isImportant
                ? 'bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-500/20'
                : 'bg-gray-700/50 border-gray-600'
            }`}
          >
            {/* Instruction text */}
            <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
              {step.isImportant && (
                <svg
                  className="w-4 h-4 md:w-6 md:h-6 text-orange-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              )}
              <p className="text-white text-sm md:text-lg leading-snug md:leading-relaxed flex-1">
                {step.instruction}
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-1 md:mb-2">
              <div className="w-full h-1 md:h-2 bg-gray-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500 ease-linear"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>

            {/* Time remaining */}
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="text-gray-400">
                {timeRemaining > 0 ? (
                  <>
                    {Math.floor(timeRemaining / 60) > 0 && (
                      <span>{Math.floor(timeRemaining / 60)}m </span>
                    )}
                    <span>{Math.floor(timeRemaining % 60)}s remaining</span>
                  </>
                ) : (
                  <span className="text-green-400">Complete!</span>
                )}
              </span>

              {/* Action indicators - hidden on mobile */}
              <div className="hidden md:flex gap-1">
                {step.actions.map((action, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-gray-600 text-gray-300 rounded text-xs"
                  >
                    {action.type.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CurrentInstructions;
