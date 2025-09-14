import useAuth from "./useAuth";
import useUser from "./useUser";



const useAdmin = () => {
  const { user } = useAuth();
  const [users] = useUser();
  const email = user?.email;

  // Find the logged-in user from users list
  const currentUser = users?.find((u) => u.email === email);

  // Check if the current user has admin role
  const admin = currentUser?.role === "admin" || currentUser?.role === "owner";

  return { admin };
};

export default useAdmin;