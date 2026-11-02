import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.body}>
        Errands is a small Expo app. The same TypeScript code runs on the web, Android and iOS.
      </Text>
      <Text style={styles.body}>Each file in src/app is a screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12, padding: 20 },
  body: { color: '#374151', fontSize: 16, lineHeight: 24 },
});
