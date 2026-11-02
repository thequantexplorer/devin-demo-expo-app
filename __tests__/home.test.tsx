import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';

describe('Home screen', () => {
  it('shows the home screen', async () => {
    await renderRouter('./src/app');

    expect(screen).toHavePathname('/');
    expect(screen.getByText('Good to see you')).toBeOnTheScreen();
  });

  it('opens the About screen', async () => {
    await renderRouter('./src/app');

    await fireEvent.press(screen.getByRole('link', { name: 'About' }));

    expect(screen).toHavePathname('/about');
    expect(screen.getByText(/runs on the web, Android and iOS/)).toBeOnTheScreen();
  });
});
