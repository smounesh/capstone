import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/router';
import { get_educations, update_education } from '@/Services/profile/education'; // Ensure you have these functions
import { toast, ToastContainer } from 'react-toastify';

const EditEducation = () => {
  const router = useRouter();
  const { educationId } = router.query; // Get the education ID from the query parameters

  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    startYear: '',
    endYear: '',
    fieldOfStudy: '',
  });

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const educations = await get_educations(); // Fetch all educations
        const educationToEdit = educations.find(edu => edu.educationID === parseInt(educationId)); // Find the specific education

        if (educationToEdit) {
          setFormData({
            educationID: educationToEdit.educationID,
            degree: educationToEdit.degree,
            institution: educationToEdit.institution,
            startYear: educationToEdit.startYear,
            endYear: educationToEdit.endYear,
            fieldOfStudy: educationToEdit.fieldOfStudy,
          });
        } else {
          toast.error('Education not found.');
        }
      } catch (error) {
        console.error('Error fetching educations:', error);
        toast.error('Failed to fetch educations. Please try again later.');
      }
    };

    if (educationId) {
      fetchEducations();
    }
  }, [educationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.debug('Updating education:', formData);
      const res = await update_education(educationId, formData); 
      console.debug('Response:', res);
      if (res.ok){
      toast.success('Education updated successfully');
      setTimeout(() => {
        router.push('/frontend/profile');
      });
    }
    else {
        toast.error('Failed to update education. Please try again later.');
        }
    } catch (error) {
      console.error('Error updating education:', error);
      toast.error('Failed to update education. Please try again later.');
    }
  };

  return (
    <>
      <NavBar />
      <div className='w-full py-20 flex items-center justify-center flex-col'>
        <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>Edit Education</h1>
        <form onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4 h-full">
          <div className="mb-4">
            <label htmlFor="degree" className="block font-medium mb-2">Degree</label>
            <input
              type="text"
              id="degree"
              name="degree"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="institution" className="block font-medium mb-2">Institution</label>
            <input
              type="text"
              id="institution"
              name="institution"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="startYear" className="block font-medium mb-2">Start Year</label>
            <input
              type="number"
              id="startYear"
              name="startYear"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.startYear}
              onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="endYear" className="block font-medium mb-2">End Year</label>
            <input
              type="number"
              id="endYear"
              name="endYear"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.endYear}
              onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fieldOfStudy" className="block font-medium mb-2">Field of Study</label>
            <input
              type="text"
              id="fieldOfStudy"
              name="fieldOfStudy"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.fieldOfStudy}
              onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md w-full">
            Update Education
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditEducation;
