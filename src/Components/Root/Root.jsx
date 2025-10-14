import React, { useState } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Home/Footer'
import Loading from '../Shared/Loading'
import { FaWhatsapp } from 'react-icons/fa'
import CartSidebar from '../Home/CartSidebar'
import Cart2 from '../ProductCart/Cart2'
import ScrollToTop from '../Home/ScrollToTop'

const Root = () => {
  const [loading, setLoading] = useState(false) // default false

  return (
    <div>
      <Navbar />

      {/* 🔹 Add top padding so content clears the fixed navbar */}
      <div className="pt-[70px]">
        {loading ? (
          <Loading />
        ) : (
          <Outlet />
        )}

        {/* <CartSidebar /> */}
         <ScrollToTop />
        <Cart2 />

        {/* WhatsApp button */}
        <div className="fixed bottom-10 right-8">
          <button className="btn w-11 h-11 text-xs bg-green-500 hover:bg-white hover:text-green-400 hover:border-0 text-white rounded-full border border-green-500">
            <div className="text-3xl">
              <a href="">
                <FaWhatsapp />
              </a>
            </div>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Root
