import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { create_experience } from '@/Services/profile/experience';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const CreateExperience = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const [error, setError] = useState({
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    setError({}); // Reset errors

    // Validation
    if (!formData.jobTitle) {
      setError((prevError) => ({ ...prevError, jobTitle: 'jobTitle is required' }));
      isValid = false;
    }
    if (!formData.company) {
      setError((prevError) => ({ ...prevError, company: 'Company is required' }));
      isValid = false;
    }
    if (!formData.startDate) {
      setError((prevError) => ({ ...prevError, startDate: 'Start date is required' }));
      isValid = false;
    }
    if (!formData.endDate) {
      setError((prevError) => ({ ...prevError, endDate: 'End date is required' }));
      isValid = false;
    }
    if (!formData.description) {
      setError((prevError) => ({ ...prevError, description: 'Description is required' }));
      isValid = false;
    }

    if (!isValid) return;

    try {
      console.debug('Request Data:', formData); 
      const response = await create_experience(formData);
      console.debug('Response:', response);
      if (response.ok) {
        toast.success('Experience created successfully');
        setTimeout(() => {
          router.push('/frontend/profile'); // Redirect to profile page after creation
        });
      } else {
        toast.error('Failed to create experience, please try again later.');
      }
    } catch (error) {
      console.error('Error creating experience:', error);
      toast.error('An error occurred while creating the experience. Please try again later.');
    }
  };

  return (
    <>
      <NavBar />
      <div className='w-full py-20 flex items-center justify-center flex-col'>
        <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>Create Experience</h1>
        <form onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4 h-full">
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block font-medium mb-2">Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            />
            {error.jobTitle && <p className="text-red-500 text-sm">{error.jobTitle}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="company" className="block font-medium mb-2">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
            {error.company && <p className="text-red-500 text-sm">{error.company}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="startDate" className="block font-medium mb-2">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            {error.startDate && <p className="text-red-500 text-sm">{error.startDate}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="endDate" className="block font-medium mb-2">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
            {error.endDate && <p className="text-red-500 text-sm">{error.endDate}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
            {error.description && <p className="text-red-500 text-sm">{error.description}</p>}
          </div>

          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md w-full">
            Create Experience
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateExperience;
