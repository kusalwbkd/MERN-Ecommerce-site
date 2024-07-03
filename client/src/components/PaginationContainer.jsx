import React from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const PaginationContainer = () => {
  const{currentPage,numOfPages}=useLoaderData()

  const pages=Array.from({length:numOfPages},(_,index)=>{
    return index+1
  })
  const{search,pathname}=useLocation()
  const navigate=useNavigate()

  const hadlePageNumber=(pageNumber)=>{
  const searchParams=new URLSearchParams(search)
  searchParams.set('page',pageNumber)
  navigate(`${pathname}?${searchParams.toString()}`)
 
  }

  if(numOfPages<2){
return null
  }
  return (
    <div className=' mt-16 flex justify-end'>
     <div className="join">
      <button className='btn btn-xs sm:btn-md join-item' onClick={
        ()=>{
          
          let prevPage=currentPage-1
          if(prevPage<1){
           return prevPage=numOfPages
          }
          hadlePageNumber(prevPage)
        
        }
        
        }>
     Prev
      </button>
{pages?.map((page)=>{
 return <button key={page} className={`btn btn-xs md:btn-md join-item ${page === currentPage ?' bg-base-300 border-base-300':''}`} 
 
 onClick={()=>hadlePageNumber(page)}
 >
 {page}
 </button>
})}
      <button className='btn btn-xs sm:btn-md join-item' onClick={()=>{
       let nextPage=currentPage+1
       if(nextPage>numOfPages){
        return nextPage=1
       }
       hadlePageNumber(nextPage)
        
        }}>
     Next
      </button>
     </div>
    </div>
  )
}

export default PaginationContainer