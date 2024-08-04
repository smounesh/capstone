import Cookies from "js-cookie";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/jobapplication`;

// Get all job applications
export const getAllJobApplications = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/getall`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message || 'Failed to fetch job applications');
        }

        return await res.json(); // Return the JSON data
    } catch (error) {
        console.error('Error in getting job applications (service):', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

// Get job application by ID
export const getJobApplicationById = async (id) => {
    try {
        const res = await fetch(`${API_BASE_URL}/getbyid/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message || 'Failed to fetch job application');
        }

        return await res.json(); // Return the JSON data
    } catch (error) {
        console.error('Error in getting job application by ID (service):', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

// Get job applications by user ID
export const getJobApplicationsByUserId = async (userId) => {
    try {
        const res = await fetch(`${API_BASE_URL}/getbyuserid/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message || 'Failed to fetch job applications by user ID');
        }

        return await res.json(); // Return the JSON data
    } catch (error) {
        console.error('Error in getting job applications by user ID (service):', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

// Create a new job application
export const createJobApplication = async (applicationData) => {
    try {
        const res = await fetch(`${API_BASE_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(applicationData),
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message || 'Failed to create job application');
        }

        return await res; // Return the JSON data
    } catch (error) {
        console.error('Error in creating job application (service):', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

// Update an existing job application
export const updateJobApplication = async (id, applicationData) => {
    try {
        const res = await fetch(`${API_BASE_URL}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(applicationData),
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message || 'Failed to update job application');
        }
    } catch (error) {
        console.error('Error in updating job application (service):', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

// Delete a job application
export const deleteJobApplication = async (id) => {
    try {
        const res = await fetch(`${API_BASE_URL}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message || 'Failed to delete job application');
        }
    } catch (error) {
        console.error('Error in deleting job application (service):', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};