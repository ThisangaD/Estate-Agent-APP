import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { FavoritesProvider } from './context/FavoritesContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HashRouter } from 'react-router-dom';

// This simulates full app environment for accurate integration testing
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
                longDescription: '<p>This charming semi-detached house... family bathroom with separate WC...</p>',
                images: ['/images/prop1-1.png', '/images/prop1-2.png'], // Add this to prevent .map error
              },
              {
                id: 'prop2',
                type: 'Flat',
                bedrooms: 2,
                price: 450000,
                location: 'London SW1',
                picture: '/images/prop2-main.png',
                description: 'Modern two bed flat...',
                longDescription: '<p>Modern flat...</p>',
                images: ['/images/prop2-1.png'],
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
    expect(screen.getByText('Any')).toBeInTheDocument(); // Type select shows "Any"
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  test('filters properties by type (House)', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText(/£750,000/i);

    const typeSelect = screen.getByText('Any');
    await user.click(typeSelect);
    await user.click(screen.getByText('House')); // Select "House" from dropdown

    const searchButton = screen.getByRole('button', { name: /Search/i });
    await user.click(searchButton);

    expect(screen.getByText(/£750,000/i)).toBeInTheDocument();
    expect(screen.queryByText(/£450,000/i)).not.toBeInTheDocument();
  });

  test('filters properties by max price', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText(/£750,000/i);

    const maxPriceInput = screen.getByPlaceholderText(/e.g. 1500000/i);
    await user.type(maxPriceInput, '500000');

    const searchButton = screen.getByRole('button', { name: /Search/i });
    await user.click(searchButton);

    expect(screen.getByText(/£450,000/i)).toBeInTheDocument();
    expect(screen.queryByText(/£750,000/i)).not.toBeInTheDocument();
  });

  test('adds and removes a property from favorites', async () => {
    const user = userEvent.setup();
    renderApp();

    const addButtons = await screen.findAllByRole('button', { name: /Add to Favorites/i });
    await user.click(addButtons[0]);

    expect(screen.getByRole('button', { name: /Added ❤️/i })).toBeInTheDocument();
    expect(screen.getByText(/Favorites \(1\)/i)).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: 'Remove' });
    await user.click(removeButton);

    expect(screen.getByText(/Favorites \(0\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Drag properties here/i)).toBeInTheDocument();
  });

  test('shows "No properties found" message when filters match nothing', async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByText(/£750,000/i);

    const maxPriceInput = screen.getByPlaceholderText(/e.g. 1500000/i);
    await user.type(maxPriceInput, '100000');

    const searchButton = screen.getByRole('button', { name: /Search/i });
    await user.click(searchButton);

    expect(screen.getByText(/No properties found matching your criteria/i)).toBeInTheDocument();
    expect(screen.getByText(/Try adjusting your filters/i)).toBeInTheDocument();
  });

  test('navigates to property detail page when View Details is clicked', async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByText(/£750,000/i);

    const detailButtons = screen.getAllByRole('button', { name: /View Details/i });
    await user.click(detailButtons[0]);

    expect(await screen.findByText(/family bathroom with separate WC/i)).toBeInTheDocument();
  });
});