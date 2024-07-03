import React from 'react'
import { OrdersList, PaginationContainer, SectionTitle } from '../components'
import { toast } from 'react-toastify'
import { redirect, useLoaderData } from 'react-router-dom'
import { customFetch } from '../utils'


export const loader=(store)=>async({request})=>{
const user=store.getState().userState.user

if(!user){
  toast.warn('You must be logged in to view the orders')
  return redirect('/login')

}
const params=Object.fromEntries([...new URL(request.url).searchParams.entries()])
const response=await customFetch.get(`/orders/showAllMyOrders/`,{params})
console.log(response);
const totalOrders=response?.data?.totalOrders
 const numOfPages=response?.data?.numOfPages
 const currentPage=response?.data?.currentPage
 const orders=response?.data.orders
return {totalOrders,numOfPages,currentPage,orders}
}

const Orders = () => {
  const{totalOrders}=useLoaderData()
 
  if (totalOrders < 1) {
    return <SectionTitle text='please make an order' />;
  }
  return (
    <div>
       
      <OrdersList/>
     <PaginationContainer/> 
    </div>
  )
}

export default Orders