import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Package, Calendar, CreditCard, Clock, ChevronDown, ChevronUp, Stars, Sparkles } from 'lucide-react';

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

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(false);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/api/getProductById.php?id=${productId}`);
      if (!response.ok) throw new Error("Failed to fetch product details");
      const data = await response.json();
      return data.product;
    } catch (err) {
      console.error("Error fetching product details:", err);
      return null;
    }
  };

  const handleToggleDetails = async () => {
    setIsExpanded(!isExpanded);

    if (!isExpanded && order.items) {
      setLoadingDetails(true);

      const details = await Promise.all(
        order.items.map(async (item) => {
          const productDetail = await fetchProductDetails(item.productId);
          return { productId: item.productId, ...productDetail };
        })
      );

      const detailsMap = details.reduce((acc, detail) => {
        if (detail) acc[detail.productId] = detail;
        return acc;
      }, {});

      setProductDetails(detailsMap);
      setLoadingDetails(false);
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="group relative backdrop-blur-xl bg-black/40 p-6 rounded-xl border border-purple-900/40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-purple-950/80 rounded-lg"
            >
              <ShoppingBag className="w-5 h-5 text-purple-400" />
            </motion.div>
            <div>
              <h3 className="font-serif text-xl text-purple-300">Order #{order.id}</h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(order.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-serif bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ${parseFloat(order.total_amount).toFixed(2)}
            </div>
            {/* <div className={`text-sm ${statusColors[order.status.toLowerCase()] || 'text-gray-400'}`}>
              {order.status}
            </div> */}
          </div>
        </div>

        <motion.div
          animate={{ height: isExpanded ? 'auto' : 0 }}
          initial={false}
          className="overflow-hidden transition-height duration-300 ease-in-out"
        >
          <div className="space-y-4 pt-4 border-t border-purple-900/40">
            {loadingDetails ? (
              <div className="text-center text-gray-400 font-medium">Loading product details...</div>
            ) : (
              order.items &&
              order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-4 p-4 bg-black/20 rounded-lg shadow-md cursor-pointer"
                  onClick={() => window.location.href = `/products/${item.productId}`}
                >
                  {/* Product Image */}
                  {productDetails[item.productId]?.image && (
                    <div className="flex-shrink-0 w-full md:w-28 h-28">
                      <img
                        src={productDetails[item.productId].image}
                        alt={productDetails[item.productId].title || 'Product'}
                        className="w-full h-full object-cover rounded-lg border border-gray-700"
                      />
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="flex flex-col justify-between flex-grow">
                    <div className="text-gray-300">
                      <h4 className="font-semibold text-lg">{productDetails[item.productId]?.title || 'Unknown Product'}</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        Category: {productDetails[item.productId]?.category || 'N/A'}
                      </p>
                      {/* Uncomment for description */}
                      {/* <p className="text-sm mt-2">{productDetails[item.productId]?.description}</p> */}
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex justify-between items-center mt-4 text-sm">
                      <div className="text-gray-400">
                        Quantity: <span className="text-gray-300">{item.quantity}</span>
                      </div>
                      <div className="text-purple-400 font-medium">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Order Payment Details */}
            <div className="flex items-center justify-between text-sm text-gray-400 pt-2">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                {order.payment_method}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {new Date(order.created_at).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </motion.div>


        <button
          onClick={handleToggleDetails}
          className="w-full mt-4 flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show Details <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};


export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const userId = localStorage.getItem('userId');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/get-orders.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      const data = await response.json();
      if (response.ok) {
        const ordersWithParsedItems = data.orders.map(order => ({
          ...order,
          items: JSON.parse(order.items)
        }));
        setOrders(ordersWithParsedItems);
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Error fetching orders: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 border border-purple-500/30 mb-8 backdrop-blur-xl"
            >
              <Stars className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-purple-300 font-serif">Your Shopping Journey</span>
            </motion.div>

            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-serif font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6"
            >
              Order History
            </motion.h1>
          </div>

          {error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-900/20 backdrop-blur-xl border border-red-500/40 rounded-xl p-4"
            >
              <p className="text-red-400 text-center">{error}</p>
            </motion.div>
          ) : orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <p className="text-gray-400 font-serif text-lg">No orders yet. Start shopping to create your magical journey!</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {orders
                .slice()
                .reverse()
                .map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}