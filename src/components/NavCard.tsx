import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  href: Href;
  title: string;
  description: string;
};

export function NavCard({ href, title, description }: Props) {
  return (
    <Link href={href} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={title}
        style={styles.card}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  title: { color: '#111827', fontSize: 17, fontWeight: '600' },
  description: { color: '#6b7280', fontSize: 14, marginTop: 4 },
});
