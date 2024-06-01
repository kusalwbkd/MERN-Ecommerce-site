import React, { useState } from 'react'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

import { useLoaderData } from 'react-router-dom'

const ReviewSection = () => {
  const{reviews}=useLoaderData()
  
  const[index,setIndex]=useState(2)
  const [displayedReviews, setDisplayedReviews] = useState(reviews.slice(0, 2));

  const loadMore = () => {
    const newIndex = index + 2;
    setDisplayedReviews([...displayedReviews, ...reviews.slice(index, newIndex)]);
    setIndex(newIndex);
  };

  
  if(reviews.length<1){
    return null
  }
  else{
    return (
      <div className="card card-compact w-[30rem] bg-base-100 shadow-xl">
  
    <div className="card-body text-center">
      <h2 className="card-title">Review of the product</h2>
      <div class="divide-y divide-slate-200 ...">
        {displayedReviews.map((item,idx)=>{
       const generateStars=Array.from({length:5},(_,index)=>{
        const number=index+0.5
        
        return(
          <span key={index}>
          {item.rating >= index+1 ? (
            <BsStarFill className=' text-orange-500'/>
           
          ) : item.rating >= number ? (
            <BsStarHalf className=' text-orange-500'/>

          ) : (
            <BsStar />
          )}
        </span>
        )
        
          })

           
return(
  <div className='mx-auto max-w-xl text-left mb-5' key={idx}>
  <p className=' font-bold'>{item?.user?.name}</p>
  <div className=' flex mt-5'>
  {generateStars}
  </div>
  <p className='mt-10'>
    {item.comment}
  </p>
</div>
)
        })}
  {index < reviews.length && (
            <button className="btn btn-block btn-primary mt-6" onClick={loadMore}>
              Load More
            </button>
          )}
 
 
</div>
     
   


    </div>
  </div>
      
    )
  }
  
}

export default ReviewSection