import Cookies from "js-cookie";

// Get skills for a specific user API
export const get_skills_by_user = async (userId) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/skills/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error fetching skills by user:', errorData);
      throw new Error(`Failed to fetch skills: ${errorData.message}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting skills by user (service):', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

// Get all skills API
export const get_skills = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/skills`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting skills (service):', error);
  }
}

// Create skill API
export const create_skill = async (formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in creating skill (service):', error);
  }
}

// Update skill API
export const update_skill = async (skillId, formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/skills/${skillId}`, {
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
    console.log('Error in updating skill (service):', error);
  }
}

// Delete skill API
export const delete_skill = async (skillId) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/skills/${skillId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in deleting skill (service):', error);
  }
}
