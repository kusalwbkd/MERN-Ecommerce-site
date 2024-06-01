import React from 'react'
import { Filters, PaginationContainer, ProductsContainer } from '../components'
import { customFetch } from '../utils';
import { useLoaderData } from 'react-router-dom';


const url = '/products';
export const loader=async({request})=>{

  const params=Object.fromEntries([...new URL(request.url).searchParams.entries()])
  
  const response=await customFetch(url,{params})
 console.log(response);
  const products = response.data.products;
  const categories=response.data.categories
 const companies=response.data.companies
 const totalProducts=response.data.totalProducts
 const numOfPages=response.data.numOfPages
 const currentPage=response.data.currentPage
  return {products,categories,companies,params,totalProducts,currentPage,numOfPages};
}



const Products = () => {


  return (
    <>
   <Filters/>
    <ProductsContainer/>
    <PaginationContainer/>
    
    </>
  )
}

export default Products