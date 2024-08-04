import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Router from 'next/router';
import { login_me } from '@/Services/auth';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/Utils/UserSlice';
import NavBar from '@/components/NavBar';

// Function to decode JWT
const decodeJWT = (token) => {
  const payload = token.split('.')[1]; // Get the payload part of the JWT
  const decodedPayload = JSON.parse(atob(payload)); // Decode the Base64 payload
  return decodedPayload;
};

export default function Login() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setError({ ...error, email: "Email Field is Required" });
      return;
    }
    if (!formData.password) {
      setError({ ...error, password: "Password Field is required" });
      return;
    }
  
    try {
      const res = await login_me(formData);
      
      if (res && res.token) { 
        // Set the cookie for the token
        Cookies.set('token', res.token, { expires: 7, secure: true, sameSite: 'none' });

        // Decode the token to get user details using the custom function
        const decodedToken = decodeJWT(res.token);
        const userId = decodedToken.sub; // Adjust based on your token structure
        const name = decodedToken.name; // Adjust based on your token structure

        // Store user data in local storage and Redux
        localStorage.setItem('user', JSON.stringify(res));
        dispatch(setUserData(res)); 

        // Redirect to the profile page with username and userId
        // Router.push(`/frontend/profile/${name}-${userId}`);
        Router.push('/');
      } else {
        toast.error(res.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login. Please try again later.');
    }
  };

  useEffect(() => {
    if (Cookies.get('token')) {
      Router.push('/');
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className='w-full h-screen bg-indigo-600'>
        <div className="flex flex-col items-center text-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white text-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div className='text-left'>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                  <input 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5" 
                    placeholder="name@company.com" 
                    required 
                  />
                  {error.email && <p className="text-sm text-red-500">{error.email}</p>}
                </div>
                <div className='text-left'>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                  <input 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="••••••••" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5" 
                    required 
                  />
                  {error.password && <p className="text-sm text-red-500">{error.password}</p>}
                </div>
                <button 
                  type="submit" 
                  className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light ">
                  Don’t have an account yet? <Link href="/auth/register" className="font-medium text-indigo-600 hover:underline ">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
