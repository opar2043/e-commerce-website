import useAxios from "./useAxios";
import { useQuery } from '@tanstack/react-query';

const useCart = () => {


  const axiosSecure = useAxios();
  const {data : cart = [] , isLoading , refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async ()=> {
      const res =await axiosSecure.get('/cart');
      console.log(res.data);
      return res.data ;
    }
  })

  return [cart , isLoading , refetch ]
}

export default useCart