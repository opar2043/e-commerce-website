import useAxios from "./useAxios";
import { useQuery } from '@tanstack/react-query';

const useOrder = () => {


  const axiosSecure = useAxios();
  const {data : order = [] , isLoading , refetch } = useQuery({
    queryKey: ["order"],
    queryFn: async ()=> {
      const res =await axiosSecure.get('/order');
      console.log(res.data);
      return res.data ;
    }
  })

  return [order , isLoading , refetch ]
}

export default useOrder