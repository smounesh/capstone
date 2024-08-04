import React, { useState, useCallback } from 'react';
import NavBar from '@/components/NavBar';
import { create_resume } from '@/Services/profile/resume';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { InfinitySpin } from 'react-loader-spinner';
import { useDropzone } from 'react-dropzone';

const CreateResume = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFormData({ ...formData, file: acceptedFiles[0] });
  }, [formData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a new FormData instance
    const data = new FormData();
    data.append('file', formData.file);
    data.append('title', formData.title); // If you want to include the title as well

    try {
      await create_resume(data);
      toast.success('Resume created successfully');
      setTimeout(() => {
        router.push('/frontend/profile');
      }, 500); // Added delay to ensure toast is visible
    } catch (error) {
      console.error('Error creating resume:', error);
      toast.error('Failed to create resume. Please try again later.');
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
            <h1 className='text-2xl uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-6 text-center'>Create Resume</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="file" className="block font-medium mb-2">File</label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${
                    isDragActive ? 'border-indigo-600' : 'border-gray-300'
                  }`}
                >
                  <input {...getInputProps()} required />
                  {formData.file ? (
                    <p>{formData.file.name}</p>
                  ) : (
                    <p>Drag & drop a file here, or click to select a file</p>
                  )}
                </div>
              </div>
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md w-full">
                Create Resume
              </button>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateResume;