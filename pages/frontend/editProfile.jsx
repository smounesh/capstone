import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { update_profile } from '@/Services/profile/profile';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const EditProfile = () => {
  const router = useRouter();
  const { profilePictureBase64, Headline, Summary, Location, PhoneNumber, LinkedinUrl, GitHubUrl, YearsOfExperience } = router.query;

  const [formData, setFormData] = useState({
    profilePictureBase64: null,
    Headline: '',
    Summary: '',
    Location: '',
    PhoneNumber: '',
    LinkedinUrl: '',
    GitHubUrl: '',
    YearsOfExperience: 0,
  });

  // Use effect to set form data when router is ready
  useEffect(() => {
    if (router.isReady) {
      setFormData({
        profilePictureBase64: profilePictureBase64 ? profilePictureBase64 : null,
        Headline: Headline || '',
        Summary: Summary || '',
        Location: Location || '',
        PhoneNumber: PhoneNumber || '',
        LinkedinUrl: LinkedinUrl || '',
        GitHubUrl: GitHubUrl || '',
        YearsOfExperience: YearsOfExperience || 0,
      });
    }
  }, [router.isReady, profilePictureBase64, Headline, Summary, Location, PhoneNumber, LinkedinUrl, GitHubUrl, YearsOfExperience]);

  const [error, setError] = useState({
    profilePictureBase64: '',
    Headline: '',
    Summary: '',
    Location: '',
    PhoneNumber: '',
    LinkedinUrl: '',
    GitHubUrl: '',
    YearsOfExperience: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    setError({}); // Reset errors

    if (!formData.profilePictureBase64) {
      setError((prevError) => ({ ...prevError, profilePictureBase64: 'Profile Picture is required' }));
      isValid = false;
    }

    if (!formData.Headline) {
      setError((prevError) => ({ ...prevError, Headline: 'Headline is required' }));
      isValid = false;
    }

    if (!formData.Summary) {
      setError((prevError) => ({ ...prevError, Summary: 'Summary is required' }));
      isValid = false;
    }

    if (!formData.Location) {
      setError((prevError) => ({ ...prevError, Location: 'Location is required' }));
      isValid = false;
    }

    if (!formData.PhoneNumber) {
      setError((prevError) => ({ ...prevError, PhoneNumber: 'Phone Number is required' }));
      isValid = false;
    }

    if (!formData.LinkedinUrl) {
      setError((prevError) => ({ ...prevError, LinkedinUrl: 'LinkedIn URL is required' }));
      isValid = false;
    }

    if (!formData.GitHubUrl) {
      setError((prevError) => ({ ...prevError, GitHubUrl: 'GitHub URL is required' }));
      isValid = false;
    }

    if (!formData.YearsOfExperience) {
      setError((prevError) => ({ ...prevError, YearsOfExperience: 'Years of Experience is required' }));
      isValid = false;
    }

    if (!isValid) return;

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('profilePictureBase64', formData.profilePictureBase64);
    formDataToSubmit.append('Headline', formData.Headline);
    formDataToSubmit.append('Summary', formData.Summary);
    formDataToSubmit.append('Location', formData.Location);
    formDataToSubmit.append('PhoneNumber', formData.PhoneNumber);
    formDataToSubmit.append('LinkedinUrl', formData.LinkedinUrl);
    formDataToSubmit.append('GitHubUrl', formData.GitHubUrl);
    formDataToSubmit.append('YearsOfExperience', formData.YearsOfExperience);

    console.log('Form Data To Submit:', formDataToSubmit); // Log the form data

    try {
      const response = await update_profile(formDataToSubmit);
      if (response.ok) {
        toast.success('Profile updated successfully');
        setTimeout(() => {
          router.push('/frontend/profile');
        }, 1000);
      } else {
        const errorMessage = await response.json();
        toast.error(errorMessage.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating the profile. Please try again later.');
    }
  };

  return (
    <>
      <NavBar />
      <div className='w-full py-20 flex items-center justify-center flex-col'>
        <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>Edit Profile</h1>
        <form onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4 h-full">
          <div className="mb-4">
            <label htmlFor="profilePictureBase64" className="block font-medium mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePictureBase64"
              name="profilePictureBase64"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              onChange={(e) => setFormData({ ...formData, profilePictureBase64: e.target.files[0] })}
            />
            {error.profilePictureBase64 && <p className="text-red-500 text-sm">{error.profilePictureBase64}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="Headline" className="block font-medium mb-2">
              Headline
            </label>
            <input
              type="text"
              id="Headline"
              name="Headline"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.Headline}
              onChange={(e) => setFormData({ ...formData, Headline: e.target.value })}
            />
            {error.Headline && <p className="text-red-500 text-sm">{error.Headline}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="Summary" className="block font-medium mb-2">
              Summary
            </label>
            <textarea
              id="Summary"
              name="Summary"
              rows="3"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.Summary}
              onChange={(e) => setFormData({ ...formData, Summary: e.target.value })}
            ></textarea>
            {error.Summary && <p className="text-red-500 text-sm">{error.Summary}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="Location" className="block font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              id="Location"
              name="Location"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.Location}
              onChange={(e) => setFormData({ ...formData, Location: e.target.value })}
            />
            {error.Location && <p className="text-red-500 text-sm">{error.Location}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="PhoneNumber" className="block font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="PhoneNumber"
              name="PhoneNumber"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.PhoneNumber}
              onChange={(e) => setFormData({ ...formData, PhoneNumber: e.target.value })}
            />
            {error.PhoneNumber && <p className="text-red-500 text-sm">{error.PhoneNumber}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="LinkedinUrl" className="block font-medium mb-2">
              LinkedIn URL
            </label>
            <input
              type="url"
              id="LinkedinUrl"
              name="LinkedinUrl"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.LinkedinUrl}
              onChange={(e) => setFormData({ ...formData, LinkedinUrl: e.target.value })}
            />
            {error.LinkedinUrl && <p className="text-red-500 text-sm">{error.LinkedinUrl}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="GitHubUrl" className="block font-medium mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              id="GitHubUrl"
              name="GitHubUrl"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.GitHubUrl}
              onChange={(e) => setFormData({ ...formData, GitHubUrl: e.target.value })}
            />
            {error.GitHubUrl && <p className="text-red-500 text-sm">{error.GitHubUrl}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="YearsOfExperience" className="block font-medium mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              id="YearsOfExperience"
              name="YearsOfExperience"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.YearsOfExperience}
              onChange={(e) => setFormData({ ...formData, YearsOfExperience: e.target.value })}
            />
            {error.YearsOfExperience && <p className="text-red-500 text-sm">{error.YearsOfExperience}</p>}
          </div>

          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md w-full">
            Save
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditProfile;