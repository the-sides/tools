import { useState } from 'react';
import type { Recipe } from './types/recipe';
import { useRecipePlayer } from './hooks/useRecipePlayer';
import KitchenView from './components/kitchen/KitchenView';
import PlaybackControls from './components/controls/PlaybackControls';
import CurrentInstructions from './components/controls/CurrentInstructions';
import IngredientList from './components/ingredients/IngredientList';
import { recipes } from './data/sampleRecipe';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(recipes[0]);
  const [showIngredients, setShowIngredients] = useState(false);

  const {
    currentTime,
    isPlaying,
    playbackSpeed,
    burners,
    cookware,
    usedIngredients,
    getCurrentInstructions,
    togglePlayPause,
    reset,
    seek,
    changeSpeed,
    totalTime,
  } = useRecipePlayer(selectedRecipe);

  const currentSteps = getCurrentInstructions();

  // Merge ingredient states for display
  const ingredientsWithStates = selectedRecipe.ingredients.map(ing => ({
    ...ing,
    // You could add state here if needed from ingredientStates
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-2 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Compact Header */}
        <header className="text-center mb-3 md:mb-8">
          <h1 className="text-2xl md:text-5xl font-bold mb-1 md:mb-3 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Visual Recipe Guide
          </h1>
          <p className="text-gray-400 text-xs md:text-lg hidden md:block">
            Follow along step-by-step as your meal comes to life
          </p>
        </header>

        {/* Compact Recipe selector */}
        <div className="mb-3 md:mb-8 flex justify-center gap-2 md:gap-4">
          {recipes.map(recipe => (
            <button
              key={recipe.id}
              onClick={() => {
                setSelectedRecipe(recipe);
                reset();
              }}
              className={`px-3 py-1.5 md:px-6 md:py-3 rounded-lg text-xs md:text-base font-medium transition-all duration-200 ${
                selectedRecipe.id === recipe.id
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {recipe.name}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-8 mb-3 md:mb-8">
          {/* Left sidebar - Ingredients (hidden on mobile by default) */}
          <div className="lg:col-span-1 hidden lg:block">
            <IngredientList
              ingredients={ingredientsWithStates}
              usedIngredients={usedIngredients}
            />

            {/* Recipe info */}
            <div className="mt-6 bg-gray-800 rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-bold text-white mb-3 border-b border-gray-700 pb-2">
                Recipe Info
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Servings:</span>
                  <span className="text-white font-medium">{selectedRecipe.servings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Time:</span>
                  <span className="text-white font-medium">
                    {Math.floor(selectedRecipe.totalTime / 60)}m {selectedRecipe.totalTime % 60}s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Difficulty:</span>
                  <span className="text-green-400 font-medium">Beginner</span>
                </div>
              </div>
              <p className="mt-4 text-gray-300 text-sm">{selectedRecipe.description}</p>
            </div>
          </div>

          {/* Center - Kitchen view */}
          <div className="lg:col-span-2">
            <KitchenView
              burners={burners}
              cookware={cookware}
              ingredients={ingredientsWithStates}
            />
          </div>
        </div>

        {/* Collapsible ingredients on mobile */}
        <div className="lg:hidden mb-3">
          <button
            onClick={() => setShowIngredients(!showIngredients)}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between"
          >
            <span>Ingredients ({ingredientsWithStates.length})</span>
            <svg
              className={`w-4 h-4 transition-transform ${showIngredients ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showIngredients && (
            <div className="mt-2">
              <IngredientList
                ingredients={ingredientsWithStates}
                usedIngredients={usedIngredients}
              />
            </div>
          )}
        </div>

        {/* Current instructions */}
        <div className="mb-3 md:mb-8">
          <CurrentInstructions steps={currentSteps} currentTime={currentTime} />
        </div>

        {/* Playback controls */}
        <PlaybackControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          totalTime={totalTime}
          playbackSpeed={playbackSpeed}
          onPlayPause={togglePlayPause}
          onSpeedChange={changeSpeed}
          onSeek={seek}
          onReset={reset}
        />

        {/* Footer - hidden on mobile */}
        <footer className="mt-6 md:mt-12 text-center text-gray-500 text-xs md:text-sm hidden md:block">
          <p>Visual Recipe Guide - Making cooking easier for everyone</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
