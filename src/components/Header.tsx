import { Link } from 'react-router-dom'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface HeaderProps {
  cartItemCount: number
}

const Header = ({ cartItemCount }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-blue-700"
          >
            {/* Logo Placeholder */}
            <span className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold">
              P
            </span>
            Product Showcase
          </Link>
          <button
            className="sm:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  menuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
          <nav className="hidden sm:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-600"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <nav className="sm:hidden flex flex-col gap-2 py-2 animate-fade-in">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 relative"
              onClick={() => setMenuOpen(false)}
            >
              <span className="inline-flex items-center">
                <ShoppingCartIcon className="h-6 w-6 mr-1" />
                Cart
                {cartItemCount > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
