import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { ReactNode } from 'react';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should start with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.cartTotalItems).toBe(0);
  });

  it('should add items to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const item = {
      productId: '1',
      name: 'Phone',
      brand: 'Brand',
      imageUrl: 'url',
      color: 'Black',
      storage: '128GB',
      price: 100,
      quantity: 1,
    };

    act(() => {
      result.current.addToCart(item);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartTotalItems).toBe(1);
    expect(result.current.cartTotalPrice).toBe(100);
  });

  it('should increase quantity if same item is added', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const item = {
      productId: '1',
      name: 'Phone',
      brand: 'Brand',
      imageUrl: 'url',
      color: 'Black',
      storage: '128GB',
      price: 100,
      quantity: 1,
    };

    act(() => {
      result.current.addToCart(item);
      result.current.addToCart(item);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
    expect(result.current.cartTotalItems).toBe(2);
    expect(result.current.cartTotalPrice).toBe(200);
  });

  it('should remove items from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const item = {
      productId: '1',
      name: 'Phone',
      brand: 'Brand',
      imageUrl: 'url',
      color: 'Black',
      storage: '128GB',
      price: 100,
      quantity: 1,
    };

    act(() => {
      result.current.addToCart(item);
    });

    expect(result.current.cartItems).toHaveLength(1);

    act(() => {
      result.current.removeFromCart('1', 'Black', '128GB');
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.cartTotalItems).toBe(0);
  });
});
