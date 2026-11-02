import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { usePalette } from '../theme';

export default function RootLayout() {
  const palette = usePalette();

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: palette.background },
          headerTintColor: palette.text,
          headerTitleStyle: { fontWeight: '600', fontSize: 17 },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: palette.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Errands' }} />
        <Stack.Screen name="shopping-list" options={{ title: 'Shopping list' }} />
        <Stack.Screen name="about" options={{ title: 'About' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
