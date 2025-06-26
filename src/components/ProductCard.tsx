import { StarIcon } from '@heroicons/react/20/solid';
import type { Product } from '../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import type { KeyboardEvent } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const navigate = useNavigate();
  const handleCardClick = () => navigate(`/product/${product.id}`);
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') handleCardClick();
  };
  return (
    <div
      className="flex flex-col h-full transition-shadow hover:shadow-xl group cursor-pointer"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.title}`}
      onKeyDown={handleKeyDown}
    >
      <Card className="flex flex-col h-full">
        <div className="aspect-w-1 aspect-h-1 w-full bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-32 w-auto object-contain object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-base font-semibold text-gray-900 truncate mb-1">
            {product.title}
          </h3>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-lg font-bold text-blue-700">${product.price}</p>
            <div className="flex items-center gap-0.5">
              <StarIcon className="h-4 w-4 text-yellow-400" aria-hidden="true" />
              <span className="ml-0.5 text-xs text-gray-600">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="mt-4 w-full"
            variant="primary"
            size="sm"
          >
            Add to Cart
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
