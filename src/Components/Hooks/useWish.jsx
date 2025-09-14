import useAxios from "./useAxios";
import { useQuery } from '@tanstack/react-query';

const useWish = () => {


  const axiosSecure = useAxios();
  const {data : wish = [] , isLoading , refetch } = useQuery({
    queryKey: ["wish"],
    queryFn: async ()=> {
      const res =await axiosSecure.get('/wish');
      console.log(res.data);
      return res.data ;
    }
  })

  return [wish , isLoading , refetch ]
}

export default useWish