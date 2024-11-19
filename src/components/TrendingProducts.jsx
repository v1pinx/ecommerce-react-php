import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const API_URL = import.meta.env.VITE_API_URL;

export default function TrendingProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/products.php?limit=3`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-5xl font-bold pb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                Trending Products
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <DiscountBanner />
        </div>
    );
}

const DiscountBanner = () => (
    <div
        className="relative mt-16 h-[550px] bg-cover bg-center rounded-lg shadow-lg"
        style={{
            backgroundImage:
                "url(//techno-workdo.myshopify.com/cdn/shop/files/discount-banner.png?v=1714633110)",
        }}
    >
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
                {/* <form className="mt-4">
                    <input type="hidden" name="id" value="49045816312081" /> */}
                <button className="px-4 py-2 text-sm md:text-lg bg-blue-500 hover:bg-white hover:text-black transition text-white mt-4" onClick={() => window.location.href = '/products'}>
                    Shop Now
                </button>
                {/* </form> */}
            </div>
        </div>
    </div>
);
