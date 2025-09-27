import React from 'react'
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useDetail = () => {
  const axiosSecure = useAxios()

  const {data: userdata=[] , isLoading , refetch} = useQuery({
    queryKey: ['user-data'],
    queryFn: async ()=>{
      const res = await axiosSecure.get('/user-data');
      return res.data
    }
  })

  return [ userdata , isLoading , refetch]
}

export default useDetail