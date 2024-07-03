import React, { useEffect } from 'react'
import { FormInput, SubmitBtn } from '../components'
import { Form, redirect, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { customFetch } from '../utils'


export const action=async({request})=>{
    const formData=await request.formData()
  
  const data=Object.fromEntries(formData)
  try {
    const response=await customFetch.patch('/users/update-user-password',data)
    toast.success('Password changed');
    return redirect('/change-password');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return null;
  }
}
const ChangePassword = () => {
    const user=useSelector((state)=>state.userState.user)
    const navigate=useNavigate()
   if(!user){
  useEffect(()=>{
    navigate('/login')
  })
    toast.warn('You must be logged in!')

  
   }
  return (
    <section className=' grid justify-center'>
    <Form
      method='POST'
      className='card w-[30rem] p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
     
    >
      <h4 className='text-center text-3xl font-bold'>Change Password</h4>
     
      
      <FormInput type='password' label=' Old Password' name='oldPassword' />
      <FormInput type='password' label='New Password' name='password' />
     
      <div className='mt-4'>
    
      <button type="submit" className=' btn btn-error btn-block '>Change Password</button>
      </div>
   
    </Form>
   
  </section>
  )
}

export default ChangePassword