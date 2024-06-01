import { createSlice } from '@reduxjs/toolkit';
import { json } from 'react-router-dom';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
  totalShippingCost:0
};
const getCartFromLocalStorage=()=>{
    return JSON.parse(localStorage.getItem('cart'))||defaultState
}
const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const{product}=action.payload;
      
      const item=state.cartItems.find((item)=>item.cartID===product.cartID)
      
      const itms=state.cartItems.filter((item)=>item.productID===product.productID)
       
     let totalQuantity=0
      itms.forEach((i)=>{
     return totalQuantity+=i.amount;

      })

      if(totalQuantity === product.inventory  ){
        toast.error('you can not add more')
      return

      }
      if(totalQuantity+product.amount>product.inventory){
        toast.warn(`you can only add maximum of ${product.inventory} items of this product`)
        product.amount = Math.min(product.amount, product.inventory - totalQuantity);
      }


    
      if(item){
       
     item.amount += product.amount;
      }
      else{

        state.cartItems.push(product)
      }

      state.numItemsInCart +=product.amount
      if(product.freeShipping === true){
        state.cartTotal+=product.price*product.amount;
      }else{
        state.cartTotal+=product.price*product.amount+(state.shipping*product.amount);
        state.totalShippingCost+=state.shipping*product.amount
      }
      cartSlice.caseReducers.calculateTotals(state)
      toast.success('item added to the cart...')
      
    },
    clearCart: (state) => {
        localStorage.removeItem('cart')
        return defaultState
    },

    removeItem: (state, action) => {
       const{cartID}=action.payload
      const product=state.cartItems.find((i)=>i.cartID===cartID)
      state.cartItems=state.cartItems.filter((i)=>i.cartID!==cartID)
      state.numItemsInCart -= product.amount;
     
      if(product.freeShipping===false){
        state.cartTotal -= product.price * product.amount+product.amount*state.shipping;
        state.totalShippingCost-=product.amount*state.shipping
      }else{
        state.cartTotal -= product.price * product.amount;
      }
     
      cartSlice.caseReducers.calculateTotals(state);
      toast.error('Item removed from cart'); 
    },
    editItem: (state, action) => {
     let{cartID,amount }=action.payload
      const product=state.cartItems.find((i)=>i.cartID===cartID)
      const itms=state.cartItems.filter((item)=>item.productID===product.productID)
      if(amount > product.amount){

let totalQuantity=0
       itms.forEach((i)=>{
      return totalQuantity+=i.amount;
 
       })
 
       if(totalQuantity === product.inventory  ){
         toast.error('you can not add more')
       return
 
       }
       if(totalQuantity+(amount-totalQuantity)>product.inventory){
         toast.warn(`you can only add maximum of ${product.inventory} items of this product`)
        amount =product.inventory

         
       }
       state.numItemsInCart += amount - product.amount;
    
    
       if(product.freeShipping === true){
        
         state.cartTotal += product.price *(amount-product.amount) ;
       }else{
         state.cartTotal+=product.price*(amount-product.amount)+(state.shipping*(amount-product.amount));
         state.totalShippingCost+=state.shipping*(amount-product.amount)
       }
       product.amount = amount;
       cartSlice.caseReducers.calculateTotals(state);
       toast.success('Cart updated'); 
      }
      
      else{
        state.numItemsInCart += amount - product.amount;
      if(product.freeShipping === true){
       
        state.cartTotal += product.price *(amount-product.amount) ;
      }else{
        state.cartTotal+=product.price*(amount-product.amount)+(state.shipping*(amount-product.amount));
        state.totalShippingCost+=state.shipping*(amount-product.amount)
      }
      product.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Cart updated'); 
      }
       
    },
    calculateTotals:(state)=>{
      
     
        state.tax=0.1*state.cartTotal;
       
          state.orderTotal=state.cartTotal+state.tax
        
        localStorage.setItem('cart',JSON.stringify(state))
    },

    
  },
});

export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;