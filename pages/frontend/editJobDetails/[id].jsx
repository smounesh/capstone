import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get_specified_job, update_job } from '@/Services/job';
import { useRouter } from 'next/router';

const EditJobDetails = () => {
    const router = useRouter();
    const { id } = router.query; 
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        requirements: [],
        company: "",
        companyLogo: "",
        jobType: "FullTime",
        salaryRange: "",
        location: "",
        industry: "",
        jobFunction: "",
        seniorityLevel: "",
        expirationDate: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});

    useEffect(() => {
        if (id) {
            const fetchJobDetails = async () => {
                try {
                    const jobData = await get_specified_job(id); // Fetch job details
                    setFormData({
                        jobID: jobData.jobID,
                        title: jobData.title,
                        description: jobData.description,
                        requirements: jobData.requirements,
                        company: jobData.company,
                        companyLogo: jobData.companyLogo,
                        jobType: jobData.jobType,
                        salaryRange: jobData.salaryRange,
                        location: jobData.location,
                        industry: jobData.industry,
                        jobFunction: jobData.jobFunction,
                        seniorityLevel: jobData.seniorityLevel,
                        expirationDate: jobData.expirationDate.slice(0, 10),
                        jobStatus: jobData.jobStatus 
                    });
                } catch (err) {
                    setError({ general: err.message });
                } finally {
                    setLoading(false);
                }
            };
            fetchJobDetails();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newError = {};

        // Validate required fields
        if (!formData.title) newError.title = "Title is required.";
        if (!formData.description) newError.description = "Description is required.";
        if (!formData.company) newError.company = "Company is required.";
        if (!formData.companyLogo) newError.companyLogo = "Company logo URL is required.";
        if (!formData.jobType) newError.jobType = "Job type is required.";
        if (!formData.salaryRange) newError.salaryRange = "Salary range is required.";
        if (!formData.location) newError.location = "Location is required.";
        if (!formData.industry) newError.industry = "Industry is required.";
        if (!formData.jobFunction) newError.jobFunction = "Job function is required.";
        if (!formData.seniorityLevel) newError.seniorityLevel = "Seniority level is required.";
        if (!formData.expirationDate) newError.expirationDate = "Expiration date is required.";
        if (!formData.requirements.length) newError.requirements = "At least one requirement is required.";
        if (!formData.jobStatus) newError.jobStatus = "Job status is required."; 
        if (!formData.jobStatus) newError.jobStatus = "Job status is required."; 

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return;
        }

        try {
            console.log('Form data:', formData);
            const res = await update_job(id, formData);
            console.debug('Response:', res), console.debug('res.okay', res.ok);
            if (res.ok){
                toast.success('Job updated successfully');
            setTimeout(() => {
                router.push('/frontend/displayJobs');
            }, 1000);
        } else {
            toast.error('Failed to update job. Please try again later.');
        }
        } catch (error) {
            toast.error('Failed to update job. Please try again later.');
        }
    };

    const jobTypeOptions = [
        { value: 'FullTime', label: 'Full Time' },
        { value: 'PartTime', label: 'Part Time' },
        { value: 'Internship', label: 'Internship' },
        { value: 'Contract', label: 'Contract' },
    ];

    const jobStatusOptions = [
        { value: 'Open', label: 'Open' },
        { value: 'Closed', label: 'Closed' },
        { value: 'Filled', label: 'Filled' },
    ];

    const seniorityLevelOptions = [
        { value: 'Entry', label: 'Entry' },
        { value: 'Junior', label: 'Junior' },
        { value: 'Intermediate', label: 'Intermediate' },
        { value: 'Senior', label: 'Senior' },
        { value: 'Executive', label: 'Executive' },
    ];

    if (loading) return <p>Loading job details...</p>;

    return (
        <>
            <NavBar />
            <div className='w-full py-20 flex items-center justify-center flex-col'>
                <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>Edit Job Details</h1>
                <form onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4 h-full">
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="title" className='mb-1 text-base font-semibold'>Title:</label>
                        <input 
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                            type="text" 
                            id='title' 
                            className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' 
                            placeholder='Enter title of job' 
                            value={formData.title}
                        />
                        {error.title && <p className="text-sm text-red-500">{error.title}</p>}
                    </div>
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="description" className='mb-1 text-base font-semibold'>Description:</label>
                        <textarea 
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                            id='description' 
                            className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' 
                            placeholder='Enter job description'
                            value={formData.description}
                        />
                        {error.description && <p className="text-sm text-red-500">{error.description}</p>}
                    </div>
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="company" className='mb-1 text-base font-semibold'>Company:</label>
                        <input 
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })} 
                            type="text" 
                            id='company' 
                            className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' 
                            placeholder='Enter company name' 
                            value={formData.company}
                        />
                        {error.company && <p className="text-sm text-red-500">{error.company}</p>}
                    </div>
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="companyLogo" className='mb-1 text-base font-semibold'>Company Logo URL:</label>
                        <input 
                            onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })} 
                            type="text" 
                            id='companyLogo' 
                            className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' 
                            placeholder='Enter company logo URL' 
                            value={formData.companyLogo}
                        />
                        {error.companyLogo && <p className="text-sm text-red-500">{error.companyLogo}</p>}
                    </div>
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="salaryRange" className='mb-1 text-base font-semibold'>Salary Range:</label>
                        <input 
                            onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })} 
                            type="text" 
                            id='salaryRange' 
                            className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' 
                            placeholder='Enter salary range' 
                            value={formData.salaryRange}
                        />
                        {error.salaryRange && <p className="text-sm text-red-500">{error.salaryRange}</p>}
                    </div>
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="location" className='mb-1 text-base font-semibold'>Location:</label>
                        <input 
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                            type="text" 
                            id='location' 
                            className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' 
                            placeholder='Enter job location' 
                            value={formData.location}
                        />
                        {error.location && <p className="text-sm text-red-500">{error.location}</p>}
                    </div>
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="industry" className='mb-1 text-base font-semibold'>Industry:</label>
                        <input 
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })} 
                            type="text" 
                            id='industry' 
                            className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' 
                            placeholder='Enter industry' 
                            value={formData.industry}
                        />
                        {error.industry && <p className="text-sm text-red-500">{error.industry}</p>}
                    </div>
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="jobFunction" className='mb-1 text-base font-semibold'>Job Function:</label>
                        <input 
                            onChange={(e) => setFormData({ ...formData, jobFunction: e.target.value })} 
                            type="text" 
                            id='jobFunction' 
                            className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' 
                            placeholder='Enter job function' 
                            value={formData.jobFunction}
                        />
                        {error.jobFunction && <p className="text-sm text-red-500">{error.jobFunction}</p>}
                    </div>
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="seniorityLevel" className='mb-1 text-base font-semibold'>Seniority Level:</label>
                        <Select 
                            onChange={(e) => setFormData({ ...formData, seniorityLevel: e.value })} 
                            options={seniorityLevelOptions} 
                            placeholder="Select seniority level" 
                            value={seniorityLevelOptions.find(option => option.value === formData.seniorityLevel)}
                        />
                        {error.seniorityLevel && <p className="text-sm text-red-500">{error.seniorityLevel}</p>}
                    </div>
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="expirationDate" className='mb-1 text-base font-semibold'>Expiration Date:</label>
                        <input 
                            onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })} 
                            type="date" 
                            id='expirationDate' 
                            className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' 
                            value={formData.expirationDate}
                        />
                        {error.expirationDate && <p className="text-sm text-red-500">{error.expirationDate}</p>}
                    </div>
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="requirements" className='mb-1 text-base font-semibold'>Requirements:</label>
                        <textarea 
                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value.split(',') })} 
                            id='requirements' 
                            className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' 
                            placeholder='Enter job requirements, separated by commas'
                            value={formData.requirements.join(', ')}
                        />
                        {error.requirements && <p className="text-sm text-red-500">{error.requirements}</p>}
                    </div>
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="jobStatus" className='mb-1 text-base font-semibold'>Job Status:</label>
                        <Select 
                            onChange={(e) => setFormData({ ...formData, jobStatus: e.value })} 
                            options={jobStatusOptions} 
                            placeholder="Select job status" 
                            value={jobStatusOptions.find(option => option.value === formData.jobStatus)}
                        />
                        {error.jobStatus && <p className="text-sm text-red-500">{error.jobStatus}</p>}
                    </div>
                    <button type="submit" className='w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest'>Update Job</button>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default EditJobDetails;