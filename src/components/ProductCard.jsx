import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="max-w-96 rounded-xl overflow-hidden shadow-xl border border-gray-700 transition-transform transform hover:scale-105 hover:shadow-2xl bg-white">
      <div className="w-full h-60 relative overflow-hidden bg-white p-4">
        <img
          className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className="px-4 py-4">
        <h2 className="font-bold text-lg text-black truncate">{product.title}</h2>
        <p className="text-xs text-black mt-1 truncate">{product.description.slice(0, 100)}...</p>

        <div className="mt-3 text-black text-sm">
          <p className="mb-1"><span className="font-semibold">Brand:</span> {product.brand}</p>
          <p className="mb-1"><span className="font-semibold">Model:</span> {product.model}</p>
          <p className="mb-1"><span className="font-semibold">Color:</span> {product.color}</p>
          <p className="mb-1"><span className="font-semibold">Category:</span> {product.category}</p>
        </div>

        <div className="mt-3">
          <span className="text-xl font-bold text-indigo-400">${discountedPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className="ml-2 line-through text-gray-500">${product.price.toFixed(2)}</span>
          )}
          <span className="ml-2 text-sm text-red-500">Save {product.discount}%</span>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Link to={`/products/${product.id}`}>
            <button className="bg-indigo-500 hover:bg-indigo-900 text-white text-sm font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center">
              <i className="ri-eye-line"></i> <span className="ml-1">View Details</span>
            </button>
          </Link>
          <button className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center">
            <i className="ri-amazon-line"></i> <span className="ml-1">Amazon</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
