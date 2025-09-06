import React from 'react'
import Banner from '../Shared/Banner'
import Banner2 from './Banner2'
import Policy from './Policy'
import Gallary from './Gallary'
import Product from '../Product/Product'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Product></Product>
      <Banner2></Banner2>
      <Policy></Policy>
      <Gallary></Gallary>
    </div>
  )
}

export default Home