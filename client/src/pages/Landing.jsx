import React from 'react'
import { FeaturedProducts, Hero } from '../components'
import { customFetch } from '../utils';


const url = '/products';

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch.get(url),
};


export const loader=(queryClient)=>async()=>{
  const response=await queryClient.ensureQueryData(featuredProductsQuery);
 
  const items = response?.data?.products
  
const featuredProducts=items?.filter((item)=>{
return item?.featured === true
})
const products=featuredProducts?.slice(0,6)

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