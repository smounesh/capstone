import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { InfinitySpin } from 'react-loader-spinner';
import { get_profile_by_user, hasUserProfile } from '@/Services/profile/profile';
import { get_experiences_by_user, delete_experience } from '@/Services/profile/experience';
import { get_educations_by_user, delete_education } from '@/Services/profile/education';
import { get_skills_by_user, delete_skill } from '@/Services/profile/skill';
import { get_resumes_by_user, delete_resume } from '@/Services/profile/resume';
import { useRouter } from 'next/router';
import { FaMapMarkerAlt, FaLinkedin, FaGithub, FaBriefcase, FaCalendar, FaBook, FaCode, FaStar, FaPhoneAlt, FaUniversity, FaPlus, FaPencilAlt, FaTrash } from 'react-icons/fa';
import Rating from 'react-rating';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '@/Utils/UserSlice';

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username } = router.query; 
  const [profile, setProfile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const user = useSelector(state => state.User.userData);
  const [isUserRoleApplicant, setIsUserRoleApplicant] = useState(false);

  useEffect(() => {

    const fetchData = async () => {

      await dispatch(setUserData(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null));
      if (!router.isReady || !username) return; 
      
      // Split username into username and userId
      const [usernamePart, userId] = username.split('-');
      const numericUserId = Number(userId);
      if (user.userID === numericUserId) { 
        setIsLoggedInUser(true);
      }

      if (user.role === 'Applicant') {
        setIsUserRoleApplicant(true);
      }

      try {

        const isUserHasProfile = await hasUserProfile();
        if (!isUserHasProfile.hasProfile) {
          console.error('User does not have a profile');
          setLoading(false);
          router.push('/frontend/createProfile');
          return;
        }
        const profileData = await get_profile_by_user(userId);
        setProfile(profileData);

        const experiencesData = await get_experiences_by_user(userId);
        setExperiences(experiencesData);

        const educationsData = await get_educations_by_user(userId);
        setEducations(educationsData);

        const skillsData = await get_skills_by_user(userId);
        setSkills(skillsData);

        const resumesData = await get_resumes_by_user(userId);
        setResumes(resumesData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [router.isReady, username]);


  const handleDeleteExperience = async (experienceId) => {
    try {
      await delete_experience(experienceId);
      setExperiences(experiences.filter(experience => experience.experienceID !== experienceId));
      toast.success('Experience deleted successfully');
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast.error('Failed to delete experience. Please try again later.');
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await delete_skill(skillId);
      setSkills(skills.filter(skill => skill.skillID !== skillId));
      toast.success('Skill deleted successfully');
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast.error('Failed to delete skill. Please try again later.');
    }
  };

  const handleEducationDelete = async (educationId) => {
    try {
      await delete_education(educationId);
      setEducations(educations.filter(edu => edu.educationID !== educationId));
      toast.success('Education deleted successfully');
    } catch (error) {
      console.error('Error deleting education:', error);
      toast.error('Failed to delete education. Please try again later.');
    }
  };

  const handleDeleteResume = async (resumeId) => {
    try {
      await delete_resume(resumeId);
      setResumes(resumes.filter(resume => resume.resumeID !== resumeId));
      toast.success('Resume deleted successfully');
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Failed to delete resume. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-200 w-full h-screen flex items-center flex-col justify-center">
        <InfinitySpin width="200" color="#4f46e5" />
        <p className="text-xs uppercase">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">
      <NavBar />
      <div className="w-full h-screen pt-20 md:pt-20 flex items-center justify-center flex-col">
        {profile && (
          <div className="md:w-1/2">
            {isLoggedInUser && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => router.push('/frontend/editProfile')}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                   <FaPencilAlt />
                </button>
                {/* <button
                  onClick={() => router.push('/frontend/createExperience')}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Add Experience
                </button>
                <button
                  onClick={() => router.push('/frontend/createEducation')}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Add Education
                </button>
                <button
                  onClick={() => router.push('/frontend/createSkill')}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Skill
                </button> */}
              </div>
            )}
            <div className="bg-white rounded shadow-lg p-8 mb-4">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{profile.name}</h1>
              </div>
              {profile.profilePictureBase64 && (
                <img
                  src={`data:image/png;base64,${profile.profilePictureBase64}`}
                  alt="Profile Picture"
                  className="w-24 h-24 rounded-full shadow-lg border-4 border-white mb-6"
                />
              )}
              <p className="text-lg text-gray-600 mb-4">{profile.headline}</p>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Summary</h2>
                <p className="text-base text-gray-700">{profile.summary}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
                <div className="flex items-center justify-center">
                  <FaMapMarkerAlt className="text-gray-500 mr-2" />
                  <span className="text-gray-700">{profile.location}</span>
                </div>
                <div className="flex items-center justify-center">
                  <FaPhoneAlt className="text-gray-500 mr-2" />
                  <span className="text-gray-700">{profile.phoneNumber}</span>
                </div>
                <div className="flex items-center justify-center">
                  <FaLinkedin className="text-blue-500 mr-2" />
                  <a href={profile.linkedinUrl} className="text-blue-500 hover:underline">
                    {profile.linkedinUrl}
                  </a>
                </div>
                <div className="flex items-center justify-center">
                  <FaGithub className="text-gray-800 mr-2" />
                  <a href={profile.gitHubUrl} className="text-blue-500 hover:underline">
                    {profile.gitHubUrl}
                  </a>
                </div>
              </div>
              <div className="flex justify-center mb-6">
                <p className="text-base text-gray-700">
                  Years of Experience: {profile.yearsOfExperience}
                </p>
              </div>
            </div>

            {/* Resume section */}
            {isUserRoleApplicant && (
            <div className="bg-white rounded shadow-lg p-8 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Resume</h2>
                { resumes.length === 0 && isLoggedInUser && (
                  <button
                    onClick={() => router.push('/frontend/createResume')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <FaPlus />
                  </button>
                )}
              </div>
              {resumes.length > 0 ? (
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{resumes[0].title || resumes[0].originalFileName}</h3>
                    <a
                      href={resumes[0].url} 
                      download={resumes[0].originalFileName} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Download Resume
                    </a>
                  </div>
                  {isLoggedInUser && (
                  <div>
                    <button
                      onClick={() => router.push(`/frontend/editResume/${resumes[0].resumeID}`)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <FaPencilAlt />
                    </button>
                  </div>                   
                )}
                </div>
              ) : (
                <p className="text-gray-500">No resume available.</p>
              )}
            </div>
            )}

            {/* Experiences section */}
            {isUserRoleApplicant && (
            <div className="bg-white rounded shadow-lg p-8 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Experiences</h2>
                {isLoggedInUser && (
                  <button
                    onClick={() => router.push('/frontend/createExperience')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <FaPlus />
                  </button>
                )}
              </div>
              {experiences.map(experience => (
                <div key={experience.experienceID} className="mb-6 flex justify-between items-center">
                  <div className="flex">
                    <div className="mr-4">
                      <FaBriefcase className="text-gray-500 mt-3" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{experience.jobTitle}</h3>
                      <p className="text-base text-gray-700 font-bold">{experience.company}</p>
                      <p className="text-base text-gray-700 flex">
                        {new Date(experience.startDate).toLocaleString('default', { month: 'long' })} {new Date(experience.startDate).getFullYear()} -
                        {new Date(experience.endDate).toLocaleString('default', { month: 'long' })} {new Date(experience.endDate).getFullYear()}
                      </p>
                      <p className="text-base text-gray-700">{experience.description}</p>
                    </div>
                  </div>
                  {isLoggedInUser && (
                    <div>
                      <button
                        onClick={() => router.push(`/frontend/editExperience/${experience.experienceID}`)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        <FaPencilAlt /> 
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(experience.experienceID)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            )}

            {/* Skills section */}
            {isUserRoleApplicant && (
            <div className="bg-white rounded shadow-lg p-8 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Skills</h2>
                {isLoggedInUser && (
                  <button
                    onClick={() => router.push('/frontend/createSkill')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <FaPlus />
                  </button>
                )}
              </div>
              {skills.map(skill => (
                <div key={skill.skillID} className="mb-6 flex justify-between items-center">
                  <div className="flex">
                    <div className="mr-4">
                      <FaCode className="text-gray-500 mt-2"/>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{skill.skillName}</h3>
                      <p className="text-base text-gray-700">{skill.description}</p>
                      <Rating
                        initialRating={skill.skillLevel}
                        fractions={2}
                        readonly
                        emptySymbol={<FaStar className="text-gray-300" />}
                        fullSymbol={<FaStar className="text-yellow-500" />}
                      />
                    </div>
                  </div>
                  {isLoggedInUser && (
                    <div>
                      <button
                        onClick={() => router.push(`/frontend/editSkill/${skill.skillID}`)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        <FaPencilAlt /> 
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.skillID)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        <FaTrash /> 
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            )}

            {/* Education section */}
            {isUserRoleApplicant && (
            <div className="bg-white rounded shadow-lg p-8 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Education</h2>
                {isLoggedInUser && (
                  <button
                    onClick={() => router.push('/frontend/createEducation')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <FaPlus />
                  </button>
                )}
              </div>
              {educations.map(education => (
                <div key={education.educationID} className="mb-6 flex justify-between items-center">
                  <div className="flex">
                    <div className="mr-4">
                      <FaBook className="text-gray-500 mt-2" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{education.degree}</h3>
                      <p className="text-base text-gray-700 font-bold flex">
                        <FaUniversity className="text-gray-500 mr-2" />
                        {education.institution}
                      </p>
                      <p className="text-base text-gray-700 flex">
                        <FaCalendar className="text-gray-500 mr-2" />
                        {education.startYear} - {education.endYear}
                      </p>
                      <p className="text-base text-gray-700 flex">
                        <FaPencilAlt className="text-gray-500 mr-2" />
                        {education.fieldOfStudy}
                      </p>
                    </div>
                  </div>
                  {isLoggedInUser && (
                    <div>
                      <button
                        onClick={() => router.push(`/frontend/editEducation/${education.educationID}`)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        <FaPencilAlt /> 
                      </button>
                      <button
                        onClick={() => handleEducationDelete(education.educationID)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        <FaTrash /> 
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div> )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
