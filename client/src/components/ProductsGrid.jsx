import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { formatPrice } from '../utils'
import { useFilterContext } from '../context/FilterContext'

const ProductsGrid = () => {
  const { filtered_products: products } = useFilterContext()

  return (
    <div className=' pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {products?.map((product, index) => {
        const { name, price, image } = product;
        const dollarsAmount = price;

        return (
          <Link
            key={index}
            to={`/products/${product?.id}`}
            className='card w-full  shadow-xl hover:shadow-2xl transition duration-300'
          >
            <figure className='px-5 pt-5'>
              <img
                src={image}
                alt={name}
                className='rounded-xl h-72 md:h-54 w-full object-cover'
              />
            </figure>
            <div className='card-body items-center text-center'>
              <h2 className='card-title capitalize tracking-wider'>{name}</h2>
              <span className='text-secondary'>{formatPrice(dollarsAmount)}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default ProductsGrid