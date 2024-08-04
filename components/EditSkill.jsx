import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/router';
import { get_skills, update_skill } from '@/Services/profile/skill'; // Ensure you have these functions
import { toast, ToastContainer } from 'react-toastify';

const EditSkill = () => {
  const router = useRouter();
  const { skillId } = router.query; // Get the dynamic skillId from the URL

  const [formData, setFormData] = useState({
    skillName: '',
    description: '',
    skillLevel: 0, // Assuming skill level is a number (0-10)
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skills = await get_skills(); // Fetch all skills
        const skillToEdit = skills.find(skill => skill.skillID === parseInt(skillId)); // Find the specific skill

        if (skillToEdit) {
          setFormData({
            skillName: skillToEdit.skillName,
            description: skillToEdit.description,
            skillLevel: skillToEdit.skillLevel,
          });
        } else {
          toast.error('Skill not found.');
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
        toast.error('Failed to fetch skills. Please try again later.');
      }
    };

    if (skillId) {
      fetchSkills();
    }
  }, [skillId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await update_skill(skillId, formData); // Call the update function
      toast.success('Skill updated successfully');
      setTimeout(() => {
        router.push('/frontend/profile'); // Redirect to the profile page after update
      }, 1000);
    } catch (error) {
      console.error('Error updating skill:', error);
      toast.error('Failed to update skill. Please try again later.');
    }
  };

  return (
    <>
      <NavBar />
      <div className='w-full py-20 flex items-center justify-center flex-col'>
        <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>Edit Skill</h1>
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
              required
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
              max="5"
              required
            />
          </div>

          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md w-full">
            Update Skill
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditSkill;
