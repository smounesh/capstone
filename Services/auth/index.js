export const register_me = async (formData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            return { success: true, message: 'Registration successful.' };
        }

        const data = await res.json();
        return { success: false, message: data.message || 'Registration failed. Please try again.' };
    } catch (error) {
        console.log('error in register (service) => ', error);
        return { success: false, message: 'Registration failed. Please try again.' };
    }
};

export const login_me = async (formData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error in login (service) => ', error);
        return { success: false, message: 'Login failed. Please try again.' };
    }
};

export const forget_password = async (formData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/forgetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error in forget Password (service) => ', error);
        return { success: false, message: 'Password reset failed. Please try again.' };
    }
};