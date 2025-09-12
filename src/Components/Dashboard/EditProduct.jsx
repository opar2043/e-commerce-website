import React from 'react'
import { useParams } from 'react-router-dom'
import useProducts from '../Hooks/useProducts';
import useAxios from '../Hooks/useAxios';

const EditProduct = () => {
  const {id} = useParams();
    const axiosSecure = useAxios();
  const [products, isLoading, refetch] = useProducts();
  const product = products?.find((item) => item._id === id);
  return (
    <div>
      <h2 className='text-black'>{id}</h2>
    </div>
  )
}

export default EditProduct