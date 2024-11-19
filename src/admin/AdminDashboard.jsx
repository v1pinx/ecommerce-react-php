import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, ShoppingCart, Package, Users, DollarSign, Activity, Search, Bell, Settings, LogOut, ChevronDown, Filter } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

// Dashboard Home Component
const Dashboard = () => {
    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        products: 0,
        customers: 0
    });
    const [error, setError] = useState(null);

    // Fetch data for dashboard
    useEffect(() => {
        // Fetch the stats from the API
        const fetchStats = async () => {
            try {
                const response = await fetch(`${API_URL}/api/stats.php`); // Update with your API URL
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                } else {
                    throw new Error('Failed to fetch stats');
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Stats Cards */}
                <StatCard title="Total Revenue" value={`$${stats.revenue}`} icon={<DollarSign />} />
                <StatCard title="Total Orders" value={stats.orders} icon={<ShoppingCart />} />
                <StatCard title="Total Products" value={stats.products} icon={<Package />} />
                <StatCard title="Total Customers" value={stats.customers} icon={<Users />} />
            </div>
        </div>
    );
};

// StatCard Component
const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-600">{title}</p>
                <p className="text-2xl font-semibold">{value}</p>
            </div>
            <div className="w-8 h-8 text-blue-500">{icon}</div>
        </div>
        <div className="mt-4 flex items-center text-sm">
            <Activity className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+12.5%</span>
            <span className="text-gray-500 ml-2">from last month</span>
        </div>
    </div>
);

// Orders Component
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch orders data
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true); // Set loading to true before making the API call
            try {
                const response = await fetch(`${API_URL}/api/get-orders.php`, {
                    method: 'GET', // Assuming a GET request to fetch all orders
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setOrders(data.orders || []); // Assuming `data.orders` is an array of orders
                    console.log(data.orders)
                } else {
                    setError(data.message || 'Failed to fetch orders');
                }
            } catch (err) {
                setError('Error fetching orders: ' + err.message);
            } finally {
                setLoading(false); // Set loading to false after the API call completes
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen py-10">
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
        <div>
            <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total_amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};



// Products Component
const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        title: '',
        image: '',
        price: '',
        description: '',
        brand: '',
        model: '',
        color: '',
        category: '',
        popular: false,
        discount: ''
    });
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    // Fetch products data from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Replace with your API endpoint URL
                const response = await axios.get(`${API_URL}/api/products.php`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setNewProduct({
            ...newProduct,
            [id]: type === 'checkbox' ? checked : value
        });
    };

    // Handle Add Product
    const handleAddProduct = async (e) => {
        e.preventDefault();

        try {
            // Replace with your API endpoint URL
            const response = await axios.post(`${API_URL}/api/products.php`, newProduct);

            if (response.data.message === 'Product added successfully') {
                // Add the new product to the list and update state
                setProducts((prevProducts) => [...prevProducts, newProduct]);
                // Reset the form after adding the product
                setNewProduct({
                    title: '',
                    image: '',
                    price: '',
                    description: '',
                    brand: '',
                    model: '',
                    color: '',
                    category: '',
                    popular: false,
                    discount: ''
                });
                setShowForm(false); // Hide form after submission
            } else {
                console.error('Failed to add product:', response.data.error);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    // Handle Delete Product
    const handleDelete = async (productId) => {
        console.log("Deleting product:", productId);

        try {
            const response = await axios.delete(`${API_URL}/api/products.php`, {
                data: { id: productId }
            });

            if (response.data.message === 'Product deleted successfully') {
                // Filter out the deleted product from the products array
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
            } else {
                console.error('Failed to delete product:', response.data.error);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Product Listing</h2>
            <div className="mb-4 flex justify-end">
                <button
                    onClick={() => setShowForm(!showForm)} // Toggle form visibility
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                >
                    {showForm ? 'Cancel' : 'Add Product'} {/* Toggle button text */}
                </button>
            </div>

            {/* Conditionally render the Add Product form */}
            {showForm && (
                <form onSubmit={handleAddProduct} className="mb-4">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={newProduct.title}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter product title"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="text"
                            id="image"
                            value={newProduct.image}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter image URL"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                        <input
                            type="number"
                            id="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter product price"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter product description"
                            rows="4"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            value={newProduct.brand}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter brand"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                        <input
                            type="text"
                            id="model"
                            value={newProduct.model}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter model"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                        <input
                            type="text"
                            id="color"
                            value={newProduct.color}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter color"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            id="category"
                            value={newProduct.category}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter category"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="popular" className="block text-sm font-medium text-gray-700">Popular</label>
                        <input
                            type="checkbox"
                            id="popular"
                            checked={newProduct.popular}
                            onChange={handleInputChange}
                            className="mt-1 p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
                        <input
                            type="number"
                            id="discount"
                            value={newProduct.discount}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter discount"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => {
                                setNewProduct({
                                    title: '',
                                    image: '',
                                    price: '',
                                    description: '',
                                    brand: '',
                                    model: '',
                                    color: '',
                                    category: '',
                                    popular: false,
                                    discount: ''
                                });
                                setShowForm(false);
                            }}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            )}

            {/* Products Table */}
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-3 text-left">Title</th>
                        <th className="px-6 py-3 text-left">Price</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-t">
                            <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


// Main Admin Dashboard
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="fixed w-64 h-full bg-white shadow-lg">
                <div className="flex items-center justify-center h-16 border-b">
                    <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                </div>
                <nav className="mt-4">
                    <SidebarItem icon={<BarChart />} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <SidebarItem icon={<ShoppingCart />} label="Orders" isActive={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
                    <SidebarItem icon={<Package />} label="Products" isActive={activeTab === 'products'} onClick={() => setActiveTab('products')} />
                </nav>
            </div>

            {/* Main Content */}
            <div className="ml-64 p-8 w-full">
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'orders' && <Orders />}
                {activeTab === 'products' && <Products />}
            </div>
        </div>
    );
};

// Sidebar Item Component
const SidebarItem = ({ icon, label, isActive, onClick }) => (
    <div
        className={`flex items-center px-6 py-3 cursor-pointer ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
        onClick={onClick}
    >
        <div className="w-5 h-5 mr-3">{icon}</div>
        {label}
    </div>
);

export default AdminDashboard;
