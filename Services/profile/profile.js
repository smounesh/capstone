import Cookies from "js-cookie";

// Check if a user has a profile
export const hasUserProfile = async (userId) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profiles/userhasaprofile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is ok (status 200-299)
    if (!res.ok) {
      const errorMessage = await res.json();
      throw new Error(errorMessage.message || 'Failed to check user profile existence');
    }

    // Return true if the response is successful (200)
    return res.json(); // Assuming the API returns 200 for success
  } catch (error) {
    console.error('Error in checking user profile (service):', error);
    return false; // Return false if an error occurs
  }
};

// Get profile API for the logged-in user
export const get_profile = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profiles/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting profile (service):', error);
    throw error;
  }
};

// Get profile API for a specific user by userId
export const get_profile_by_user = async (userId) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profiles/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    });

    // Check if the response is ok (status 200-299)
    if (!res.ok) {
      const errorMessage = await res.json();
      throw new Error(errorMessage.message || 'Failed to fetch profile');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting profile by user (service):', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

// Create profile API
export const create_profile = async (formData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profiles`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      body: formData,
    });

    // Check if the response is ok (status 200-299)
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || 'Failed to create profile');
    }
    
    return await response; // Return the JSON data
  } catch (error) {
    console.error('Error in create_profile:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

// Update profile API
export const update_profile = async (formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profiles`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
        // Do not set Content-Type when sending FormData
      },
      body: formData,
    });

    // Check if the response is ok (status 200-299)
    if (!res.ok) {
      const errorMessage = await res.json();
      throw new Error(errorMessage.message || 'Failed to update profile');
    }

    return await res.json(); // Return the JSON data
  } catch (error) {
    console.log('Error in updating profile (service):', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

// Delete profile API
export const delete_profile = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profiles`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is ok (status 200-299)
    if (!res.ok) {
      const errorMessage = await res.json();
      throw new Error(errorMessage.message || 'Failed to delete profile');
    }

    return await res.json(); // Return the JSON data
  } catch (error) {
    console.log('Error in deleting profile (service):', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
