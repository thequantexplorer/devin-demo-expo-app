# Errands

A small Expo (React Native) app written in TypeScript. The same code runs on the web, Android and iOS.

- Screens live in `src/app/` (Expo Router: each file is a screen).
- Tests live in `__tests__/`.

```sh
npm install
npm run web       # open in the browser
npm run android   # open in Expo Go on an Android emulator
npm test
npm run typecheck
```

## Current state

The home screen and the About screen work. The shopping list screen is not built yet.
Its tests in `__tests__/shopping-list.test.tsx` are written already and fail:

```text
FAIL __tests__/shopping-list.test.tsx
  ● Shopping list screen › is linked from the home screen and starts empty
    Unable to find an element with role: link, name: Shopping list

Tests:       6 failed, 2 passed, 8 total
```

---

This repo is a starter for a Devin workshop lab. See [DEVIN_DEMO.md](DEVIN_DEMO.md) for the steps and the prompt.
