import React from 'react';
import Image from 'next/image';
import { BsDot } from 'react-icons/bs';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaMoneyBillWave, FaMapMarkerAlt, FaCalendarAlt, FaBriefcase, FaUserGraduate } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function JobsCard({ job }) {
    const router = useRouter();
    
    return (
        <div
            key={job.jobID}
            className='w-full cursor-pointer transition-all duration-500 m-4 border hover:shadow-xl rounded-lg p-6 bg-white'
            onClick={() => router.push(`/frontend/jobDetails/${job.jobID}`)}
        >
            <div className='flex items-center mb-4'>
                <Image 
                    width={70} 
                    height={70} 
                    className="rounded-full" 
                    src={job.companyLogo} 
                    alt={`${job.company} Logo`} 
                />
                <div className='ml-4'>
                    <h1 className='text-xl font-semibold'>{job.title}</h1>
                    <p className='text-gray-600'>{job.company}</p>
                </div>
            </div>
            <div className='flex items-center mb-2'>
                <FaMoneyBillWave className='text-indigo-600' />
                <h2 className='text-lg text-gray-900 ml-2'>Salary:</h2>
                <p className='text-base font-semibold ml-1'>{job.salaryRange}</p>
            </div>
            <div className='flex items-center mb-2'>
                <FaMapMarkerAlt className='text-indigo-600' />
                <h2 className='text-lg text-gray-900 ml-2'>Location:</h2>
                <p className='text-base font-semibold ml-1'>{job.location}</p>
            </div>
            <div className='flex items-center mb-2'>
                <FaCalendarAlt className='text-indigo-600' />
                <h2 className='text-lg text-gray-900 ml-2'>Deadline:</h2>
                <p className='text-base font-semibold ml-1'>{new Date(job.expirationDate).toLocaleDateString('en-GB')}</p>
            </div>
            <div className='flex items-center mb-2'>
                <FaUserGraduate className='text-indigo-600' />
                <h2 className='text-lg text-gray-900 ml-2'>Seniority Level:</h2>
                <p className='text-base font-semibold ml-1'>{job.seniorityLevel}</p>
            </div>
            <div className='flex items-center mb-2'>
                <FaBriefcase className='text-indigo-600' />
                <h2 className='text-lg text-gray-900 ml-2'>Job Type:</h2>
                <p className='text-base font-semibold ml-1'>{job.jobType}</p>
            </div>
            {/* <div className='mt-6 flex justify-center'>
                <button className='py-2 px-6 border border-indigo-600 rounded-full flex items-center transition-all duration-300 hover:bg-indigo-600 hover:text-white text-indigo-600 font-semibold'>
                    View Details <AiOutlineArrowRight className='ml-2 text-xl' />
                </button>
            </div> */}
        </div>
    );
}