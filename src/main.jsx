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
    ]
  },
// {
//     path: '/dashboard',
//     element: <Dashboard></Dashboard>,
//     children: [
//     {
//       path: "/dashboard",
//       element: <Dashboard></Dashboard>
//     }
//   ]
//   }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)