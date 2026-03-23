import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import App from './App';

vi.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

afterEach(() => {
  vi.restoreAllMocks();
});

test('renders help center header', async () => {
  vi.spyOn(global, 'fetch').mockImplementation((url) => {
    if (String(url).includes('sidebar.json')) {
      return Promise.resolve({
        ok: true,
        json: async () => ({ docs: [{ title: 'Home', id: 'index' }] }),
      });
    }
    return Promise.resolve({
      ok: true,
      text: async () => '# Welcome',
    });
  });

  render(<App />);

  expect(screen.getByText(/catmapper help center/i)).toBeInTheDocument();
  await waitFor(async () => {
    const homeItems = await screen.findAllByText('Home');
    expect(homeItems.length).toBeGreaterThan(0);
  });
});
