import Cookies from "js-cookie";

// Base URL for the job postings API
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/jobpostings`;

// Post job API
export const post_job = async (formData) => {
    try {
        const res = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message || 'Failed to post job');
        }

        return await res.json(); // Return the JSON data
    } catch (error) {
        console.error('Error in posting job (service):', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

// Get all jobs API
export const get_jobs = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message || 'Failed to fetch jobs');
        }

        return await res.json(); // Return the JSON data
    } catch (error) {
        console.error('Error in getting jobs (service):', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

// Get specified job API
export const get_specified_job = async (id) => {
    try {
        const res = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message || 'Failed to fetch specified job');
        }

        return await res.json(); // Return the JSON data
    } catch (error) {
        console.error('Error in getting specified job (service):', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

// Update job API
export const update_job = async (id, formData) => {
    console.debug('body:', formData);
    try {
        const res = await fetch(`${API_BASE_URL}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message || 'Failed to update job');
        }

        return await res; // Return the updated job data
    } catch (error) {
        console.error('Error in updating job (service):', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

// Delete job API
export const delete_job = async (id) => {
    try {
        const res = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message || 'Failed to delete job');
        }

        return await res.json(); // Return confirmation of deletion
    } catch (error) {
        console.error('Error in deleting job (service):', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}