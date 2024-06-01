import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CartItemsList, CartTotals, SectionTitle } from '../components'
import { Link } from 'react-router-dom'
import { clearCart } from '../features/cart/cartSlice'


const Cart = () => {

  const { user } = useSelector((state) => state.userState);
  const dispatch=useDispatch()
  const numItemsInCart=useSelector((state)=>state.cartState.numItemsInCart)
  const clearCartContent=()=>{
    dispatch(clearCart())
  }
  if (numItemsInCart === 0) {
    return <SectionTitle text='Your cart is empty' />;
  }
  
  return (
    
   <>
      <SectionTitle text='Shopping Cart' />
      
      <div className='mt-8 grid gap-8  lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals />
          {user ? (
            <Link to='/checkout' className='btn btn-primary btn-block mt-8'>
              Proceed to checkout
            </Link>
          ) : (
            <Link to='/login' className='btn btn-primary btn-block mt-8'>
              please login
            </Link>
          )}
          <button className='btn btn-error btn-block mt-8' onClick={clearCartContent}>
              Clear Cart
            </button>
        </div>
      </div>
    </>
    
  )
}

export default Cart