import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';

async function openShoppingList() {
  await renderRouter('./src/app');
  await fireEvent.press(screen.getByRole('link', { name: 'Shopping list' }));
  expect(screen).toHavePathname('/shopping-list');
}

async function addItem(name: string) {
  await fireEvent.changeText(screen.getByLabelText('New item'), name);
  await fireEvent.press(screen.getByRole('button', { name: 'Add item' }));
}

describe('Shopping list screen', () => {
  it('is linked from the home screen and starts empty', async () => {
    await openShoppingList();

    expect(screen.getByText('Your list is empty')).toBeOnTheScreen();
  });

  it('adds an item and clears the text box', async () => {
    await openShoppingList();

    await addItem('Milk');

    expect(screen.getByRole('checkbox', { name: 'Milk' })).toBeOnTheScreen();
    expect(screen.getByLabelText('New item')).toHaveDisplayValue('');
    expect(screen.queryByText('Your list is empty')).not.toBeOnTheScreen();
  });

  it('ignores blank items and trims spaces', async () => {
    await openShoppingList();

    await addItem('   ');
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);

    await addItem('  Eggs  ');
    expect(screen.getByRole('checkbox', { name: 'Eggs' })).toBeOnTheScreen();
  });

  it('marks an item as bought and back again', async () => {
    await openShoppingList();
    await addItem('Bread');

    const bread = screen.getByRole('checkbox', { name: 'Bread' });
    expect(bread).not.toBeChecked();

    await fireEvent.press(bread);
    expect(screen.getByRole('checkbox', { name: 'Bread' })).toBeChecked();

    await fireEvent.press(screen.getByRole('checkbox', { name: 'Bread' }));
    expect(screen.getByRole('checkbox', { name: 'Bread' })).not.toBeChecked();
  });

  it('shows how many items are left to buy', async () => {
    await openShoppingList();
    await addItem('Apples');
    await addItem('Rice');

    expect(screen.getByText('2 left to buy')).toBeOnTheScreen();

    await fireEvent.press(screen.getByRole('checkbox', { name: 'Apples' }));
    expect(screen.getByText('1 left to buy')).toBeOnTheScreen();
  });

  it('removes an item', async () => {
    await openShoppingList();
    await addItem('Milk');
    await addItem('Tea');

    await fireEvent.press(screen.getByRole('button', { name: 'Remove Milk' }));

    expect(screen.queryByRole('checkbox', { name: 'Milk' })).not.toBeOnTheScreen();
    expect(screen.getByRole('checkbox', { name: 'Tea' })).toBeOnTheScreen();
  });
});
