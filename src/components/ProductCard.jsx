import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="group relative w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Discount Tag */}
      {product.discount > 0 && (
        <div className="absolute top-4 left-4 z-10">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
          >
            {product.discount}% OFF
          </motion.div>
        </div>

      )}

      {/* Image Container */}
      <div className="relative h-64 bg-gray-50 p-6">
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
            {product.category}
          </span>
        </div>
        <img
          className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
          src={product.image}
          alt={product.title}
        />
        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity duration-300">
          <Link
            to={`/products/${product.id}`}
            className="bg-white text-gray-900 px-5 py-2 rounded-lg font-medium text-sm shadow-md hover:bg-gray-100 transition duration-200"
          >
            <Eye className="inline-block w-4 h-4 mr-2" />
            Quick View
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Description */}
        <div className="mb-4">
          <h3
            className="text-lg font-semibold text-gray-900 leading-tight mb-1 truncate"
            title={product.title}
          >
            {product.title}
          </h3>
          <p
            className="text-sm text-gray-500 line-clamp-2"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
            }}
            title={product.description}
          >
            {product.description}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-baseline mb-6">
          <span className="text-2xl font-bold text-gray-900">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link
            to={`/products/${product.id}`}
            className="flex-1"
          >
            <button className="w-full bg-black hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200">
              View Details
            </button>
          </Link>
          <button className="px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200">
            Amazon
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
