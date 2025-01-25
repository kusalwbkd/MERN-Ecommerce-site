import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import FormInput from './FormInput'
import FormSelect from './FormSelect';
import FormRange from './FormRange';
import FormCheckbox from './FormCheckbox';
import { useSelector } from 'react-redux';
import { useFilterContext } from '../context/FilterContext';

const Filters = () => {
  const { products, categories, companies } = useLoaderData();

  const {
    filtered_products,
    sort,
    filters: {
      text = '',
      category,
      company,
      color,
      min_price,
      price,
      max_price,
      freeShipping=true,

    },
    updateFilters,
    updateSort,
    all_products,
    clearFilters,
  } = useFilterContext()


  return (
    <form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>

      <FormInput
        type='search'
        label='search product'
        name='text'
        size='input-sm'
        value={text}
        onChange={updateFilters}
      />
      <FormSelect
        label='select category'
        name='category'
        list={['all', ...categories]}
        size='select-sm'
        value={category}
        onChange={updateFilters}
      />
      <FormSelect
        label='select company'
        name='company'
        list={['all', ...companies]}
        size='select-sm'
        value={company}
        onChange={updateFilters}
      />

      <FormSelect
        label='sort by'
        name='sort'
        list={['a-z', 'z-a', 'price-lowest', 'price-highest', 'latest',]}
        size='select-sm'
        value={sort}
        onChange={updateSort}

      />
      <FormRange
        name='price'
        label='select price'
        size='range-sm'
        price={price}
        maxPrice={max_price}
        onChange={updateFilters}

      />

      <FormCheckbox
        name='freeShipping'
        label='free shipping'
        size='checkbox-sm'
     
        checked={freeShipping}
        onChange={updateFilters}
      />
      {/*
   
   
   
 
   
   
   */}

    
      <Link to='/products' className='btn btn-accent btn-sm' onClick={clearFilters}>
        reset
      </Link>
    </form>
  )
}

export default Filters