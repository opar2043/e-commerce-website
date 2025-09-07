import React from 'react'
import Banner from '../Shared/Banner'
import Banner2 from './Banner2'
import Policy from './Policy'
import Gallary from './Gallary'
import Product from '../Product/Product'
import BlogBanner from '../Blog/BlogBanner'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Product></Product>
      <BlogBanner></BlogBanner>
      <Gallary></Gallary>
      <Banner2></Banner2>
      <Policy></Policy>
    </div>
  )
}

export default Home