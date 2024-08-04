import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import JobsCard from '@/components/JobsCard';
import { get_jobs } from '@/Services/job';
import { useRouter } from 'next/router';

export default function DisplayJobs() {
    const router = useRouter();
    const { search, category } = router.query; // Get search and category from query parameters
    const [jobData, setJobData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(search || '');
    const [filterDate, setFilterDate] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterLocation, setFilterLocation] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobs = await get_jobs();
                setJobData(jobs);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = jobData.filter((job) => {
        const jobDate = new Date(job.postedDate);
        const now = new Date();
        let dateLimit;

        switch (filterDate) {
            case 'lastDay':
                dateLimit = new Date(now.setDate(now.getDate() - 1));
                break;
            case 'lastWeek':
                dateLimit = new Date(now.setDate(now.getDate() - 7));
                break;
            case 'last15Days':
                dateLimit = new Date(now.setDate(now.getDate() - 15));
                break;
            case 'lastMonth':
                dateLimit = new Date(now.setMonth(now.getMonth() - 1));
                break;
            default:
                dateLimit = null;
        }

        return (
            (!filterDate || jobDate >= dateLimit) &&
            (!filterType || job.type === filterType) &&
            (!filterLocation || job.location.toLowerCase().includes(filterLocation.toLowerCase())) &&
            (!searchTerm || job.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!category || job.job_category.toLowerCase() === category.toLowerCase())
        );
    });

    return (
        <>
            <NavBar />
            <div className='w-full py-20 flex flex-col items-center md:px-8 px-2'>
                <div className='w-full flex justify-center items-center mb-2 mt-4'>
                    <input
                        type='text'
                        placeholder='Search jobs by title or company...'
                        className='w-full md:w-1/2 p-2 border border-gray-300 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='flex w-full mt-4'>
                    <div className='w-1/4 p-4'>
                        <h2 className='text-lg font-semibold mb-2'>Filter by Posted Date</h2>
                        <select
                            className='w-full p-2 border border-gray-300 rounded mb-4'
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        >
                            <option value=''>All</option>
                            <option value='lastDay'>Last Day</option>
                            <option value='lastWeek'>Last Week</option>
                            <option value='last15Days'>Last 15 Days</option>
                            <option value='lastMonth'>Last Month</option>
                        </select>
                        <h2 className='text-lg font-semibold mb-2'>Filter by Job Type</h2>
                        <select
                            className='w-full p-2 border border-gray-300 rounded mb-4'
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value=''>All</option>
                            <option value='fullTime'>Full Time</option>
                            <option value='partTime'>Part Time</option>
                            <option value='contract'>Contract</option>
                            <option value='internship'>Internship</option>
                        </select>
                        <h2 className='text-lg font-semibold mb-2'>Filter by Location</h2>
                        <input
                            type='text'
                            className='w-full p-2 border border-gray-300 rounded mb-4'
                            placeholder='Enter location'
                            value={filterLocation}
                            onChange={(e) => setFilterLocation(e.target.value)}
                        />
                    </div>
                    <div className='w-3/4'>
                        <h1 className='px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-indigo-600 text-3xl font-semibold text-gray-800'>Available Jobs</h1>
                        <div className='w-full h-full py-2 flex flex-wrap items-center justify-center'>
                            {loading ? (
                                <p>Loading jobs...</p>
                            ) : error ? (
                                <p className="text-red-500">{error}</p>
                            ) : (
                                Array.isArray(filteredJobs) && filteredJobs.length > 0 ? filteredJobs.map((job) => (
                                    <JobsCard job={job} key={job.jobID} />
                                )) : <p>No jobs found</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}