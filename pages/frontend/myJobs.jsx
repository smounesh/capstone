import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import { getJobApplicationsByUserId, updateJobApplication } from '@/Services/job/apply';
import { get_specified_job, get_jobs } from '@/Services/job'; // Ensure correct imports
import { useSelector } from 'react-redux';
import { Router, useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';

const MyJobs = () => {
    const router = useRouter();
    const user = useSelector(state => state.User.userData);
    const [applications, setApplications] = useState([]);
    const [postedJobs, setPostedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!user || !user.userID) {
                setError("User not logged in or user data is not available.");
                setLoading(false);
                return; // Exit if user data is not available
            }

            try {
                if (user.role === 'Applicant') {
                    // Fetch jobs applied by the user
                    const userApplications = await getJobApplicationsByUserId(user.userID);
                    const applicationsWithDetails = await Promise.all(userApplications.map(async (application) => {
                        const jobDetails = await get_specified_job(application.jobPostingId);
                        return {
                            ...application,
                            jobTitle: jobDetails.title,
                            company: jobDetails.company,
                            companyLogo: jobDetails.companyLogo,
                            salaryRange: jobDetails.salaryRange,
                            jobType: jobDetails.jobType,
                        };
                    }));
                    setApplications(applicationsWithDetails);
                } else if (user.role === 'Employer') {
                    // Fetch jobs posted by the user
                    const postedJobs = await get_jobs();
                    setPostedJobs(postedJobs.filter(job => job.postedBy === user.userID));
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleJobAction = async (jobId) => {
        try {
            const applicationData = {
                id: jobId, 
                status: 'Withdrawn'
            };
            console.debug('Updating job application:', applicationData);
            const res = await updateJobApplication(jobId, applicationData);
            console.debug('Response:', res);
            if (res.ok) {
                setTimeout(() => {
                    toast.success(`Application withdrawed successfully!`);
                    router.push('/');
                }, 250);
            }
        } catch (err) {
            toast.error(`Failed to job: ${err.message}`);
        }
    };

    if (loading) return <p>Loading applications...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <>
            <NavBar />
            <div className='w-full py-20 flex flex-col items-center md:px-8 px-2'>
                <h1 className='text-2xl font-bold mb-6'>
                    {user.role === 'Applicant' ? 'My Applications' : 'My Posted Jobs'}
                </h1>
                <div className='w-full max-w-4xl'>
                    {user.role === 'Applicant' && (
                        applications.length > 0 ? (
                            applications.map(application => (
                                <div key={application.id} className='bg-white shadow-md rounded-lg p-4 mb-4'>
                                    <div className='flex items-center mb-2'>
                                        {application.companyLogo && (
                                            <img 
                                                src={application.companyLogo} 
                                                alt={`${application.company} Logo`} 
                                                className='w-10 h-10 rounded-full border-2 border-gray-300 mr-4'
                                            />
                                        )}
                                        <h2 className='text-xl font-semibold'>{application.jobTitle}</h2>
                                    </div>
                                    <p className='text-gray-600 mb-2'>Company: {application.company}</p>
                                    {application.status !== 'Withdrawn' && (
                                        <p className='text-gray-600 mb-2'>Applied on: {new Date(application.applicationDate).toLocaleDateString('en-GB')}</p>
                                    )}
                                    <p className='text-gray-600 mb-2'>
                                        Status: <span className={`px-2 py-1 rounded ${application.status === 'Accepted' ? 'bg-green-200 text-green-800' : application.status === 'Rejected' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                            {application.status}
                                        </span>
                                    </p>
                                    {application.status === 'Accepted' && (
                                        <p className='text-gray-600 mt-2 bg-blue-100 border border-blue-300 text-blue-800 px-4 py-2 rounded'>
                                            Employer will be reaching out to you via email.
                                        </p>
                                    )}
                                    {console.log('Application Status:', application.status)}
                                    {application.status == 'Submitted' && (
                                        <div className='flex justify-between mt-4'>
                                            <button
                                                className='py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700'
                                                onClick={() => handleJobAction(application.jobPostingId)}
                                            >
                                                Withdraw Application
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No applications found.</p>
                        )
                    )}
                    {user.role === 'Employer' && (
                        postedJobs.length > 0 ? (
                            postedJobs.map(job => (
                                <div key={job.jobID} className='bg-white shadow-md rounded-lg p-4 mb-4'>
                                    <div className='flex items-center mb-2'>
                                        {job.companyLogo && (
                                            <img 
                                                src={job.companyLogo} 
                                                alt={`${job.company} Logo`} 
                                                className='w-10 h-10 rounded-full border-2 border-gray-300 mr-4'
                                            />
                                        )}
                                        <h2 className='text-xl font-semibold'>{job.title}</h2>
                                    </div>
                                    <p className='text-gray-600 mb-2'>Salary: {job.salaryRange}</p>
                                    <p className='text-gray-600 mb-2'>Job Type: {job.jobType}</p>
                                    {/* <p className='text-gray-600 mb-2'>Applications: {job.applicationCount}</p> */}
                                    <div className='flex justify-between mt-4'>
                                        <button 
                                            className='py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500 mr-2'
                                            onClick={() => router.push(`/frontend/viewApplications/${job.jobID}`)}
                                        >
                                            View Applications
                                        </button>
                                        <button 
                                            className='py-2 px-4 bg-green-600 text-white rounded hover:bg-green-500'
                                            onClick={() => router.push(`/frontend/editJobDetails/${job.jobID}`)}
                                        >
                                            Update Job Posting
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No posted jobs found.</p>
                        )
                    )}
                    {(!applications.length && !postedJobs.length) && (
                        <p>No jobs found.</p>
                    )}
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default MyJobs;