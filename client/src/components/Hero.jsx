import React from 'react'
import { Link } from 'react-router-dom'

import hero4 from '../assets/hero4.jpg'

const Hero = () => {
    
  return (
    <>

    
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-24 items-center'>
        <div>
        <h1 className='max-w-2xl text-4xl font-bold tracking-tight  sm:text-6xl '>
          We’re changing the way people shop.
        </h1>
        <p className='mt-8 max-w-xl text-lg leading-8'>
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
          qui lorem cupidatat commodo.
        </p>
        <div className='mt-10 '>
          <Link to='products' className='btn btn-primary '>
            Our Products
          </Link>
        </div>
        </div>

        <div className="hidden  h-[28rem] lg:flex   p-4 space-x-4 bg-neutral rounded-box">
          
 <img src={hero4} className='h-full w-full object-cover'/>

</div>

      
      </div>
    </>

  )
}

export default Hero