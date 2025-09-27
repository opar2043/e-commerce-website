import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./Components/Root/Root";
import Error from "./Components/Root/Error";
import Home from "./Components/Home/Home";
import Register from "./Components/Firebase/Register";
import Login from "./Components/Firebase/Login";
import AllProduct from "./Components/Product/AllProduct";
import About from "./Components/About/About";
import Contact from "./Components/About/Contact";
import ViewCard from "./Components/Product/ViewCard";
import Dashboard from "./Components/Dashboard/Dashboard";
import AddProduct from "./Components/Dashboard/AddProduct";
import AllProductAdmin from "./Components/Dashboard/AllProductAdmin";
import User from "./Components/Dashboard/User/User";
import AdminDashboard from "./Components/Dashboard/AdminPanel/AdminDashboard";
import AuthProvider from "./Components/Firebase/AuthProvider";
import UpdatePrice from "./Components/Dashboard/UpdatePrice/UpdatePrice";
import Order from "./Components/Dashboard/Order/Order";
import EditProduct from "./Components/Dashboard/EditProduct";
import Update from "./Components/Dashboard/UpdatePrice/Update";
import Wishlist from "./Components/Wishlist/Wishlist";
import Cart2 from "./Components/ProductCart/Cart2";
import Payment from "./Components/ProductCart/Payment";
import Confirm from "./Components/ProductCart/Confirm";
import CartSidebar from "./Components/Home/CartSidebar";
import UserData from "./Components/Dashboard/Order/userData";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/collection",
        element: <AllProduct></AllProduct>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/cart",
        element: <Cart2></Cart2>,
      },
      {
        path: "/wish",
        element: <Wishlist></Wishlist>,
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/confirm",
        element: <Confirm></Confirm>,
      },
      {
        path: "/product/:id",
        element: <ViewCard></ViewCard>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/allproduct",
        element: <AllProductAdmin></AllProductAdmin>,
      },
      {
        path: "/dashboard/addproducts",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/order",
        element: <Order></Order>,
      },
      {
        path: "/dashboard/user",
        element: <User></User>,
      },
      {
        path: "/dashboard/admin",
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: "/dashboard/updateprice",
        element: <UpdatePrice></UpdatePrice>,
        children: [
          {
            path: "/dashboard/updateprice/:id",
            element: <Update></Update>,
          },
        ],
      },

      {
        path: "/dashboard/editproducts/:id",
        element: <EditProduct></EditProduct>,
      },
      {
        path: "/dashboard/userdata",
        element: <UserData></UserData>
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
