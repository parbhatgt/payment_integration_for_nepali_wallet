import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Product 1", price: 5, image: "https://picsum.photos/300/200?random=1" },
  { id: 2, name: "Product 2", price: 10, image: "https://picsum.photos/300/200?random=2" },
  { id: 3, name: "Product 3", price: 15, image: "https://picsum.photos/300/200?random=3" },
  { id: 4, name: "Product 4", price: 5, image: "https://picsum.photos/300/200?random=4" },
  { id: 5, name: "Product 5", price: 5, image: "https://picsum.photos/300/200?random=5" },
  { id: 6, name: "Product 6", price: 5, image: "https://picsum.photos/300/200?random=6" },
  { id: 7, name: "Product 7", price: 5, image: "https://picsum.photos/300/200?random=7" },
  { id: 8, name: "Product 8", price: 10, image: "https://picsum.photos/300/200?random=8" },
  { id: 9, name: "Product 9", price: 5, image: "https://picsum.photos/300/200?random=9" },
  { id: 10, name: "Product 10", price: 50000, image: "https://picsum.photos/300/200?random=10" },
];

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-4">Nrs.{product.price}</p>

              <button
                onClick={() =>
                  navigate("/payment", {
                    state: { price: product.price, name: product.name },
                  })
                }
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;