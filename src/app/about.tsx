import { ScrollView, StyleSheet, Text } from 'react-native';

import { contentWidth, space, type, usePalette } from '../theme';

export default function AboutScreen() {
  const palette = usePalette();
  const body = [type.body, { color: palette.text }];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={body}>
        Errands is a small Expo app. The same TypeScript code runs on the web, Android and iOS.
      </Text>
      <Text style={[type.secondary, { color: palette.secondary }]}>
        Each file in src/app is a screen.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    gap: space(1.5),
    maxWidth: contentWidth,
    padding: space(3),
    width: '100%',
  },
});
