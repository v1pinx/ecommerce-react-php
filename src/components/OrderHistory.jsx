import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost/ca3';
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
        // Parse the `items` field if it's a stringified JSON array
        const ordersWithParsedItems = data.orders.map(order => {
          const parsedItems = JSON.parse(order.items); // Parse the items field
          return { ...order, items: parsedItems };
        });
        setOrders(ordersWithParsedItems); // Update state with parsed items
        console.log(data.orders);
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
      <div className="flex justify-center items-center min-h-screen ">
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
    <div className="max-w-4xl mx-auto p-4 py-24">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Order History</h2>
        </div>

        <div className="p-6">
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              You have no orders yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col bg-gray-50 p-4 border border-gray-200 rounded-lg mb-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.id}
                      </h3>
                      <p className="text-gray-600">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-lg font-medium text-gray-900">
                      Total: ${parseFloat(order.total_amount).toFixed(2)}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-800">Product ID:</h4>
                    <ul className="space-y-2">
                      {order.items && order.items.map((item, index) => (
                        <li key={index} className="flex justify-between text-gray-600">
                          <div>{item.productId}</div> {/* You can modify to show product title */}
                          <div>
                            {item.quantity} x ${item.price.toFixed(2)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-800">Status: {order.status}</div>
                    <div className="text-sm text-gray-600">
                      Payment Method: {order.payment_method}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
