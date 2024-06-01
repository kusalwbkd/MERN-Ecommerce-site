import React from 'react'
import { Form, Link, useLoaderData, useSubmit } from 'react-router-dom'
import FormInput from './FormInput'
import FormSelect from './FormSelect';
import FormRange from './FormRange';
import FormCheckbox from './FormCheckbox';

const Filters = () => {
  const {products,categories,companies,params}=useLoaderData();
console.log(products);
 
 
  return (
    <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
   
    <FormInput
      type='search'
      label='search product'
      name='search'
      size='input-sm'
      defaultValue={params.search}
    />
     <FormSelect
      label='select category'
      name='category'
     list={['all',...categories]}
      size='select-sm'
    defaultValue={params.category}
    />
     <FormSelect
      label='select company'
      name='company'
      list={['all',...companies]}
      size='select-sm'
      defaultValue={params.company}
    />
   
     <FormSelect
      label='sort by'
      name='sort'
      list={['a-z', 'z-a', 'highest', 'lowest']}
      size='select-sm'
      defaultValue={params.sort}
    />
<FormRange
      name='price'
      label='select price'
      size='range-sm'
      price={params.price}
    
    />

<FormCheckbox
      name='freeShipping'
      label='free shipping'
      size='checkbox-sm'
      defaultValue={params.freeShipping}
    /> 
    {/*
   
   
   
 
   
   
   */}
   
    <button type='submit' className='btn btn-primary btn-sm'>
      search
    </button>
    <Link to='/products' className='btn btn-accent btn-sm'>
      reset
    </Link>
  </Form>
  )
}

export default Filters