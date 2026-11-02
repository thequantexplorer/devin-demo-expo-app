import { Platform, useColorScheme, type TextStyle } from 'react-native';

export type Palette = {
  background: string;
  surface: string;
  surfacePressed: string;
  surfaceHover: string;
  text: string;
  secondary: string;
  hairline: string;
  control: string;
  accent: string;
  primary: string;
  onPrimary: string;
  focus: string;
};

const light: Palette = {
  background: '#F6F5F1',
  surface: '#FFFFFF',
  surfacePressed: '#F0EEE8',
  surfaceHover: '#FAF9F6',
  text: '#1C1B19',
  secondary: '#7A776F',
  hairline: '#E7E4DC',
  control: '#CBC7BD',
  accent: '#2F855A',
  primary: '#1C1B19',
  onPrimary: '#FFFFFF',
  focus: '#1C1B19',
};

const dark: Palette = {
  background: '#141412',
  surface: '#1E1D1B',
  surfacePressed: '#2A2926',
  surfaceHover: '#242320',
  text: '#F2F1EC',
  secondary: '#A19E95',
  hairline: '#2F2E2A',
  control: '#5A5852',
  accent: '#48A06F',
  primary: '#F2F1EC',
  onPrimary: '#1C1B19',
  focus: '#F2F1EC',
};

export function usePalette(): Palette {
  return useColorScheme() === 'dark' ? dark : light;
}

export const type = {
  title: { fontSize: 32, fontWeight: '700', letterSpacing: -0.5, lineHeight: 40 },
  section: { fontSize: 13, fontWeight: '600', letterSpacing: 0.8, textTransform: 'uppercase' },
  body: { fontSize: 17, lineHeight: 24 },
  bodyStrong: { fontSize: 17, fontWeight: '600', lineHeight: 24 },
  secondary: { fontSize: 15, lineHeight: 20 },
} satisfies Record<string, TextStyle>;

export const radius = { group: 16, pill: 999 };

export const space = (n: number) => n * 8;

export const contentWidth = 600;

/** Pressable passes `hovered` and `focused` on the web; native only reports `pressed`. */
export type InteractionState = { pressed: boolean; hovered?: boolean; focused?: boolean };

export function focusRing(palette: Palette, focused?: boolean) {
  if (Platform.OS !== 'web') return null;
  return focused
    ? { outlineColor: palette.focus, outlineStyle: 'solid' as const, outlineWidth: 2, outlineOffset: 2 }
    : { outlineWidth: 0 };
}
