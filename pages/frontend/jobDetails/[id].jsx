import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar';
import { get_specified_job } from '@/Services/job';
import { useSelector } from 'react-redux';
import { get_educations_by_user } from '@/Services/profile/education';
import { get_experiences_by_user } from '@/Services/profile/experience';
import { get_skills_by_user } from '@/Services/profile/skill';
import { get_resumes_by_user } from '@/Services/profile/resume';
import { createJobApplication, getJobApplicationsByUserId } from '@/Services/job/apply';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function JobDetails() {
    const router = useRouter();
    const { id } = router.query; 
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alreadyApplied, setAlreadyApplied] = useState(false); 
    const user = useSelector(state => state.User.userData); 

    useEffect(() => {
        if (id) {
            const fetchJobDetails = async () => {
                try {
                    const jobData = await get_specified_job(id); 
                    setJob(jobData);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchJobDetails();
        }
    }, [id]);

    useEffect(() => {
        if (user && id) {
            const checkIfAlreadyApplied = async () => {
                try {
                    const applications = await getJobApplicationsByUserId(user.userID);
                    const hasApplied = applications.some(app => app.jobPostingId === parseInt(id));
                    setAlreadyApplied(hasApplied);
                } catch (err) {
                    console.error('Error fetching job applications:', err);
                }
            };
            checkIfAlreadyApplied();
        }
    }, [user, id]);

    const handleApplyWithProfile = async () => {
        console.debug('handleApplyWithProfile called');
        try {
            const [resume, experience, skills, education] = await Promise.all([
                get_resumes_by_user(user.userID),
                get_experiences_by_user(user.userID),
                get_skills_by_user(user.userID),
                get_educations_by_user(user.userID),
            ]);
            console.debug('Resume:', resume);
            console.debug('Experience:', experience);
            console.debug('Skills:', skills);
            console.debug('Education:', education);
            let missingSections = [];
            if (resume.length === 0) missingSections.push('resume');
            if (experience.length === 0) missingSections.push('experience');
            if (skills.length === 0) missingSections.push('skills');
            if (education.length === 0) missingSections.push('education');
            if (missingSections.length > 0) {
                toast.error(`Please complete your profile before applying. Missing sections: ${missingSections.join(', ')}.`);
                return;
            }
            const formData = {
                "jobPostingId": router.query.id,
            };
            console.debug('FormData:', formData);
            const response = await createJobApplication(formData);
            console.debug('Response:', response);
            if (response.ok) {
                toast.success('Job applied successfully!');
                setTimeout(() => {
                    router.push('/frontend/myjobs');
                }, 500);
            } else {
                toast.error('An error occurred while applying. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred while applying. Please try again.');
        }
    };

    if (loading) return <p>Loading job details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const isEmployer = user?.role === 'Employer'; 
    const isApplicant = user?.role === 'Applicant'; 
    const isPostedByUser = job && job.postedBy === user?.userID;

    return (
        <>
            <NavBar />
            <ToastContainer />
            <div className='w-full py-20 flex flex-col items-center md:px-8 px-2 mt-10'>
                {job && (
                    <div className='w-full max-w-4xl bg-white shadow-lg rounded-lg p-8'>
                        <div className='flex items-center mb-6'>
                            <img 
                                src={job.companyLogo} 
                                alt={`${job.company} Logo`} 
                                className='w-16 h-16 rounded-full border-4 border-gray-300'
                            />
                            <div className='ml-6'>
                                <h1 className='text-3xl font-bold text-gray-800'>{job.title}</h1>
                                <p className='text-lg text-gray-600'>{job.company}</p>
                                <p className='text-md text-gray-500'>{job.location}</p>
                            </div>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-2xl font-semibold text-gray-800'>Job Description</h2>
                            <p className='text-md text-gray-700'>{job.description}</p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-2xl font-semibold text-gray-800'>Requirements</h2>
                            <ul className='list-disc list-inside text-md text-gray-700'>
                                {job.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='flex justify-between mt-6'>
                            <div>
                                <p className='text-lg text-gray-900 mb-4'><strong>Salary:</strong> {job.salaryRange}</p>
                                <p className='text-lg text-gray-900 mb-4'><strong>Job Type:</strong> {job.jobType}</p>
                                <p className='text-lg text-gray-900 mb-4'><strong>Seniority Level:</strong> {job.seniorityLevel}</p>
                                <p className='text-lg text-gray-900 mb-4'><strong>Posted On:</strong> {new Date(job.postedDate).toLocaleDateString('en-GB')}</p>
                                <p className='text-lg text-gray-900 mb-4'><strong>Application Deadline:</strong> {new Date(job.expirationDate).toLocaleDateString('en-GB')}</p>
                            </div>
                            <div className='flex items-center mt-6'>
                                {isApplicant && (
                                    new Date() > new Date(job.expirationDate) || job.status === 'filled' || job.status === 'closed' ? (
                                        <p className='text-lg text-red-500 font-semibold'>No longer accepting applications</p>
                                    ) : (
                                        alreadyApplied ? (
                                            <p className='text-lg text-green-500 font-semibold'>You already applied to this job</p>
                                        ) : (
                                            <button 
                                                className='py-3 px-8 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-900 transition duration-300'
                                                onClick={handleApplyWithProfile}
                                            >
                                                Apply with My Profile
                                            </button>
                                        )
                                    )
                                )}
                                {isEmployer && isPostedByUser && (
                                    <>
                                        <button
                                            className='py-3 px-8 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition duration-300 mr-2'
                                            onClick={() => router.push(`/frontend/myJobs/${job.jobID}`)}
                                        >
                                            See Applications
                                        </button>
                                        <button 
                                            className='py-3 px-8 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition duration-300'
                                            onClick={() => router.push(`/frontend/editJobDetails/${job.jobID}`)}
                                        >
                                            Update Job Posting
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}