import type { CartItem } from '../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface CartPageProps {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}

const CartPage = ({ cart, setCart }: CartPageProps) => {
  const handleRemove = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  const handleQuantity = (id: number, qty: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-gray-500 text-lg">Your cart is empty.</div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <Card key={item.id} className="flex items-center gap-4 p-4">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-contain rounded border" />
              <div className="flex-1">
                <div className="font-semibold text-lg text-gray-900">{item.title}</div>
                <div className="text-gray-600">${item.price.toFixed(2)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <label htmlFor={`qty-${item.id}`} className="text-sm text-gray-700">Qty:</label>
                  <input
                    id={`qty-${item.id}`}
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => handleQuantity(item.id, Number(e.target.value))}
                    className="w-16 border rounded px-2 py-1 text-center"
                  />
                </div>
              </div>
              <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>
                Remove
              </Button>
            </Card>
          ))}
          <div className="flex justify-end items-center gap-4 mt-8">
            <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
            <Button size="lg" className="w-40">Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
