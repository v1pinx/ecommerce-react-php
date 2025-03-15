import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Search, Filter, Package, Sparkles, ChevronLeft, ChevronRight, Stars } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const MagicalSelect = ({ label, value, onChange, options, icon: Icon }) => (
  <div className="relative">
    <label className="block text-purple-300 mb-2 font-serif">{label}</label>
    <div className="relative group">
      <select
        value={value}
        onChange={onChange}
        className="w-full p-4 pl-12 bg-black/40 border border-purple-900/40 rounded-xl focus:outline-none focus:border-purple-500/50 text-gray-200 backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-gray-900">
            {option.label}
          </option>
        ))}
      </select>
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500/50 group-hover:text-purple-400 transition-colors duration-300" />
    </div>
  </div>
);

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
      const url = `${API_URL}/products.php?page=${page}&limit=${productsPerPage}&type=${category}&sort=${sortBy}`;
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
        const response = await axios.get(`${API_URL}/getCategory.php`);
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
      <div className="flex items-center justify-center h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black relative overflow-hidden">
      {/* Magical Particles */}
      <div className="fixed inset-0 opacity-40">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
              y: [Math.random() * 100, Math.random() * window.innerHeight],
              x: [Math.random() * 100, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-32 px-4"
      >
        <motion.div
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 blur-3xl"
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 border border-purple-500/30 mb-8 backdrop-blur-xl"
          >
            <Stars className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-purple-300 font-serif">Discover Our Magical Collection</span>
          </motion.div>

          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl font-serif font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6"
          >
            Product Gallery
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl text-gray-400 font-serif"
          >
            The world is yours to explore with our cutting-edge technology, empowering endless possibilities.
          </motion.p>
        </div>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MagicalSelect
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: '', label: 'All Categories' },
              ...categories.map(cat => ({
                value: cat,
                label: capitalizeFirstLetter(cat)
              }))
            ]}
            icon={Package}
          />

          <MagicalSelect
            label="Sort By"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: '', label: 'Default' },
              { value: 'asc', label: 'Price: Low to High' },
              { value: 'desc', label: 'Price: High to Low' }
            ]}
            icon={Filter}
          />

          <MagicalSelect
            label="Products Per Page"
            value={productsPerPage}
            onChange={(e) => {
              setProductsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            options={[
              { value: 12, label: '12' },
              { value: 21, label: '21' },
              { value: 51, label: '51' }
            ]}
            icon={Sparkles}
          />

          <div className="relative">
            <label className="block text-purple-300 mb-2 font-serif">Search</label>
            <div className="relative group">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 pl-12 bg-black/40 border border-purple-900/40 rounded-xl focus:outline-none focus:border-purple-500/50 text-gray-200 placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500/50 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto"
      >
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-12 mb-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-6 py-3 bg-gradient-to-r from-purple-900 to-blue-900 text-purple-100 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </motion.button>

        <span className="text-purple-300 font-serif">Page {currentPage}</span>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextPage}
          disabled={products.length < productsPerPage}
          className="px-6 py-3 bg-gradient-to-r from-purple-900 to-blue-900 text-purple-100 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default function ProductShowcaseWrapper() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black text-purple-300">
        Loading...
      </div>
    }>
      <ProductShowcase />
    </Suspense>
  );
}