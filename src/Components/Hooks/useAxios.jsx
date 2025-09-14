import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://gold-web-server.vercel.app/', 
    // baseURL: 'http://localhost:5000/', 
  });

const useAxios = () => {
   return axiosInstance;
}

export default useAxios
