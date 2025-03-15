import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const API_URL = import.meta.env.VITE_API_URL;

// Define DiscountBanner component before it's used
const DiscountBanner = () => (
  <div className="relative mt-16 h-[550px] bg-cover bg-center rounded-lg shadow-lg" 
       style={{ backgroundImage: "url(//techno-workdo.myshopify.com/cdn/shop/files/discount-banner.png?v=1714633110)" }}>
    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center p-8 rounded-lg">
      <div className="text-center space-y-2">
        <div className="text-lg text-white">BIG DISCOUNT</div>
        <h2 className="text-4xl font-bold text-white">
          <a href="/products">Apple iPhone 15 Pro Max</a>
        </h2>
        <div className="flex items-center justify-center space-x-4 text-xl">
          <div className="text-red-500 font-semibold">$50.00</div>
          <del className="text-blue-300 text-sm">$55.00</del>
        </div>
        <button 
          className="px-4 py-2 text-sm md:text-lg bg-blue-500 hover:bg-white hover:text-black transition text-white mt-4"
          onClick={() => window.location.href = '/products'}
        >
          Shop Now
        </button>
      </div>
    </div>
  </div>
);

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/products.php?limit=3`);
        
        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (response.data && typeof response.data === 'object') {
          // If it's an object with data inside, try to extract the array
          // Common API patterns include { data: [...] }, { products: [...] }, etc.
          const dataArray = response.data.data || response.data.products || [];
          setProducts(Array.isArray(dataArray) ? dataArray : []);
        } else {
          // If we can't determine the structure, set an empty array
          setProducts([]);
          setError('Unexpected data format from API');
        }
      } catch (error) {
        console.error('Error fetching data', error);
        setError('Failed to fetch products');
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-5xl font-bold pb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
        Trending Products
      </h2>
      
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="text-lg">Loading products...</div>
        </div>
      )}
      
      {error && (
        <div className="flex justify-center py-8">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      )}
      
      {!isLoading && !error && (
        <div className="flex flex-wrap justify-center gap-6">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="text-lg py-8">No products found</div>
          )}
        </div>
      )}
      
      <DiscountBanner />
    </div>
  );
}