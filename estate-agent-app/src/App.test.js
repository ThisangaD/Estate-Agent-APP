import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app without crashing', () => {
  render(<App />);
  expect(screen.getByText(/Find your dream home in London/i)).toBeInTheDocument();
});

test('renders search form', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Find Your Property/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
});

test('renders favorites section', () => {
  render(<App />);
  expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
});