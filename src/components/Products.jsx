import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import toast, { Toaster } from 'react-hot-toast';
const API_URL = 'http://localhost/ca3';

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('');

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const url = `${API_URL}/api/products.php?page=${page}&limit=${productsPerPage}&type=${category}&sort=${sortBy}`;
      const response = await axios.get(url);
      const fetchedProducts = response.data;

      if (fetchedProducts.length === 0 && currentPage > 1) {
        toast.error('No more products available.');
      }

      setProducts(fetchedProducts);
      if (!category) {
        toast.success('Products loaded successfully!');
      }
    } catch (error) {
      console.error('Error fetching data', error);
      toast.error('Failed to load products!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, category, sortBy, productsPerPage]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/getCategory.php`);   
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleNextPage = () => {
    if (products.length === productsPerPage) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleProductsPerPageChange = (e) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pt-6">
      <Toaster />
      <div
        className="bg-cover bg-center min-h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: "url(//techno-workdo.myshopify.com/cdn/shop/files/common-banner.png?v=1714735867)",
        }}
      >
        <div className="text-center text-white p-6 backdrop-blur-md bg-black/50 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold tracking-wider">Product Gallary</h1>
          <p className="mt-2 text-lg font-light">The world is yours to explore with our cutting-edge tech.</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-6 mt-12 ">
        <div className="w-64">
          <label className="block text-sm font-medium text-gray-200 mb-1">Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="block w-full border border-gray-600 bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {capitalizeFirstLetter(cat)}
              </option>
            ))}
          </select>
        </div>

        <div className="w-64">
          <label className="block text-sm font-medium text-gray-200 mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="block w-full border border-gray-600 bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        <div className="w-64">
          <label className="block text-sm font-medium text-gray-200 mb-1">Products Per Page</label>
          <select
            value={productsPerPage}
            onChange={handleProductsPerPageChange}
            className="block w-full border border-gray-600 bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value={12}>12</option>
            <option value={21}>21</option>
            <option value={51}>51</option>
          </select>
        </div>

        <div className="w-64">
          <label className="block text-sm font-medium text-gray-200 mb-1">Search</label>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="block w-full border border-gray-600 bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-600 text-white rounded-md disabled:bg-gray-400"
        >
          Previous
        </button>

        <span className="text-white">Page {currentPage}</span>

        <button
          onClick={handleNextPage}
          disabled={products.length < productsPerPage}
          className="px-3 py-1 bg-gray-600 text-white rounded-md disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Export the component wrapped in a Suspense boundary
export default function ProductShowcaseWrapper() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ProductShowcase />
    </Suspense>
  );
}
