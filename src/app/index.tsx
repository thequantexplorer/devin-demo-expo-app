import { ScrollView, StyleSheet, Text } from 'react-native';

import { NavCard } from '../components/NavCard';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Good to see you</Text>
      <Text style={styles.subheading}>Pick something to do.</Text>
      <NavCard
        href="/shopping-list"
        title="Shopping list"
        description="Things to buy, ticked off as you go."
      />
      <NavCard href="/about" title="About" description="What this app is and how it is built." />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12, padding: 20 },
  heading: { color: '#111827', fontSize: 28, fontWeight: '700' },
  subheading: { color: '#6b7280', fontSize: 16, marginBottom: 8 },
});
