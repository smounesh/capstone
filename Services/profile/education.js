import Cookies from "js-cookie";

// Get educations for a specific user API
export const get_educations_by_user = async (userId) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/educations/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch educations');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting educations (service) => ', error);
  }
}

// Get all educations API
export const get_educations = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/educations`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting educations (service) => ', error);
  }
}

// Create education API
export const create_education = async (formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/educations`, {
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
    console.log('Error in creating education (service) => ', error);
  }
}

// Update education API
export const update_education = async (educationId, formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/educations/${educationId}`, {
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
    console.log('Error in updating education (service) => ', error);
  }
}

// Delete education API
export const delete_education = async (educationId) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/educations/${educationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in deleting education (service) => ', error);
  }
}
