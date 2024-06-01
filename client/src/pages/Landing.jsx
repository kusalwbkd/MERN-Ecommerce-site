import React from 'react'
import { FeaturedProducts, Hero } from '../components'
import { customFetch } from '../utils';


const url = '/products';

export const loader=async()=>{
  const response=await customFetch.get(url)
 
  const items = response.data.products
  
const featuredProducts=items.filter((item)=>{
return item.featured === true
})
const products=featuredProducts.slice(0,6)
console.log(products);
  return {products}
}
const Landing = () => {
  return (
    <>
    <Hero/>
    <FeaturedProducts/>
    </>
  )
}

export default Landing