import React, { useState } from 'react'
import { Form, Link, useLoaderData } from 'react-router-dom'
import { FormInput, SubmitBtn } from '../components'
import { customFetch } from '../utils'
import { FaUser } from 'react-icons/fa6'
import { toast } from 'react-toastify'

export const loader=async({params})=>{
    const {data}=await customFetch.get('/users/showMe')
    
    return data
}

export const action=async({request,params})=>{
  const formData = await request.formData();
  try {
    await customFetch.patch(`/users/updateUser`, formData);
  
    toast.success('Profile updated successfully');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return null;
  }
}

const Profile = () => {
   const {user} =useLoaderData()
   
    const{name,email,lastName,location,avatar}=user
    const[photo,setPhoto]=useState(avatar)
    const[image,setImage]=useState(null)
    const handleChange=(e)=>{
      setPhoto(null)
      setImage(e.target.files[0])
    }
  return (
    <section className='h-screen grid place-items-center'>
    <Form
      method='POST'
      className='card w-[30rem] p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      encType='multipart/form-data'
    >
      <h4 className='text-center text-3xl font-bold'>Edit Profile</h4>
      {image && <div className="avatar flex items-center justify-center">
  <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
    <img src={URL.createObjectURL(image)} />
  </div>
</div>}

{photo &&  <div className="avatar flex items-center justify-center">
  <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
    <img src={avatar} />
  </div>
</div>}
{(!photo && !image) && <div className=" flex items-center justify-center ">
<FaUser className='h-24 w-24'/>
</div>}
      
      <FormInput type='text' label='name' name='name' defaultValue={name}/>
      <FormInput type='email' label='email' name='email' defaultValue={email} />
      <FormInput type='text' label='Last Name' name='lastName' defaultValue={lastName}/>
      <FormInput type='text' label='Location' name='location' defaultValue={location}/>
      <label className="form-control w-full max-w-xs" >
  <div className="label">
    <span className="label-text">Change profile Photo</span>
    
  </div>
  <input type="file" name="avatar" className="file-input file-input-bordered w-full max-w-xs"accept='image/*' onChange={(e)=> handleChange(e)} /> 
  
</label>
      <div className='mt-4'>
      <SubmitBtn text='Edit Profile' />
      <Link to={'../change-password'} className=' btn btn-error btn-block mt-5'>Change Password</Link>
      </div>
   
    </Form>
   
  </section>
  )
}

export default Profile