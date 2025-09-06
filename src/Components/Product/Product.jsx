import React, { useEffect, useState } from 'react'
import Title from '../Shared/Title'
import Card from './Card';

const Product = () => {
    const [products , setProducts] = useState([]);
    useEffect(()=>{
        fetch('/product.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
  return (
    <div>
        <Title head={"Product"} head2={"Details"} para={"Explore the details of the selected product"}></Title>


        <div>
         {
            products.map(product => <div key={product.id} className='text-center mb-10'>
               <Card product={product} />
            </div>)
         }
        </div>
    </div>
  )
}

export default Product