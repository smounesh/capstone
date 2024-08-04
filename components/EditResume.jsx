import React, { useState, useEffect, useCallback } from 'react';
import NavBar from '@/components/NavBar';
import { get_resumes, update_resume } from '@/Services/profile/resume'; // Ensure you have these functions
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { InfinitySpin } from 'react-loader-spinner';
import { useDropzone } from 'react-dropzone';

const EditResume = () => {
  const router = useRouter();
  const { resumeId } = router.query; // Get the resume ID from the query parameters

  const [formData, setFormData] = useState({
    title: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const resumes = await get_resumes(); // Fetch all resumes
        const resumeToEdit = resumes.find(resume => resume.resumeID === parseInt(resumeId)); // Find the specific resume

        if (resumeToEdit) {
          setFormData({
            title: resumeToEdit.title,
            file: null, // Keep file null initially, as we won't update the file on edit
          });
        } else {
          toast.error('Resume not found.');
        }
      } catch (error) {
        console.error('Error fetching resumes:', error);
        toast.error('Failed to fetch resumes. Please try again later.');
      }
    };

    if (resumeId) {
      fetchResumes();
    }
  }, [resumeId]);

  const onDrop = useCallback((acceptedFiles) => {
    setFormData({ ...formData, file: acceptedFiles[0] });
  }, [formData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    if (formData.file) {
      data.append('file', formData.file); // Include the file only if it exists
    }
    data.append('title', formData.title); // Include the title
    data.append('Status', 'Active'); // Set the status to Active
    data.append('resumeID', resumeId); // Include the resumeID

    try {
      console.debug("Resume update request data:", data);
      const res = await update_resume(resumeId, data); 
      console.debug("Resume update response:", res);

      if (res.ok) {
        toast.success('Resume updated successfully');
        setTimeout(() => {
          router.push('/frontend/profile'); 
        }, 250);
      } else {
        toast.error('Failed to update resume. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating resume:', error);
      toast.error('Failed to update resume. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className='w-full h-screen flex items-center justify-center flex-col pt-2 bg-gray-100'>
        {loading ? (
          <InfinitySpin width="200" color="#4f46e5" />
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-4 w-full sm:w-1/2">
            <h1 className='text-2xl uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-6 text-center'>Edit Resume</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="file" className="block font-medium mb-2">File</label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${
                    isDragActive ? 'border-indigo-600' : 'border-gray-300'
                  }`}
                >
                  <input {...getInputProps()} />
                  {formData.file ? (
                    <p>{formData.file.name}</p>
                  ) : (
                    <p>Drag & drop a file here, or click to select a file</p>
                  )}
                </div>
              </div>
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md w-full">
                Update Resume
              </button>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default EditResume;