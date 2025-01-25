import React, { useEffect } from 'react'
import { FeaturedProducts, Hero } from '../components'
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFilterContext } from '../context/FilterContext';
import FeaturedProductsGrid from '../components/FeaturedProductsGrid';


export const loader=async ({ request }) => {

  try {
   const response=await customFetch.get('/products')
   const{products, categories, companies}=response.data
   return{products,categories,companies}
  } catch (error) {
   toast.error('Something went wrong');
   return null
  }
 }




const Landing = () => {
  
  const{products}=useLoaderData()
   const{getAllProducts}=useFilterContext()


  useEffect(()=>{
    if(products.length>0){
      getAllProducts(products)
    
    }
   
  },[products])

  
  
  return (
    <>
    <Hero/>
    <FeaturedProducts/> 
    </>
  )
}

export default Landing