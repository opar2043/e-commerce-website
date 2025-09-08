import React, { useEffect, useState } from 'react';

const AllProductAdmin = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        // In a real application, you would fetch from an API endpoint
        // For now, using the imported JSON data directly
        const productData = [
          {
            "id": 1,
            "name": "Diamond Ring",
            "category": "diamond",
            "shortDescription": "Elegant diamond ring with platinum finish.",
            "description": "Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.",
            "isAvailable": true,
            "images": [
              "https://i.ibb.co.com/XZwxvdpF/gold5.webp",
              "https://i.ibb.co.com/XZwxvdpF/gold5.webp",
              "https://i.ibb.co.com/XZwxvdpF/gold5.webp"
            ],
            "prices": [
              { "price": 700, "offerPrice": 400 },
              { "price": 650, "offerPrice": 380 }
            ],
            "sizes": ["S", "M", "L"]
          },
          {
            "id": 2,
            "name": "Gold Plated Necklace",
            "category": "gold",
            "shortDescription": "Stylish gold plated necklace for all occasions.",
            "description": "This necklace is crafted with precision, offering a luxurious look while being affordable. Perfect for weddings and parties.",
            "isAvailable": true,
            "images": [
              "https://i.ibb.co.com/XZwxvdpF/gold5.webp",
              "https://i.ibb.co.com/XZwxvdpF/gold5.webp"
            ],
            "prices": [
              { "price": 500, "offerPrice": 350 },
              { "price": 480, "offerPrice": 320 }
            ],
            "sizes": ["M", "L"]
          },
          {
            "id": 3,
            "name": "Silver Bracelet",
            "category": "silver",
            "shortDescription": "Classic silver bracelet with modern touch.",
            "description": "Made of high-quality sterling silver. Lightweight and perfect for everyday wear.",
            "isAvailable": false,
            "images": [
              "https://i.ibb.co.com/XZwxvdpF/gold5.webp",
              "https://i.ibb.co.com/XZwxvdpF/gold5.webp"
            ],
            "prices": [
              { "price": 250, "offerPrice": 180 },
              { "price": 230, "offerPrice": 160 }
            ],
            "sizes": ["S", "M"]
          },
          {
            "id": 4,
            "name": "Platinum Earrings",
            "category": "diamond",
            "shortDescription": "Premium diamond-studded platinum earrings.",
            "description": "Designed with high-grade platinum and natural diamonds. Adds elegance to any outfit.",
            "isAvailable": true,
            "images": [
              "https://i.ibb.co.com/XZwxvdpF/gold5.webp",
              "https://i.ibb.co.com/XZwxvdpF/gold5.webp"
            ],
            "prices": [
              { "price": 900, "offerPrice": 650 },
              { "price": 850, "offerPrice": 600 }
            ],
            "sizes": ["S", "M", "L"]
          },
          {
            "id": 5,
            "name": "Gold Chain",
            "category": "gold",
            "shortDescription": "Durable gold chain with elegant shine.",
            "description": "Crafted from pure gold with a polished finish. Suitable for both men and women.",
            "isAvailable": true,
            "images": [
              "https://i.ibb.co.com/XZwxvdpF/gold5.webp",
              "https://i.ibb.co.com/XZwxvdpF/gold5.webp",
              "https://i.ibb.co.com/XZwxvdpF/gold5.webp"
            ],
            "prices": [
              { "price": 1200, "offerPrice": 950 },
              { "price": 1150, "offerPrice": 900 }
            ],
            "sizes": ["M", "L", "XL"]
          }
        ];
        setProducts(productData);
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">All Products</h2>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sizes</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{product.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.prices[0].price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.prices[0].offerPrice}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {product.isAvailable ? 'Available' : 'Out of Stock'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sizes.join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProductAdmin;