import React from 'react'
import Banner from '../Shared/Banner'
import Banner2 from './Banner2'
import Policy from './Policy'
import Gallary from './Gallary'
import Product from '../Product/Product'
import BlogBanner from '../Blog/BlogBanner'
import Title from '../Shared/Title'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Title head={"Feature Products"}  para={"Explore our exclusive range of products."}></Title>
      <Product></Product>
      <Title head={"Our Blogs"}  para={"Stay updated with our latest news and articles."}></Title>
      <BlogBanner></BlogBanner>
      <Gallary></Gallary>
      <Banner2></Banner2>
      <Policy></Policy>
    </div>
  )
}

export default Home