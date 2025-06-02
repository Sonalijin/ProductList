import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import Products from '../Products';
import productsReducer from '../../redux/features/productsSlice';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock products data
const mockProducts = [
  {
    id: 1,
    title: "Test Product 1",
    description: "Test Description 1",
    price: 99.99,
    image: "test-image-1.jpg"
  },
  {
    id: 2,
    title: "Test Product 2",
    description: "Test Description 2",
    price: 149.99,
    image: "test-image-2.jpg"
  },
  {
    id: 3,
    title: "Different Item",
    description: "Different Description",
    price: 199.99,
    image: "test-image-3.jpg"
  }
];

// Setup store for testing
const setupStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer
    }
  });
};

// Wrapper component with providers
const renderWithProviders = (component: React.ReactElement) => {
  const store = setupStore();
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('Products Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    mockedAxios.get.mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    );
    
    renderWithProviders(<Products />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state when API call fails', async () => {
    const errorMessage = 'Failed to fetch products';
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));
    
    renderWithProviders(<Products />);
    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  test('renders products successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });
    
    renderWithProviders(<Products />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
      expect(screen.getByText('$99.99')).toBeInTheDocument();
      expect(screen.getByText('$149.99')).toBeInTheDocument();
    });
  });

  test('search functionality works correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });
    
    renderWithProviders(<Products />);
    
    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    // Get the search input and type in it
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'Different' } });

    // Wait for debounce and check filtered results
    await waitFor(() => {
      expect(screen.queryByText('Test Product 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
      expect(screen.getByText('Different Item')).toBeInTheDocument();
    });
  });

  test('shows no results message when search finds nothing', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });
    
    renderWithProviders(<Products />);
    
    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    // Search for non-existent product
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    // Check for no results message
    await waitFor(() => {
      expect(screen.getByText('No products found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search item or browse our full collection')).toBeInTheDocument();
    });
  });

  test('pagination works correctly', async () => {
    // Create more mock products for pagination
    const manyProducts = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      description: `Description ${i + 1}`,
      price: 99.99,
      image: `image-${i + 1}.jpg`
    }));

    mockedAxios.get.mockResolvedValueOnce({ data: manyProducts });
    
    renderWithProviders(<Products />);
    
    // Wait for initial products to load
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    // Find and click the next page button (2)
    const pageButton = screen.getByRole('button', { name: '2' });
    fireEvent.click(pageButton);

    // Check if next page products are shown
    await waitFor(() => {
      expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
      expect(screen.getByText('Product 7')).toBeInTheDocument();
    });
  });
}); 