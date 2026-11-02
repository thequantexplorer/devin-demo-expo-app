import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { NavCard } from '../components/NavCard';
import { contentWidth, space, type, usePalette } from '../theme';

export default function HomeScreen() {
  const palette = usePalette();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={[type.title, { color: palette.text }]}>Good to see you</Text>
        <Text style={[type.secondary, { color: palette.secondary }]}>Pick something to do.</Text>
      </View>
      <NavCard
        href="/shopping-list"
        title="Shopping list"
        description="Everything you need from the shop."
      />
      <NavCard href="/about" title="About" description="What this app is and how it is built." />
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
  header: { gap: space(0.5), marginBottom: space(1.5) },
});
