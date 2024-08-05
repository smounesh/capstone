import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getAllJobApplications, updateJobApplication } from '@/Services/job/apply';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import NavBar from '@/components/NavBar'; 
import { get_profile_by_user } from '@/Services/profile/profile';

const MyJobs = () => {
    const router = useRouter();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const jobId = router.query.id;

    useEffect(() => {
        const fetchApplications = async () => {
            if (!jobId) {
                console.log('Job ID is not available yet.');
                return; // Exit if jobId is not available
            }

            try {
                console.log('Fetching all job applications...');
                const response = await getAllJobApplications();
                const allApplications = await response.json(); // Parse JSON response

                if (!Array.isArray(allApplications)) {
                    throw new Error('Expected an array of applications');
                }

                console.debug('All applications:', allApplications);

                // Filter applications by jobPostingId
                const filteredApplications = allApplications.filter(application => application.jobPostingId === parseInt(jobId));
                setApplications(filteredApplications);
                console.log('Filtered applications:', filteredApplications);
            } catch (err) {
                console.debug('Error fetching applications:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [jobId]);

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

    const handleAction = async (applicationId, action) => {
        try {

            const applicationData = {
                id: applicationId, 
                status: action
            };
            console.debug('Updating job application:', applicationData);
            const res = await updateJobApplication(applicationId, applicationData);
            console.debug('Response:', res);
            if (res.ok) {
            toast.success(`Application ${action} successfully!`);
            router.push('/');
            }
        } catch (err) {
            toast.error(`Failed to ${action} application: ${err.message}`);
        }
    };

    const handleReachOut = async (userId) => {
        try {
            const profile = await get_profile_by_user(userId);
            console.debug("Profile", profile)
            const email = profile.email;
            console.debug("Email:", email)

            // Open the mailto link with the applicant's email
            window.location.href = `mailto:${email}`;
        } catch (err) {
            toast.error(`Failed to reach out: ${err.message}`);
        }
    };

    if (loading) return <p>Loading applications...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <>
            <NavBar />
            <div className='w-full py-20 flex flex-col items-center md:px-8 px-2'>
                <div className='w-full max-w-4xl mt-8'> {/* Added margin-top here */}
                    {applications.length > 0 ? (
                        applications.map(application => (
                            <div key={application.id} className='bg-white shadow-md rounded-lg p-4 mb-4'>
                                <div className='flex items-center mb-2'>
                                    {application.profilePicture && (
                                        <img 
                                            src={application.profilePicture} 
                                            alt={`${application.username} Profile`} 
                                            className='w-10 h-10 rounded-full border-2 border-gray-300 mr-4'
                                        />
                                    )}
                                    <h2 className='text-xl font-semibold'>{application.username}</h2>
                                </div>

                                <p className='text-gray-600 mb-2'>
                                        Status: <span className={`px-2 py-1 rounded ${application.status === 'Accepted' ? 'bg-green-200 text-green-800' : application.status === 'Rejected' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                            {application.status}
                                        </span>
                                </p>
                                
                                <p className='text-gray-600 mb-2'>Applied on: {new Date(application.applicationDate).toLocaleDateString('en-GB')}</p>
                                <div className='flex justify-between mt-4'>
                                <div className="flex space-x-2">
                                        <Link href={`/frontend/profile/${application.username}-${application.userId}`} className='bg-blue-600 text-white rounded py-2 px-4 hover:bg-blue-500' target="_blank" rel="noopener noreferrer">
                                            View Profile
                                        </Link>
                                        <button
                                            className='py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700'
                                            onClick={() => handleReachOut(application.userId)}
                                        >
                                            Reach Out
                                        </button>
                                    </div>
                                    { ( application.status == 'Submitted' )  && (
                                    <div>
                                        <button 
                                            className='py-2 px-4 bg-green-600 text-white rounded hover:bg-green-500 mr-2'
                                            onClick={() => handleAction(application.id, 'Accepted')} 
                                        >
                                            Accept
                                        </button>
                                        <button 
                                            className='py-2 px-4 bg-red-600 text-white rounded hover:bg-red-500'
                                            onClick={() => handleAction(application.id, 'Rejected')}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                     )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No applications found.</p>
                    )}
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default MyJobs;