# Visual Recipe Guide

An interactive, visual cooking guide that helps beginners learn to cook by showing real-time animations of stovetops, pans, and ingredients as they progress through a recipe.

## Features

- **Visual Stovetop Display**: See burners heat up with realistic visual effects
- **Animated Cookware**: Watch pans, pots, and other cookware as ingredients are added
- **Real-time Instructions**: Follow along with step-by-step instructions synchronized to a timer
- **Playback Controls**: Play, pause, adjust speed (0.5x to 10x), and scrub through the recipe timeline
- **Ingredient Tracking**: Check off ingredients as they're used in the recipe
- **Multiple Recipes**: Switch between different recipes to practice various cooking techniques

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser to the URL shown in the terminal (typically http://localhost:5173)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Select a Recipe**: Choose from the available recipes (Scrambled Eggs or Pasta with Sauce)
2. **Review Ingredients**: Check the ingredient list on the left sidebar
3. **Press Play**: Click the play button to start the recipe timer
4. **Follow Along**: Watch the visual representation update in real-time as you follow the instructions
5. **Adjust Speed**: Use the speed controls to go faster (for experienced cooks) or slower (for beginners)
6. **Pause and Rewind**: Use the timeline to pause or jump to any point in the recipe

## Project Structure

```
src/
├── components/
│   ├── kitchen/          # Visual components for stovetop, burners, and cookware
│   ├── ingredients/      # Ingredient list and tracking
│   └── controls/         # Playback controls and current instructions
├── data/                 # Sample recipe data
├── hooks/                # Custom React hooks (recipe player logic)
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Adding New Recipes

To add a new recipe, create a new recipe object in `src/data/sampleRecipe.ts` following this structure:

```typescript
{
  id: 'unique-id',
  name: 'Recipe Name',
  description: 'Brief description',
  totalTime: 300, // in seconds
  servings: 2,
  ingredients: [...],
  cookware: [...],
  steps: [...]
}
```

See the existing recipes for detailed examples of how to structure:
- Ingredients with colors for visual representation
- Cookware definitions (pans, pots, woks, etc.)
- Step-by-step actions (set-heat, add-ingredient, stir, etc.)

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **Custom Hooks** - Recipe playback logic

## Future Enhancements

Possible features to add:
- Sound effects for actions (sizzling, bubbling, etc.)
- User-created recipes
- Recipe sharing and import/export
- Mobile responsive improvements
- More cookware types (dutch ovens, pressure cookers, etc.)
- Temperature probes and timers
- Shopping list generation
- Nutritional information

## License

MIT

## Contributing

Contributions welcome! Please feel free to submit issues or pull requests.
