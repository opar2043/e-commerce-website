import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,  
} from '@tanstack/react-query'
import Root from './Components/Root/Root';
import Error from './Components/Root/Error';
import Home from './Components/Home/Home';
import Register from './Components/Firebase/Register';
import Login from './Components/Firebase/Login';
import AllProduct from './Components/Product/AllProduct';
import About from './Components/About/About';
import Contact from './Components/About/Contact';
import ViewCard from './Components/Product/ViewCard';
import Dashboard from './Components/Dashboard/Dashboard';
import AddProduct from './Components/Dashboard/AddProduct';
import AllProductAdmin from './Components/Dashboard/AllProductAdmin';
import User from './Components/Dashboard/User/User';
import AdminDashboard from './Components/Dashboard/AdminPanel/AdminDashboard';
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/collection',
        element: <AllProduct></AllProduct>
      },
      {
        path: '/about',
        element: <About></About>
      },
      {
        path: '/contact',
        element: <Contact></Contact>
      },
      {
        path: '/product/:id',
        element: <ViewCard></ViewCard>
      },
    ]
  },
{
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
    {
      path: "/dashboard/allproduct",
      element: <AllProductAdmin></AllProductAdmin>
    },
    {
      path: "/dashboard/addproducts",
      element: <AddProduct></AddProduct>
    },
    {
      path: "/dashboard/order",
      element: <AddProduct></AddProduct>
    },
    {
      path: "/dashboard/user",
      element: <User></User>
    },
    {
      path: "/dashboard/admin",
      element: <AdminDashboard></AdminDashboard>
    },
  ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)