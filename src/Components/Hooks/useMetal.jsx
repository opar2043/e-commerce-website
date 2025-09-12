import React from 'react'
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useMetal = () => {
  const axiosSecure = useAxios();
  const {data : metal = [] , isLoading , refetch } = useQuery({
    queryKey: ["metal"],
    queryFn: async ()=> {
      const res =await axiosSecure.get('/metal');
      console.log(res.data);
      return res.data ;
    }
  })

  return [metal , isLoading , refetch ]
}

export default useMetal