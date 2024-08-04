import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { create_skill } from '@/Services/profile/skill'; // Import your service function for creating a skill
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const CreateSkill = () => {
  const router = useRouter();
  const user = useSelector(state => state.User.userData);
  const [formData, setFormData] = useState({
    skillName: '',
    description: '',
    skillLevel: 0, // Assuming skill level is a number or can be adjusted as needed
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await create_skill(formData); // Call the create skill function
      toast.success('Skill created successfully');
      setTimeout(() => {
        router.push(`/frontend/profile/${user.name}-${user.userID}`); // Redirect to the profile page after creation
      }, 1000);
    } catch (error) {
      console.error('Error creating skill:', error);
      toast.error('Failed to create skill. Please try again later.');
    }
  };

  return (
    <>
      <NavBar />
      <div className='w-full py-20 flex items-center justify-center flex-col'>
        <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>Create Skill</h1>
        <form onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4 h-full">
          <div className="mb-4">
            <label htmlFor="skillName" className="block font-medium mb-2">Skill Name</label>
            <input
              type="text"
              id="skillName"
              name="skillName"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.skillName}
              onChange={(e) => setFormData({ ...formData, skillName: e.target.value })}
              required
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

          <div className="mb-4">
            <label htmlFor="skillLevel" className="block font-medium mb-2">Skill Level (0-5)</label>
            <input
              type="number"
              id="skillLevel"
              name="skillLevel"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.skillLevel}
              onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value })}
              min="0"
              max="10"
              required
            />
          </div>

          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md w-full">
            Create Skill
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateSkill;
