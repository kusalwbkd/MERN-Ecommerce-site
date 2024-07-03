import React from 'react'
import { Filters, PaginationContainer, ProductsContainer } from '../components'
import { customFetch } from '../utils';
import { useLoaderData } from 'react-router-dom';


const url = '/products';

const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, freeShipping, page } =
    queryParams;

  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 200000,
      freeShipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),
  };
};
export const loader=
(queryClient)=>async({request})=>{

  const params=Object.fromEntries([...new URL(request.url).searchParams.entries()])
  
  const response = await queryClient.ensureQueryData(
    allProductsQuery(params)
  );

  const products = response?.data?.products;
  const categories=response?.data?.categories
 const companies=response?.data?.companies
 const totalProducts=response?.data?.totalProducts
 const numOfPages=response?.data?.numOfPages
 const currentPage=response?.data?.currentPage
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