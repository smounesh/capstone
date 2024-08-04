import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/router';
import { get_experience, update_experience } from '@/Services/profile/experience';
import { toast, ToastContainer } from 'react-toastify';

const EditExperience = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  useEffect(() => {
    // Fetch the experience data using the query parameter
    // and populate the form fields
    const fetchExperience = async () => {
      try {
        const experience = await get_experience(router.query.experienceId);
        setFormData({
          title: experience.title,
          company: experience.company,
          startDate: experience.startDate,
          endDate: experience.endDate,
          description: experience.description,
        });
      } catch (error) {
        console.error('Error fetching experience:', error);
        toast.error('Failed to fetch experience data. Please try again later.');
      }
    };

    if (router.query.experienceId) {
      fetchExperience();
    }
  }, [router.query.experienceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await update_experience(router.query.experienceId, formData);
      toast.success('Experience updated successfully');
      setTimeout(() => {
        router.push('/frontend/profile'); // Redirect to the profile page after update
      }, 1000);
    } catch (error) {
      console.error('Error updating experience:', error);
      toast.error('Failed to update experience. Please try again later.');
    }
  };

  return (
    <>
      <NavBar />
      <div className='w-full py-20 flex items-center justify-center flex-col'>
        <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>Edit Experience</h1>
        <form onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4 h-full">
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
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
          </div>

          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md w-full">
            Update Experience
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditExperience;
