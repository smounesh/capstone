import Cookies from "js-cookie";

// Get experiences for a specific user API
export const get_experiences_by_user = async (userId) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/experiences/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch experiences');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting experiences (service) => ', error);
  }
}

// Get all experiences API
export const get_experiences = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/experiences`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting experiences (service) => ', error);
  }
}

// Create experience API
export const create_experience = async (formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/experiences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify(formData),
    });
    const data = await res;
    return data;
  } catch (error) {
    console.log('Error in creating experience (service) => ', error);
  }
}

// Update experience API
export const update_experience = async (experienceId, formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/experiences/${experienceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in updating experience (service) => ', error);
  }
}

// Delete experience API
export const delete_experience = async (experienceId) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/experiences/${experienceId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in deleting experience (service) => ', error);
  }
}
