import React from 'react'
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
  const axiosSecure = useAxios()

  const {data: users=[] , isLoading , refetch} = useQuery({
    queryKey: ['users'],
    queryFn: async ()=>{
      const res = await axiosSecure.get('/users');
      return res.data
    }
  })

  return [ users , isLoading , refetch]
}

export default useUser