import { useRef, useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputInstance,
} from 'react-native';

import { PlusIcon } from '../components/Icons';
import { ShoppingItemRow, type ShoppingItem } from '../components/ShoppingItemRow';
import {
  contentWidth,
  focusRing,
  radius,
  space,
  type,
  usePalette,
  type InteractionState,
} from '../theme';

function animateNextChange() {
  if (Platform.OS === 'web') return;
  LayoutAnimation.configureNext(
    LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.opacity),
  );
}

export default function ShoppingListScreen() {
  const palette = usePalette();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [draft, setDraft] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const nextId = useRef(1);
  const input = useRef<TextInputInstance>(null);

  const toBuy = items.filter((item) => !item.bought);
  const inCart = items.filter((item) => item.bought);
  const canAdd = draft.trim().length > 0;

  function addItem() {
    const name = draft.trim();
    if (!name) return;
    animateNextChange();
    setItems((current) => [...current, { id: nextId.current++, name, bought: false }]);
    setDraft('');
    input.current?.focus();
  }

  function toggleItem(id: number) {
    animateNextChange();
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, bought: !item.bought } : item)),
    );
  }

  function removeItem(id: number) {
    animateNextChange();
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function renderGroup(title: string, group: ShoppingItem[]) {
    if (group.length === 0) return null;
    return (
      <View style={styles.section}>
        <Text style={[type.section, styles.sectionTitle, { color: palette.secondary }]}>{title}</Text>
        <View style={[styles.group, { backgroundColor: palette.surface, borderColor: palette.hairline }]}>
          {group.map((item, index) => (
            <ShoppingItemRow
              key={item.id}
              item={item}
              first={index === 0}
              onToggle={toggleItem}
              onRemove={removeItem}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {items.length > 0 && (
        <View style={styles.header}>
          <Text style={[type.title, { color: palette.text }]}>
            {toBuy.length > 0 ? `${toBuy.length} left to buy` : 'All bought'}
          </Text>
          <Text style={[type.secondary, { color: palette.secondary }]}>
            {items.length === 1 ? '1 item on your list' : `${items.length} items on your list`}
          </Text>
        </View>
      )}

      <View style={styles.addRow}>
        <TextInput
          ref={input}
          accessibilityLabel="New item"
          placeholder="Add an item"
          placeholderTextColor={palette.secondary}
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={addItem}
          submitBehavior="submit"
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          returnKeyType="done"
          autoCapitalize="sentences"
          style={[
            type.body,
            styles.input,
            {
              backgroundColor: palette.surface,
              borderColor: inputFocused ? palette.text : palette.hairline,
              color: palette.text,
            },
            Platform.OS === 'web' && { outlineWidth: 0 },
          ]}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add item"
          accessibilityState={{ disabled: !canAdd }}
          disabled={!canAdd}
          onPress={addItem}
          style={(state) => {
            const { pressed, hovered, focused } = state as InteractionState;
            return [
              styles.addButton,
              {
                backgroundColor: palette.primary,
                opacity: !canAdd ? 0.3 : pressed ? 0.7 : hovered ? 0.85 : 1,
                transform: [{ scale: pressed ? 0.94 : 1 }],
              },
              focusRing(palette, focused),
            ];
          }}
        >
          <PlusIcon color={palette.onPrimary} />
        </Pressable>
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <View style={[styles.emptyBadge, { borderColor: palette.hairline, backgroundColor: palette.surface }]}>
            <PlusIcon color={palette.secondary} size={20} />
          </View>
          <Text style={[type.bodyStrong, { color: palette.text }]}>Your list is empty</Text>
          <Text style={[type.secondary, styles.emptyHelp, { color: palette.secondary }]}>
            Type something you need above and tap the plus to add it.
          </Text>
        </View>
      ) : (
        <>
          {renderGroup('To buy', toBuy)}
          {renderGroup('In the cart', inCart)}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    gap: space(3),
    maxWidth: contentWidth,
    padding: space(3),
    width: '100%',
  },
  header: { gap: space(0.5) },
  addRow: { alignItems: 'center', flexDirection: 'row', gap: space(1.5) },
  input: {
    borderRadius: radius.pill,
    borderWidth: 1,
    flex: 1,
    height: space(6),
    paddingHorizontal: space(2.5),
    paddingVertical: 0,
  },
  addButton: {
    alignItems: 'center',
    borderRadius: space(3),
    height: space(6),
    justifyContent: 'center',
    width: space(6),
  },
  section: { gap: space(1) },
  sectionTitle: { paddingHorizontal: space(2) },
  group: {
    borderRadius: radius.group,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  empty: { alignItems: 'center', gap: space(1), paddingVertical: space(8) },
  emptyBadge: {
    alignItems: 'center',
    borderRadius: space(4),
    borderWidth: 1,
    height: space(8),
    justifyContent: 'center',
    marginBottom: space(1),
    width: space(8),
  },
  emptyHelp: { maxWidth: 280, textAlign: 'center' },
});
