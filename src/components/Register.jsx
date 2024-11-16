import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const API_URL = 'http://localhost/ca3';

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/api/register.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      toast.success('User registered successfully');
    } else {
      toast.error('Registration failed');
    }
  };

  return (
    <>
      <div className='min-h-screen flex justify-center items-center flex-col bg-gradient-to-b from-gray-900 to-black'>
        <form onSubmit={handleSubmit} className='bg-white py-12 px-6 rounded-lg  flex flex-col'>
          <h2 className='font-semibold mb-10 text-center text-3xl'>Welcome</h2>

          <div className='relative mb-2'>
            <input
              type="text"
              id='name'
              name='username'
              value={formData.username}
              onChange={handleInputChange}
              required
              placeholder=' '
              className='mb-4 p-4 border border-b-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 w-96 h-14'
            />
            <label
              className='text-xl text-gray-400 text-opacity-80 absolute left-0 top-0 mx-6 mt-3 px-1 transition duration-200 input-text'
              htmlFor='name'
            >
              Username
            </label>
          </div>

          <div className='relative mb-2'>
            <input
              type="email"
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder=' '
              className='mb-4 p-4 border border-b-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 w-96 h-14'
            />
            <label
              className='text-xl text-gray-400 text-opacity-80 absolute left-0 top-0 mx-6 mt-3 px-1 transition duration-200 input-text'
              htmlFor='email'
            >
              Email Address
            </label>
          </div>


          <div className='relative mb-2'>
            <input
              type="password"
              id='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder=' '
              className='mb-4 p-4 border border-b-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 w-96 h-14'
            />
            <label
              className='text-xl text-gray-400 text-opacity-80 absolute left-0 top-0 mx-6 mt-3 px-1 transition duration-200 input-text'
              htmlFor='email'
            >
              Password
            </label>
          </div>



          <button type="submit" className='bg-teal-600 text-white rounded-md h-14 hover:bg-teal-700 transition duration-200'>Sign up</button>
          <Toaster />
        </form>
        <div className='text-white mt-5'>Already have an account? <a href="/login" className='text-teal-500'>Log In</a></div>
      </div>
      <div >

      </div>



    </>

  )
}

export default Register;