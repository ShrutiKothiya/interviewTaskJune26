import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Product, FilterOptions, SortOption } from '../types';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import type { SelectOption } from '../ui/Select';

interface HomePageProps {
  onAddToCart: (product: Product) => void;
}

const HomePage = ({ onAddToCart }: HomePageProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>('popularity');
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    minPrice: 0,
    maxPrice: 0,
  });
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const filteredProducts = products
    .filter((product: Product) => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.minPrice && product.price < filters.minPrice) return false;
      if (filters.maxPrice && product.price > filters.maxPrice) return false;
      return true;
    })
    .sort((a: Product, b: Product) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'popularity':
          return b.rating.count - a.rating.count;
        default:
          return 0;
      }
    });

  const productsPerPage = 10;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50">
      <aside className="sm:block w-full sm:w-64 flex-shrink-0 h-auto sm:h-screen sm:sticky sm:top-0">
        <FilterSidebar
          categories={categories}
          filters={filters}
          onFilterChange={setFilters}
        />
      </aside>
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Products</h1>
          <div className="flex items-center gap-2">
            <Select
              options={[
                { label: 'Popularity', value: 'popularity' },
                { label: 'Price: Low to High', value: 'price-asc' },
                { label: 'Price: High to Low', value: 'price-desc' },
                { label: 'Name: A to Z', value: 'name-asc' },
                { label: 'Name: Z to A', value: 'name-desc' },
              ] as SelectOption[]}
              value={sortOption}
              onChange={(v) => setSortOption(v as SortOption)}
              label="Sort by:"
              className="w-56"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2 items-center">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              variant="secondary"
              size="sm"
              disabled={currentPage === 1}
              className="border border-gray-300"
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                variant={currentPage === page ? 'primary' : 'secondary'}
                size="sm"
                className={currentPage === page ? '' : 'border border-gray-300'}
              >
                {page}
              </Button>
            ))}
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              variant="secondary"
              size="sm"
              disabled={currentPage === totalPages}
              className="border border-gray-300"
            >
              Next
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
