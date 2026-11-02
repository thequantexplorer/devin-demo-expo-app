import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { focusRing, space, type, usePalette, type InteractionState } from '../theme';
import { CheckIcon, CloseIcon } from './Icons';

export type ShoppingItem = { id: number; name: string; bought: boolean };

type Props = {
  item: ShoppingItem;
  first: boolean;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
};

export function ShoppingItemRow({ item, first, onToggle, onRemove }: Props) {
  const palette = usePalette();
  const appear = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appear, { toValue: 1, duration: 200, useNativeDriver: true }).start();
  }, [appear]);

  return (
    <Animated.View
      style={[
        styles.row,
        !first && { borderTopColor: palette.hairline, borderTopWidth: StyleSheet.hairlineWidth },
        {
          opacity: appear,
          transform: [{ translateY: appear.interpolate({ inputRange: [0, 1], outputRange: [6, 0] }) }],
        },
      ]}
    >
      <Pressable
        accessibilityRole="checkbox"
        accessibilityLabel={item.name}
        accessibilityState={{ checked: item.bought }}
        onPress={() => onToggle(item.id)}
        style={(state) => {
          const { pressed, hovered, focused } = state as InteractionState;
          return [
            styles.toggle,
            { backgroundColor: pressed ? palette.surfacePressed : hovered ? palette.surfaceHover : 'transparent' },
            focusRing(palette, focused),
          ];
        }}
      >
        {({ pressed }) => (
          <>
            <View
              style={[
                styles.checkbox,
                item.bought
                  ? { backgroundColor: palette.accent, borderColor: palette.accent }
                  : { borderColor: pressed ? palette.secondary : palette.control },
              ]}
            >
              {item.bought && <CheckIcon color="#FFFFFF" />}
            </View>
            <Text
              numberOfLines={2}
              style={[
                type.body,
                styles.name,
                item.bought
                  ? { color: palette.secondary, opacity: 0.8, textDecorationLine: 'line-through' }
                  : { color: palette.text },
              ]}
            >
              {item.name}
            </Text>
          </>
        )}
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remove ${item.name}`}
        hitSlop={8}
        onPress={() => onRemove(item.id)}
        style={(state) => {
          const { pressed, hovered, focused } = state as InteractionState;
          return [
            styles.remove,
            {
              backgroundColor: pressed || hovered ? palette.surfacePressed : 'transparent',
              opacity: pressed ? 0.6 : 1,
            },
            focusRing(palette, focused),
          ];
        }}
      >
        <CloseIcon color={palette.secondary} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: 'center', flexDirection: 'row', paddingRight: space(1) },
  toggle: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: space(1.5),
    minHeight: space(7),
    paddingHorizontal: space(2),
    paddingVertical: space(1.5),
  },
  checkbox: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  name: { flex: 1 },
  remove: {
    alignItems: 'center',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
});
