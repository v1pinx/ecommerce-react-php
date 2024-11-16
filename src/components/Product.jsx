import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-black to-gray-900 ">
        <span className="loader"></span>
      </div>
    );

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-10 ">
        <div className="flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden ">

          {/* Product Image */}
          <div className="md:w-1/2 flex items-center justify-center ">
            <div className="relative overflow-hidden rounded-lg flex justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover w-[600px] h-full transition-transform transform hover:scale-110 mix-blend-lighten filter brightness-95 contrast-105 rounded-lg"
              />
              <div className="absolute inset-0  bg-opacity-10"></div>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-8 md:w-1/2 text-white space-y-6">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
              {product.title}
            </h1>
            <p className="text-lg text-gray-300">{product.description}</p>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-semibold">${product.price.toFixed(2)}</span>
              {product.discount > 0 && (
                <span className="text-red-400 text-lg">{product.discount}% off</span>
              )}
            </div>

            <div className="text-gray-400 text-sm space-y-2">
              <div><strong>Category:</strong> {product.category}</div>
              <div><strong>Brand:</strong> {product.brand}</div>
              <div><strong>Model:</strong> {product.model}</div>
              <div><strong>Color:</strong> {product.color}</div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full transition-transform transform hover:scale-110"
                onClick={addToCart}
              >
                ADD TO CART
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-transform transform hover:scale-110"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
