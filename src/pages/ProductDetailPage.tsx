import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '../types';
import { getProducts } from '../services/api';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <Button onClick={() => navigate(-1)} variant="secondary">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-10 max-w-5xl mx-auto py-12 px-4">
      <div className="flex-1 flex items-center justify-center">
        <Card className="p-6 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white shadow-xl">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 w-auto object-contain rounded-lg shadow-md border border-gray-100"
          />
        </Card>
      </div>
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.title}</h1>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold text-blue-600">${product.price.toFixed(2)}</span>
          <span className="inline-flex items-center gap-1 text-yellow-500 font-medium">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
            {product.rating.rate} <span className="text-gray-500 text-sm">({product.rating.count} reviews)</span>
          </span>
        </div>
        <div className="text-gray-700 text-lg leading-relaxed">{product.description}</div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wide">{product.category}</span>
        </div>
        <div className="mt-6 flex gap-4">
          <Button size="lg" className="w-40">Add to Cart</Button>
          <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>Back to Products</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
