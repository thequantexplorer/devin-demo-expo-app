import { useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Item = {
  id: number;
  name: string;
  bought: boolean;
};

export default function ShoppingListScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState('');
  const nextId = useRef(1);

  const leftToBuy = items.filter((item) => !item.bought).length;

  function addItem() {
    const name = text.trim();
    if (!name) return;
    setItems((current) => [...current, { id: nextId.current++, name, bought: false }]);
    setText('');
  }

  function toggleItem(id: number) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, bought: !item.bought } : item)),
    );
  }

  function removeItem(id: number) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          accessibilityLabel="New item"
          placeholder="Add an item"
          placeholderTextColor="#9ca3af"
          value={text}
          onChangeText={setText}
          onSubmitEditing={addItem}
          returnKeyType="done"
          style={styles.input}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add item"
          onPress={addItem}
          style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      {items.length > 0 && <Text style={styles.summary}>{leftToBuy} left to buy</Text>}

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<Text style={styles.empty}>Your list is empty</Text>}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Pressable
              accessibilityRole="checkbox"
              accessibilityLabel={item.name}
              aria-checked={item.bought}
              onPress={() => toggleItem(item.id)}
              style={styles.check}
            >
              <View style={[styles.box, item.bought && styles.boxChecked]}>
                {item.bought && <Text style={styles.tick}>✓</Text>}
              </View>
              <Text style={[styles.name, item.bought && styles.nameBought]}>{item.name}</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Remove ${item.name}`}
              onPress={() => removeItem(item.id)}
              hitSlop={8}
              style={({ pressed }) => [styles.remove, pressed && styles.pressed]}
            >
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 20 },
  form: { flexDirection: 'row', gap: 8 },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderRadius: 12,
    borderWidth: 1,
    color: '#111827',
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  addButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  pressed: { opacity: 0.7 },
  summary: { color: '#6b7280', fontSize: 14 },
  list: { gap: 8 },
  empty: { color: '#6b7280', fontSize: 16, marginTop: 24, textAlign: 'center' },
  row: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  check: { alignItems: 'center', flex: 1, flexDirection: 'row', gap: 12 },
  box: {
    alignItems: 'center',
    borderColor: '#9ca3af',
    borderRadius: 6,
    borderWidth: 2,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  boxChecked: { backgroundColor: '#16a34a', borderColor: '#16a34a' },
  tick: { color: '#ffffff', fontSize: 14, fontWeight: '700' },
  name: { color: '#111827', flexShrink: 1, fontSize: 16 },
  nameBought: { color: '#9ca3af', textDecorationLine: 'line-through' },
  remove: { paddingHorizontal: 8, paddingVertical: 4 },
  removeText: { color: '#dc2626', fontSize: 14, fontWeight: '500' },
});
