import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Product, CartItem } from './types';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

const queryClient = new QueryClient();

function getCartFromSession(): CartItem[] {
  try {
    const data = sessionStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCartToSession(cart: CartItem[]) {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

function App() {
  const [cart, setCart] = useState<CartItem[]>(getCartFromSession());

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [...prev, { ...product, quantity: 1 }];
      }
      saveCartToSession(updated);
      return updated;
    });
  };

  const handleSetCart = (newCart: CartItem[]) => {
    saveCartToSession(newCart);
    setCart(newCart);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage cart={cart} setCart={handleSetCart} />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
