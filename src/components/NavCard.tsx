import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { focusRing, radius, space, type, usePalette, type InteractionState } from '../theme';
import { ChevronIcon } from './Icons';

type Props = {
  href: Href;
  title: string;
  description: string;
};

export function NavCard({ href, title, description }: Props) {
  const palette = usePalette();

  return (
    <Link href={href} asChild>
      <Pressable accessibilityRole="link" accessibilityLabel={title} style={styles.pressable}>
        {(state) => {
          const { pressed, hovered, focused } = state as InteractionState;
          return (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: pressed
                    ? palette.surfacePressed
                    : hovered
                      ? palette.surfaceHover
                      : palette.surface,
                  borderColor: palette.hairline,
                  transform: [{ scale: pressed ? 0.99 : 1 }],
                },
                focusRing(palette, focused),
              ]}
            >
              <View style={styles.text}>
                <Text style={[type.bodyStrong, { color: palette.text }]}>{title}</Text>
                <Text style={[type.secondary, { color: palette.secondary }]}>{description}</Text>
              </View>
              <ChevronIcon color={palette.secondary} />
            </View>
          );
        }}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  pressable: { borderRadius: radius.group },
  card: {
    alignItems: 'center',
    borderRadius: radius.group,
    borderWidth: 1,
    flexDirection: 'row',
    gap: space(2),
    paddingHorizontal: space(2.5),
    paddingVertical: space(2),
  },
  text: { flex: 1, gap: 2 },
});
