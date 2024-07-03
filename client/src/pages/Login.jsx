import React from 'react'
import { Form, Link, redirect } from 'react-router-dom'
import { FormInput } from '../components'
import SubmitBtn from '../components/SubmitBtn'
import { customFetch } from '../utils'
import { loginUser } from '../features/user/userSlice'
import { toast } from 'react-toastify'

export const action=(store)=>async({request})=>{
  const formData=await request.formData()
  
  const data=Object.fromEntries(formData)
  try {
    const response=await customFetch.post('/auth/login',data)
    store.dispatch(loginUser(response.data))
 
    toast.success('logged in successfully');
    return redirect('/');
  } catch (error) {
  
    const errorMessage =
    error?.response?.data?.error?.message ||
    'please double check your credentials';

  toast.error(errorMessage);
  return null;
  }
  return null
}



const Login = () => {
  return (
    <section className='h-screen grid place-items-center'>
    <Form method='post' className='card w-[30rem] p-8 bg-base-100 shadow-lg flex flex-col gap-y-4' >

      <h3>Use these values as credentials or just click Login button</h3>
      <p>email:{''}userdb@gmail.com</p>
      <p>password:{''}password</p>
    <h4 className='text-center text-3xl font-bold'>Login</h4>
        <FormInput
          type='email'
          label='email'
          name='email'
          defaultValue='userdb@gmail.com'
        />
        <FormInput
          type='password'
          label='password'
          name='password'
          defaultValue='password'
        />
        <div className='mt-4'>
        <SubmitBtn text='Login' />
        </div>
        
        <p className='text-center'>
          Not a member yet?
          <Link
            to='/register'
            className='ml-2 link link-hover link-primary capitalize'
          >
            register
          </Link>
        </p>

    </Form>
    </section>
  )
}

export default Login