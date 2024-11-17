import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ShoppingCart,
  CreditCard,
  Package,
  Star,
  Tag,
  Briefcase,
  Palette,
  Box,
  Stars,
  Sparkles
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

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

const FeatureBox = ({ icon: Icon, label, value }) => (
  <motion.div
    variants={fadeIn}
    whileHover={{ scale: 1.05 }}
    className="group flex items-center gap-3 p-3 bg-black/40 rounded-lg border border-purple-900/40 backdrop-blur-sm"
  >
    <div className="p-2 bg-purple-950/80 rounded-lg">
      <Icon className="w-4 h-4 text-purple-400" />
    </div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-purple-300 font-medium">{value}</p>
    </div>
  </motion.div>
);

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const API_URL = 'http://localhost/ca3';

  useEffect(() => {
    const fetchProduct = async (id) => {
      try {
        const response = await axios.get(`${API_URL}/api/getProductById.php?id=${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product", error);
        toast.error("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct(id);
  }, [id]);

  async function addToCart() {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast.error('Please login to add to cart');
        return;
      }
      await axios.post(`${API_URL}/api/add-to-cart.php`, { userId, productId: id });
      toast.success('Product added to cart');
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error('Error adding to cart');
    }
  }

  async function buyNow() {
    try{
      const userId = localStorage.getItem('userId');
      if(!userId){
        toast.error('Please login to buy now');
        return;
      }
      await axios.post(`${API_URL}/api/add-to-cart.php`, { userId, productId: id });
      toast.success('Product added to cart');
      toast('Redirecting to orders page...');
      setTimeout(() => {
        window.location.href = '/user/cart';
      },1000);
    } catch (error) {
      console.error("Error buying now", error);
      toast.error('Error buying now');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-12 h-12 border-t-2 border-purple-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black relative overflow-hidden py-8">
        {/* Magical Particles */}
        <div className="fixed inset-0 opacity-40">
          {[...Array(20)].map((_, i) => (
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

        <div className="relative py-24 px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            {/* Product Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 border border-purple-500/30 mb-8 backdrop-blur-xl"
              >
                <Stars className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-purple-300 font-serif">Premium Collection</span>
              </motion.div>
            </div>

            {/* Product Content */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* Image Section */}
              <motion.div
                variants={fadeIn}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-2xl border border-purple-900/40 backdrop-blur-xl">
                  <motion.img
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ 
                      opacity: imageLoaded ? 1 : 0,
                      scale: imageLoaded ? 1 : 1.1
                    }}
                    transition={{ duration: 0.5 }}
                    src={product.image}
                    alt={product.title}
                    onLoad={() => setImageLoaded(true)}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                
                {product.discount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold backdrop-blur-xl"
                  >
                    {product.discount}% OFF
                  </motion.div>
                )}
              </motion.div>

              {/* Details Section */}
              <motion.div
                variants={fadeIn}
                className="space-y-8"
              >
                <div>
                  <motion.h1
                    variants={fadeIn}
                    className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4"
                  >
                    {product.title}
                  </motion.h1>
                  <motion.p
                    variants={fadeIn}
                    className="text-gray-300 leading-relaxed"
                  >
                    {isDescriptionExpanded
                      ? product.description
                      : `${product.description.slice(0, 100)}...`}
                  </motion.p>
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="text-purple-400 font-medium underline mt-2"
                  >
                    {isDescriptionExpanded ? "View Less" : "View More"}
                  </button>
                </div>

                <motion.div
                  variants={fadeIn}
                  className="flex items-center gap-4"
                >
                  <span className="text-4xl font-serif bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </span>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-2 gap-4"
                >
                  <FeatureBox icon={Tag} label="Category" value={product.category} />
                  <FeatureBox icon={Briefcase} label="Brand" value={product.brand} />
                  <FeatureBox icon={Box} label="Model" value={product.model} />
                  <FeatureBox icon={Palette} label="Color" value={product.color} />
                </motion.div>

                <motion.div
                  variants={fadeIn}
                  className="flex gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl overflow-hidden"
                    onClick={addToCart}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative flex items-center justify-center gap-2 text-white font-medium">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden"
                    onClick={buyNow}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative flex items-center justify-center gap-2 text-white font-medium">
                      <CreditCard className="w-5 h-5" />
                      Buy Now
                    </span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}