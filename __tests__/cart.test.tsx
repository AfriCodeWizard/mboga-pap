import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '../components/CartContext';

function TestCartComponent() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  return (
    <div>
      <button onClick={() => addToCart({ vendorId: 1, vendorName: 'Test Vendor', itemId: 1, name: 'Tomato', price: '100', quantity: 1, image: '/placeholder.svg' })}>
        Add Tomato
      </button>
      <button onClick={clearCart}>Clear Cart</button>
      <ul data-testid="cart-list">
        {cart.map((item) => (
          <li key={item.itemId}>{item.name} x{item.quantity}</li>
        ))}
      </ul>
    </div>
  );
}

describe('CartContext', () => {
  it('adds and clears items in the cart', () => {
    render(
      <CartProvider>
        <TestCartComponent />
      </CartProvider>
    );
    const addButton = screen.getByText('Add Tomato');
    fireEvent.click(addButton);
    expect(screen.getByTestId('cart-list')).toHaveTextContent('Tomato x1');
    const clearButton = screen.getByText('Clear Cart');
    fireEvent.click(clearButton);
    expect(screen.getByTestId('cart-list')).toBeEmptyDOMElement();
  });
}); 