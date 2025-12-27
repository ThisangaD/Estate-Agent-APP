import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { FavoritesProvider } from './context/FavoritesContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HashRouter } from 'react-router-dom';

const renderApp = () => {
  return render(
    <DndProvider backend={HTML5Backend}>
      <FavoritesProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </FavoritesProvider>
    </DndProvider>
  );
};

describe('Estate Agent App', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            properties: [
              {
                id: 'prop1',
                type: 'House',
                bedrooms: 3,
                price: 750000,
                location: 'Petts Wood Road, Petts Wood, Orpington BR5',
                picture: '/images/prop1-main.png',
                description: 'Attractive three bedroom...',
              },
              {
                id: 'prop2',
                type: 'Flat',
                bedrooms: 2,
                price: 450000,
                location: 'London SW1',
                picture: '/images/prop2-main.png',
                description: 'Modern two bed flat...',
              },
            ],
          }),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders header and search form', async () => {
    renderApp();
    expect(await screen.findByText(/Find your dream home in London/i)).toBeInTheDocument();
    expect(screen.getByText(/Find Your Property/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  test('filters properties by type (House)', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText(/£750,000/i);

    const typeSelect = screen.getByLabelText(/Type/i);
    await user.selectOptions(typeSelect, 'House');

    const searchButton = screen.getByRole('button', { name: /Search/i });
    await user.click(searchButton);

    expect(screen.getByText(/£750,000/i)).toBeInTheDocument();
    expect(screen.queryByText(/£450,000/i)).not.toBeInTheDocument();
  });

  test('filters properties by max price', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText(/£750,000/i);

    const maxPriceInput = screen.getByLabelText(/Max Price/i);
    await user.type(maxPriceInput, '500000');

    const searchButton = screen.getByRole('button', { name: /Search/i });
    await user.click(searchButton);

    expect(screen.getByText(/£450,000/i)).toBeInTheDocument();
    expect(screen.queryByText(/£750,000/i)).not.toBeInTheDocument();
  });

  test('adds and removes a property from favorites', async () => {
    const user = userEvent.setup();
    renderApp();

    // Use findAllByRole to get all buttons, then click the first one
    const addButtons = await screen.findAllByRole('button', { name: /Add to Favorites/i });
    await user.click(addButtons[0]);

    expect(screen.getByRole('button', { name: /Added ❤️/i })).toBeInTheDocument();
    expect(screen.getByText(/Favorites \(1\)/i)).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: 'Remove' });
    await user.click(removeButton);

    expect(screen.getByText(/Favorites \(0\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Drag properties here/i)).toBeInTheDocument();
  });
});