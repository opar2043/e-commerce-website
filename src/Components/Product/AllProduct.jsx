import React, { useEffect, useState } from 'react'
import Card from './Card';

const AllProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="py-10 bg-gray-50">

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto gap-4 px-4  justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="">
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default AllProduct