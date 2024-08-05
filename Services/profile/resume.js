import Cookies from "js-cookie";

// Get resumes for a specific user API
export const get_resumes_by_user = async (userId) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/resumes/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error fetching resumes by user:', errorData);
      throw new Error(`Failed to fetch resumes: ${errorData.message}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting resumes by user (service):', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

// Get all resumes API
export const get_resumes = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/resumes`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting resumes (service):', error);
  }
};

// Create resume API
export const create_resume = async (formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/resumes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      body: formData,
    });
    const data = await res;
    return data;
  } catch (error) {
    console.log('Error in creating resume (service):', error);
  }
};

// Get resume by ID API
export const get_resume_by_id = async (resumeId) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/resumes/${resumeId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting resume by id (service):', error);
  }
};

// Update resume API
export const update_resume = async (resumeId, formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/resumes/${resumeId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error updating resume:', errorData);
      throw new Error(`Failed to update resume: ${errorData.message}`);
    }

    const updatedResume = await res;
    return updatedResume;
  } catch (error) {
    console.error('Error updating resume:', error);
    throw error;
  }
};

// Delete resume API
export const delete_resume = async (resumeId) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/resumes/${resumeId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in deleting resume (service):', error);
  }
};
