import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

test('renders help center header', async () => {
  const fetchMock = jest.spyOn(global, 'fetch').mockImplementation((url) => {
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

  fetchMock.mockRestore();
});
