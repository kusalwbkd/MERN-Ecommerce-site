import React, { useEffect } from 'react'
import { Filters, PaginationContainer, ProductsContainer } from '../components'
import { customFetch } from '../utils';
import { useLoaderData } from 'react-router-dom';
import { useFilterContext } from '../context/FilterContext';
import { toast } from 'react-toastify';



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
const Products = () => {
  const{products}=useLoaderData()
  const{getAllProducts}=useFilterContext()
  useEffect(()=>{
    if(products?.length>0){
    getAllProducts(products)
    }

  },[])

  return (
    <>
      <Filters />
      <ProductsContainer />
   

    </>
  )
}

export default Products