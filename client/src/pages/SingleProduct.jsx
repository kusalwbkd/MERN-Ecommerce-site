import React, { useState } from 'react'
import { customFetch, formatPrice } from '../utils'
import { Form, Link, useLoaderData } from 'react-router-dom'
import { MdOutlineStarOutline } from "react-icons/md";
import { ReviewSection } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';
import { BsStar, BsStarFill, BsStarHalf, BsTypeH3 } from 'react-icons/bs';




export const loader=async({params})=>{

const response=await customFetch.get(`/products/${params.id}`)
const product=response.data.product;
const reviews=response.data.reviews
return {product,reviews}
}

export const action=async({request})=>{
  const formData=await request.formData()
  const data=Object.fromEntries(formData)
 
  if(data.rating){
data.rating=Number(data.rating)
  }
  try {
    if(data.reviewId){
      await customFetch.patch(`/reviews/${data.reviewId}`,data)
      toast.success ('Review updated!!!');
      return null;
    }else{
     
      await customFetch.post('/reviews',data)
      toast.success ('Review submitted');
      return null;
    }
   
 
  } catch (error) { 
    toast.error(error?.response?.data?.msg);
  return error;
  }

 


  return null
}
const SingleProduct = () => {

const {product}=useLoaderData()
const { image, name, price, description, colors, company,reviews,averageRating,numOfReviews } =product;
const user=useSelector((state)=>state.userState.user)

  const dollarsAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
 
  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };
const reviewedProduct=reviews?.find((item)=>item.user === user?._id)

const[selectedStarCount,setSelectedStarCount]=useState(reviewedProduct?.rating)
const cartProduct={
  cartID:product._id+productColor,
 productID:product._id,
  image,
  name,
  price,
  company,
  productColor,
  amount,
  freeShipping:product.freeShipping,
  inventory:product.inventory



}

const dispatch=useDispatch()

const addToCart=()=>{
  dispatch(addItem({product:cartProduct}))
}
   const generateAmountOptions = (number) => {
    return Array.from({ length: number }, (_, index) => {
      const amount = index + 1;
  
      return (
        <option key={amount} value={amount}>
          {amount}
        </option>
      );
    });
  };

 const generateStars=Array.from({length:5},(_,index)=>{
const number=index+0.5

return(
  <span key={index}>
  {averageRating >= index+1 ? (
    <BsStarFill className=' text-orange-500'/>
  ) : averageRating >= number ? (
    <BsStarHalf className=' text-orange-500'/>
  ) : (
    <BsStar />
  )}
</span>
)

  })

return(
  
    <section>
<div className="text-md breadcrumbs">
  <ul>
    <li>
      <Link to={'/'}>Home</Link>
      
      </li> 
    <li>
      <Link to={'/products'}>Products</Link>
      </li> 
   
  </ul>
</div>

  <div className='mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16'>
         <img
          src={image}
          alt={name}
          className='w-[32rem] h-[32rem] object-cover rounded-lg lg:w-full  '
        />

        <div>
        <h1 className='capitalize text-3xl font-bold'>{name}</h1>
        {averageRating? (
 <div className='flex items-center mt-5'>
 {generateStars}
 <p className=' text-slate-500 font-semibold ml-5'>({numOfReviews} Customer reviews)</p>
 </div>
        ):(
          <p className=' text-slate-500 font-semibold ml-5'>No customer ratings yet</p>
        )}
       
       
       
          <h4 className='text-xl text-neutral-content font-bold mt-2'>
            {company}
          </h4>

          <p className='mt-3 text-xl'>{dollarsAmount}</p>

          <p className='mt-6 leading-8'>{description}</p>

         <div className="mt-6">
          <h4 className='text-md font-medium tracking-wider capitalize'>
              colors
            </h4>

            <div className="mt-2">
              {colors.map((color)=>{
            return(
              <button
              key={color}
              type='button'
              className={`badge w-6 h-6 mr-2 ${
                color === productColor && 'border-2 border-secondary'
              }`}
              style={{backgroundColor:color}}
              onClick={()=>setProductColor(color)}
              >

              </button>
            )
              })}
            </div>

            {product.inventory<1 ? (
              <></>
            ):(
              <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <h4 className='text-md font-medium tracking-wider capitalize'>
                  amount
                </h4>
              </label>
  
              <select
    className='select select-secondary select-bordered select-md'
    value={amount}
    name='amount'
    onChange={handleAmount}
  >
   {generateAmountOptions(product.inventory)}
  </select>
                </div>
            )}
           

              <div className="mt-10">

                {product.inventory<1 ?(
                 <h3 className=' text-xl font-semibold text-red-600'>Out of Stock</h3>
                ):(
                  <button className='btn btn-secondary btn-md' onClick={addToCart}>
                  Add to bag
                </button>
                )}
            
              </div>
         </div>
        </div>
{/* <div className=' grid grid-cols-12 w-full'>
  <div className=' grid col-span-4 border border-red-400'>
  <div className="card w-96 max-h-96 bg-base-100 shadow-xl">
 
  <div className="card-body">
    <h2 className="card-title">Add your review</h2>
   {reviewedProduct?(
   
    <Form method='post' >
      
      <input type='hidden' name='reviewId' value={reviewedProduct?._id}/>
    <div >

  {Array.from({length:5},(_,index)=>{
    
    return(
      <span key={index+1} 
  className={`cursor-pointer ${index+1<=selectedStarCount ? ' text-orange-500':''}`}
  style={{fontSize:'25px '}}
  onClick={()=>setSelectedStarCount(index+1)}
  

 >&#9733;</span>
    )
  })}
    </div>
  
   <span className='rating'>Rating count:{selectedStarCount}</span>
  <input type='hidden' name='rating' value={selectedStarCount}/>
    

    <textarea placeholder="Bio" className="textarea textarea-bordered textarea-lg w-full max-w-xs" name='comment' defaultValue={reviewedProduct?.comment} >


    </textarea>
    <button type='submit' className="btn btn-primary btn-block mt-6">Update Review</button>
    </Form>  
   ):(
<Form method='post'>
    <div >
<input type='hidden' name='product' value={product._id}/>
  {Array.from({length:5},(_,index)=>{
    const rating=index+1;
    return(
      <span key={index+1} 
  className={`cursor-pointer ${index+1<=selectedStarCount ? ' text-orange-500':''}`}
  style={{fontSize:'25px '}}
  onClick={()=>setSelectedStarCount(index+1)}
  

 >&#9733;</span>
    )
  })}
    </div>
  
   <span className='rating'>Rating count:{selectedStarCount}</span>
  <input type='hidden' name='rating' value={selectedStarCount}/>
    

    <textarea placeholder="Bio" className="textarea textarea-bordered textarea-lg w-full max-w-xs" name='comment' >


    </textarea>
    {user? (
      <button type='submit' className="btn btn-primary btn-block mt-6">Submit Review</button>
    ):(
      <>
      <p className=' text-md text-slate-100'>Please Login to leave a review</p>
<Link  className="btn btn-primary btn-block mt-6" to={'/login'}>Login</Link>
</>
    )}
    
    </Form>  
   )}

  </div>
       </div>

  </div>

  <div className=' grid col-span-8 border border-blue-400'>
  <ReviewSection/>
  </div>

</div> */}
      
<div>

</div>
   
  </div>
    </section>
  )

}

export default SingleProduct