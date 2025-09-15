import React, { useEffect, useState } from "react";
import Title from "../Shared/Title";
import Card from "./Card";
import useProducts from "../Hooks/useProducts";
import Loading from "../Shared/Loading";

const Product = () => {
  // const [products, setProducts] = useState([]);
  const [products , isLoading , refetch] = useProducts([]);

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="py-10 bg-gray-50">
      {/* Section Title */}
      {/* <Title
        head={"Product"}
        head2={"Details"}
        para={"Explore the details of the selected product"}
      /> */}

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="flex justify-center">
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
