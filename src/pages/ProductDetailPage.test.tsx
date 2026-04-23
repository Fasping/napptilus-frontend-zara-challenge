import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetailPage from './ProductDetailPage';
import { CartProvider } from '../context/CartContext';
import * as api from '../services/api';

vi.mock('../services/api');

const mockProduct = {
  id: '1',
  name: 'Mock Phone',
  brand: 'Mock Brand',
  basePrice: 100,
  description: 'Description',
  imageUrl: 'url',
  colorOptions: [
    { name: 'Black', hexCode: '#000', imageUrl: 'black-url' }
  ],
  storageOptions: [
    { capacity: '128GB', price: 0 }
  ],
  specs: {},
  similarProducts: []
};

describe('ProductDetailPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should disable "Add to Cart" button until color and storage are selected', async () => {
    vi.mocked(api.getProductById).mockResolvedValue(mockProduct);

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <CartProvider>
          <Routes>
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </CartProvider>
      </MemoryRouter>
    );

    // Wait for product to load
    await waitFor(() => expect(screen.queryByText('Loading product...')).not.toBeInTheDocument());

    const addButton = screen.getByText('AÑADIR');
    expect(addButton).toBeDisabled();

    // Select color
    const colorBtn = screen.getByLabelText(/Select color Black/i);
    fireEvent.click(colorBtn);
    expect(addButton).toBeDisabled();

    // Select storage
    const storageBtn = screen.getByLabelText(/Select storage 128GB/i);
    fireEvent.click(storageBtn);

    // Button should now be enabled
    expect(addButton).not.toBeDisabled();
  });
});
