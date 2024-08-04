import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Intro() {
  const router = useRouter();
  const handleClick = () => {
      // Navigate to displayJobs page
      router.push('/frontend/displayJobs');
  };
  return (
      <>
          <div className='w-full h-full flex items-center lg:justify-center py-12 justify-center flex-wrap bg-gray-100'>
              <div className='lg:w-3/6 w-full sm:p-2 h-full my-2 flex items-center justify-center px-4 md:items-center md:justify-center md:p-10 flex-col bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200'>
                  <h1 className='md:text-6xl text-2xl sm:text-2xl font-extrabold mb-4 text-gray-800 text-center'>
                      Find Your <span className='text-indigo-600'>Dream Job</span> Today
                  </h1>
                  <p className='md:text-lg sm:text-sm text-xs mb-8 text-gray-500 text-center'>
                      Discover the perfect job for you in our extensive database of opportunities.
                  </p>
                  <button
                      onClick={handleClick}
                      className='px-6 py-3 my-2 border border-indigo-600 rounded-full uppercase tracking-widest mx-4 text-white bg-indigo-600 transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-indigo-600'
                  >
                      Explore Jobs
                  </button>
              </div>
              <div className='lg:w-3/6 w-full my-2 h-full bg-gray-200 hidden items-center justify-center flex-col p-20 lg:flex'>
                  <Image width={600} height={700} src="/intro.png" alt="no-image-found" />
              </div>
          </div>
          {/* Featured Job Categories Section
          <div className='w-full py-10 bg-white'>
              <h2 className='text-3xl font-semibold text-center text-gray-800 mb-6'>
                  Explore Popular Job Categories
              </h2>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto'>
                  <div className='bg-indigo-100 shadow-md rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-600 hover:text-white transition-all duration-300' onClick={() => router.push('/frontend/displayJobs?category=Software')}>
                      <i className='fas fa-code text-3xl mb-2 text-indigo-600'></i>
                      <h3 className='text-lg font-semibold text-gray-800'>Software</h3>
                  </div>
                  <div className='bg-green-100 shadow-md rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-green-600 hover:text-white transition-all duration-300' onClick={() => router.push('/frontend/displayJobs?category=Marketing')}>
                      <i className='fas fa-bullhorn text-3xl mb-2 text-green-600'></i>
                      <h3 className='text-lg font-semibold text-gray-800'>Marketing</h3>
                  </div>
                  <div className='bg-blue-100 shadow-md rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-600 hover:text-white transition-all duration-300' onClick={() => router.push('/frontend/displayJobs?category=Design')}>
                      <i className='fas fa-paint-brush text-3xl mb-2 text-blue-600'></i>
                      <h3 className='text-lg font-semibold text-gray-800'>Design</h3>
                  </div>
                  <div className='bg-yellow-100 shadow-md rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-yellow-600 hover:text-white transition-all duration-300' onClick={() => router.push('/frontend/displayJobs?category=Business')}>
                      <i className='fas fa-briefcase text-3xl mb-2 text-yellow-600'></i>
                      <h3 className='text-lg font-semibold text-gray-800'>Business</h3>
                  </div>
                  <div className='bg-red-100 shadow-md rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300' onClick={() => router.push('/frontend/displayJobs?category=Healthcare')}>
                      <i className='fas fa-medkit text-3xl mb-2 text-red-600'></i>
                      <h3 className='text-lg font-semibold text-gray-800'>Healthcare</h3>
                  </div>
                  <div className='bg-purple-100 shadow-md rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-600 hover:text-white transition-all duration-300' onClick={() => router.push('/frontend/displayJobs?category=Education')}>
                      <i className='fas fa-graduation-cap text-3xl mb-2 text-purple-600'></i>
                      <h3 className='text-lg font-semibold text-gray-800'>Education</h3>
                  </div>
              </div>
          </div> */}
      </>
  );
}