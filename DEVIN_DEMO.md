# Devin demo: Build one app for web and Android with Expo

**What it shows:** Devin adds a screen to an Expo (React Native) app, makes the failing tests pass, then runs the same code on the web in Chrome and on an Android emulator on its own machine. It sends you a screenshot from each.

**Needs:** GitHub only

More demos: [devin-advanced-demos](https://github.com/thequantexplorer/devin-advanced-demos)

## The starting problem

The app has a home screen and an About screen. The shopping list screen is missing, and its tests fail:

```text
FAIL __tests__/shopping-list.test.tsx
  ● Shopping list screen › is linked from the home screen and starts empty
    Unable to find an element with role: link, name: Shopping list

Tests:       6 failed, 2 passed, 8 total
```

The **CI** check on GitHub fails for the same reason. That is expected.

## Set it up

1. Click **Use this template → Create a new repository**, choose your GitHub account as the owner, and keep the name `devin-demo-expo-app`. The prompt below assumes that name.
2. In Devin, open [**Settings → Connections → GitHub**](https://app.devin.ai/settings/connections/github) and make sure Devin can access the new repository.

You do not need to install anything. Devin sets up the Android emulator itself, using the steps in the repo skill at `.agents/skills/run-web-and-android/SKILL.md`.

## Prompt

Start a new session at [app.devin.ai](https://app.devin.ai) and paste this. Replace `<you>` with your GitHub user.

```text
Add a Shopping list screen to the Errands Expo app in https://github.com/<you>/devin-demo-expo-app.

Follow the design skill in .agents/skills/design/SKILL.md. The result should look like a finished, polished product, not a default template.

On the new screen, people can type an item and tap Add, tick an item off when it is bought, remove an item, and see how many items are left to buy. Link to it from the home screen. The tests in __tests__/shopping-list.test.tsx describe exactly what it must do and fail today. Make them pass without changing them.

Then run the app on the web in Chrome and on the Android emulator. The skill in .agents/skills/run-web-and-android explains how. On both, open the shopping list, add Milk, Eggs and Bread, and tick off Milk. Open a PR with the test output and one screenshot from the web and one from Android in the description, and send me both screenshots here.
```

## What to watch

- Open the **Desktop** tab in the session to see the Android emulator boot and the app open in Expo Go. The first boot takes about 5 minutes.
- It runs the tests before and after the change.

## Done when

- The PR has green tests: 8 of 8 pass.
- You have two screenshots of the same shopping list: one in the browser, one on Android.
