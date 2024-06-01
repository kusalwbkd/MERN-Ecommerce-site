import React from 'react'
import { Form, Link, redirect, useNavigate } from 'react-router-dom'
import FormInput from './FormInput'
import SubmitBtn from './SubmitBtn'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearCart } from '../features/cart/cartSlice'
import { customFetch } from '../utils'
import axios from 'axios'


export const action=(store)=>async({request})=>{
    const formData=await request.formData()
    const{name,address}=Object.fromEntries(formData)
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart,totalShippingCost,tax } =store.getState().cartState;
    
    const info = {
        name,
        address,
        orderTotal,
        totalShippingCost,
        cartItems,
        numItemsInCart,
        tax
      };
      console.log("info are",info);
      try {
        const response = await customFetch.post('/orders', info, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log(response);
        store.dispatch(clearCart());
        toast.success('order placed successfully');
        return redirect('/orders');
      } catch (error) {
        console.log(error);
        const errorMessage =
          error?.response?.data?.error?.message ||
          'there was an error placing your order';
  
        toast.error(errorMessage);
        return null;
      }
      
}

const CheckOutForm = () => {
    const user=useSelector((state)=>state.userState.user)
    const cartItems=useSelector((state)=>state.cartState.cartItems)
    console.log(cartItems);
  return (
    <Form method='post' >
<h4 className='font-medium text-xl'>Shipping Information</h4>
      <FormInput label='Full Name' name='name' type='text' defaultValue={user.name}/>
      <FormInput label='address' name='address' type='text' defaultValue={user.location}/>
      <div className='mt-4'>
       <button type='submit'  className='btn btn-block btn-primary' >Place Order</button>
      </div>
    </Form>
  )
}

export default CheckOutForm