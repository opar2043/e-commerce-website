import React, { useState } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Home/Footer'
import Loading from '../Shared/Loading'

const Root = () => {
  const [loading, setLoading] = useState(false) // default false

  return (
    <div>
      <Navbar />
      
      {loading ? (
        <Loading />
      ) : (
        <Outlet />
      )}

      <Footer />
    </div>
  )
}

export default Root
