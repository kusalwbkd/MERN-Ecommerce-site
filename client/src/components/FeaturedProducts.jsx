import React, { useEffect } from 'react'
import SectionTitle from './SectionTitle'
import ProductsGrid from './ProductsGrid'
import { useFilterContext } from '../context/FilterContext'
import FeaturedProductsGrid from './FeaturedProductsGrid'

const FeaturedProducts = () => {



  return (
    <div className='pt-24'>
      <SectionTitle text={'featured products'} />
      <FeaturedProductsGrid />
    </div>
  )
}

export default FeaturedProducts