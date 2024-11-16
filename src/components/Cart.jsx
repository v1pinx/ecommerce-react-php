import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = 'http://localhost/ca3';
  const userId = localStorage.getItem('userId');

  // Fetch cart items and product details
  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_URL}/api/get-cart.php?userId=${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch cart');
      }
      if(data.cart == null){
        setCartItems([]);
        return;
      }
      const productDetailsPromises = data.cart.map(async (item) => {
        const productResponse = await fetch(`${API_URL}/api/getProductById.php?id=${item.productId}`);
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(`${API_URL}/api/update-cart.php`, {
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
      const response = await fetch(`${API_URL}/api/delete-from-cart.php`, {
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
    } catch (err) {
      toast.error(err.message || 'An error occurred.');
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    return subtotal - discount;
  };

  const applyCoupon = async () => {
    try {
      const response = await fetch(`${API_URL}/api/validate-coupon.php?code=${couponCode}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid coupon');
      }

      setDiscount(data.discount);
      alert(`Coupon applied! Discount: $${data.discount.toFixed(2)}`);
    } catch (err) {
      setError(err.message);
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
      const response = await fetch(`${API_URL}/api/checkout.php`, {
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
      // Optionally redirect or clear cart here
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 py-20">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Shopping Cart</h2>
        </div>

        <div className="p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.image || '/api/placeholder/80/80'}
                        alt={item.product.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{item.product.title}</h3>
                        <p className="text-gray-600">${item.product.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => deleteFromCart(item.product.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        aria-label="Delete item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200">
                <div className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">
                  Total: ${calculateTotal().toFixed(2)}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon Code"
                    className="border px-4 py-2 rounded-md"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Apply Coupon
                  </button>
                </div>

                {/* Shipping Address */}
                <div className="mt-4 w-full">
                  <textarea
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter shipping address"
                    className="border px-4 py-2 rounded-md w-full"
                  />
                </div>

                {/* Payment Method */}
                <div className="mt-4">
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="border px-4 py-2 rounded-md"
                  >
                    <option value="COD">Cash on Delivery</option>
                    <option value="Card">Credit/Debit Card</option>
                  </select>
                </div>

                <button
                  className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
                           transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Proceed to Checkout'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
