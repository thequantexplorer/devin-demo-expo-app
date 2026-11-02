import { StyleSheet, View } from 'react-native';

type IconProps = { color: string; size?: number };

export function PlusIcon({ color, size = 18 }: IconProps) {
  const bar = { backgroundColor: color, borderRadius: 1 };
  return (
    <View style={{ width: size, height: size }}>
      <View style={[bar, styles.center, { width: size, height: 2, top: size / 2 - 1 }]} />
      <View style={[bar, styles.center, { width: 2, height: size, left: size / 2 - 1 }]} />
    </View>
  );
}

export function CloseIcon({ color, size = 12 }: IconProps) {
  const length = size * Math.SQRT2;
  const bar = {
    backgroundColor: color,
    borderRadius: 1,
    height: 1.5,
    left: (size - length) / 2,
    position: 'absolute' as const,
    top: size / 2 - 0.75,
    width: length,
  };
  return (
    <View style={{ width: size, height: size }}>
      <View style={[bar, { transform: [{ rotate: '45deg' }] }]} />
      <View style={[bar, { transform: [{ rotate: '-45deg' }] }]} />
    </View>
  );
}

export function CheckIcon({ color }: IconProps) {
  return (
    <View
      style={{
        borderBottomWidth: 2,
        borderColor: color,
        borderRightWidth: 2,
        height: 11,
        marginTop: -2,
        transform: [{ rotate: '45deg' }],
        width: 6,
      }}
    />
  );
}

export function ChevronIcon({ color }: IconProps) {
  return (
    <View
      style={{
        borderColor: color,
        borderRightWidth: 2,
        borderTopWidth: 2,
        height: 9,
        marginRight: 3,
        transform: [{ rotate: '45deg' }],
        width: 9,
      }}
    />
  );
}

const styles = StyleSheet.create({
  center: { position: 'absolute' },
});
