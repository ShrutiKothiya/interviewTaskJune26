import type { FilterOptions } from '../types';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface FilterSidebarProps {
  categories: string[];
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterSidebar = ({ categories, filters, onFilterChange }: FilterSidebarProps) => {
  const handleCategoryChange = (category: string) => {
    onFilterChange({ ...filters, category });
  };

  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({ ...filters, minPrice: min, maxPrice: max });
  };

  return (
    <Card className="w-full sm:w-64 p-4 sm:p-6 shadow-none border-b sm:border-b-0 sm:border-r border-gray-100 mb-4 sm:mb-0 h-auto sm:h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        <Select
          options={[{ label: 'All Categories', value: '' }, ...categories.map((c) => ({ label: c, value: c }))]}
          value={filters.category}
          onChange={handleCategoryChange}
          className="w-full"
        />
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Price Range</h3>
        <div className="flex gap-2 flex-col sm:flex-row">
          <Input
            type="number"
            className="w-full sm:w-1/2"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => handlePriceChange(Number(e.target.value), filters.maxPrice)}
            min={0}
          />
          <Input
            type="number"
            className="w-full sm:w-1/2"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => handlePriceChange(filters.minPrice, Number(e.target.value))}
            min={0}
          />
        </div>
      </div>
    </Card>
  );
};

export default FilterSidebar;
