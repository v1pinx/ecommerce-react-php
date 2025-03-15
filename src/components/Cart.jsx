import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingCart, Sparkles, CreditCard, Truck, Ticket, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4,
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

const CartItem = ({ item, updateQuantity, deleteFromCart }) => (
  <motion.div
    variants={itemVariants}
    className="group flex items-center justify-between p-6 bg-black/40 rounded-xl border border-purple-900/40 hover:border-purple-500/50 backdrop-blur-xl relative overflow-hidden mb-4"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

    <div className="flex items-center space-x-4 relative">
      <div className="rounded-lg overflow-hidden">
        <img
          src={item.product.image || '/api/placeholder/80/80'}
          alt={item.product.title}
          className="w-64 object-cover"
        />
      </div>
      <div>
        <h3 className="font-serif text-purple-300">{item.product.title}</h3>
        <p className="text-gray-400">${item.product.price}</p>
      </div>
    </div>

    <div className="flex items-center space-x-4 relative">
      <div className="flex items-center space-x-2 bg-black/30 rounded-lg p-1">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          className="p-1 text-purple-400 hover:text-purple-300"
        >
          <Minus className="w-4 h-4" />
        </motion.button>
        <span className="w-8 text-center text-purple-300">{item.quantity}</span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          className="p-1 text-purple-400 hover:text-purple-300"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => deleteFromCart(item.product.id)}
        className="p-2 text-red-400 hover:text-red-300 bg-black/30 rounded-lg"
      >
        <Trash2 className="w-4 h-4" />
      </motion.button>
    </div>
  </motion.div>
);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = localStorage.getItem('userId');

  // Fetch cart items and product details
  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_URL}/get-cart.php?userId=${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch cart');
      }
      if (data.cart == null) {
        setCartItems([]);
        return;
      }
      const productDetailsPromises = data.cart.map(async (item) => {
        const productResponse = await fetch(`${API_URL}/getProductById.php?id=${item.productId}`);
        const productData = await productResponse.json();

        if (!productResponse.ok) {
          throw new Error(productData.message || 'Failed to fetch product');
        }

        return {
          ...item,
          product: productData.product,
        };
      });

      const cartItemsWithDetails = await Promise.all(productDetailsPromises);
      setCartItems(cartItemsWithDetails);
      console.log(cartItemsWithDetails);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 0) return;

    try {
      const response = await fetch(`${API_URL}/update-cart.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId,
          quantity: newQuantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update cart');
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete cart item
  const deleteFromCart = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/delete-from-cart.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          productId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to remove product from cart');
      }

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );

      toast.success('Product removed from cart.');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      toast.error(err.message || 'An error occurred.');
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    return subtotal - discount;
  };

  const applyCoupon = () => {
    const couponMap = {
      'SAVE10': 0.1,   // 10% off
      'SAVE20': 0.2,   // 20% off
      'SAVE50': 0.5,   // 50% off
    };

    // Validate coupon code
    if (!couponCode) {
      toast.error('Please enter a coupon code');
      return;
    }

    const discountPercent = couponMap[couponCode.toUpperCase()];

    if (discountPercent !== undefined) {
      const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      const calculatedDiscount = subtotal * discountPercent;

      setDiscount(calculatedDiscount);
      toast.success(`Coupon applied! You saved $${calculatedDiscount.toFixed(2)}`);
    } else {
      toast.error('Invalid coupon code');
      setDiscount(0);
    }
  };

  const handleCheckout = async () => {
    if (isSubmitting) return; // Prevent multiple submissions

    if (!shippingAddress) {
      toast.error('Please provide a shipping address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/checkout.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          items: cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
          total_amount: calculateTotal(),
          shipping_address: shippingAddress,
          payment_method: paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to place the order');
      }

      toast.success('Order placed successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'An error occurred during checkout.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black flex justify-center items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8 text-purple-400" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black relative overflow-hidden py-16">
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

      <div className="max-w-4xl mx-auto p-4 py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 border border-purple-500/30 mb-8 backdrop-blur-xl"
          >
            <ShoppingCart className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-purple-300 font-serif">It's time to checkout</span>
          </motion.div>
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl font-serif font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6"
          >
            Your Cart
          </motion.h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-black/40 rounded-2xl border border-purple-900/40 backdrop-blur-xl overflow-hidden"
        >
          <div className="p-6">
            {cartItems.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-12"
              >
                <Wand2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-300 font-serif">Your cart is empty</p>
              </motion.div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    deleteFromCart={deleteFromCart}
                  />
                ))}

                <motion.div
                  variants={itemVariants}
                  className="mt-8 space-y-6"
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter Coupon Code"
                        className="flex-1 p-4 bg-black/40 border border-purple-900/40 rounded-xl text-purple-300 placeholder-purple-600 focus:outline-none focus:border-purple-500/50"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={applyCoupon}
                        className="px-6 py-4 bg-purple-900/60 text-purple-300 rounded-xl hover:bg-purple-800/60 flex items-center gap-2"
                      >
                        <Ticket className="w-4 h-4" />
                        Apply
                      </motion.button>
                    </div>

                    <textarea
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Enter shipping address"
                      className="w-full p-4 bg-black/40 border border-purple-900/40 rounded-xl text-purple-300 placeholder-purple-600 focus:outline-none focus:border-purple-500/50"
                      rows="3"
                    />

                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full p-4 bg-black/40 border border-purple-900/40 rounded-xl text-purple-300 focus:outline-none focus:border-purple-500/50"
                    >
                      <option value="COD">Cash on Delivery</option>
                      <option value="Card">Credit/Debit Card</option>
                    </select>

                    <div className="flex items-center justify-between p-4 bg-black/60 rounded-xl">
                      <span className="text-purple-300 font-serif">Total Amount:</span>
                      <span className="text-2xl font-serif text-purple-300">${calculateTotal().toFixed(2)}</span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-purple-900 to-blue-900 text-purple-100 font-serif rounded-xl relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <CreditCard className="w-5 h-5" />
                            Checkout
                          </>
                        )}
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;