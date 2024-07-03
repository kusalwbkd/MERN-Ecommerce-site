import { FormInput } from '../components';
import { Form, Link, redirect } from 'react-router-dom';
import SubmitBtn from '../components/SubmitBtn';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';

export const action=async({request})=>{
const formData=await request.formData()
const data=Object.fromEntries(formData)
try {
  await customFetch.post('/auth/register',data)
  toast.success('Registration successful');
  return redirect('/login');
} catch (error) {
  toast.error(error?.response?.data?.msg);
  return error;
}

}


const Register = () => {

  return (
    <section className='h-screen grid place-items-center'>
      <Form
        method='POST'
        className='card w-[30rem] p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Register</h4>
        <FormInput type='text' label='name' name='name' />
        <FormInput type='email' label='email' name='email' />
        <FormInput type='password' label='password' name='password' />
        <FormInput type='text' label='Last Name' name='lastName' />
        <FormInput type='text' label='Location' name='location' />
        <div className='mt-4'>
        <SubmitBtn text='Register' />
        </div>

        <p className='text-center'>
          Already a member?
          <Link
            to='/login'
            className='ml-2 link link-hover link-primary capitalize'
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;