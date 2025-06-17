import axios from 'axios';
import { API_BASE_URL } from "./base_api";

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/token/`, { email, password });
        if (response.status === 200 && response.data.access && response.data.refresh) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: "Tokens were not received." };
        }
    } catch (error) {
        console.error("Error login in:", error.response ? error.response.data : error.message);
        return { success: false, message: error.response?.data?.message || "Credentials not found." };
    }
};

export const register = async (name, email, password, confirmPassword) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/users/`, { name, email, password, password_confirmation :confirmPassword });
        if (response.status === 201) {
            return { success: true, message: "Registered successfully! Login." };
        } else {
            return { success: false, message: "Unknown error registering the user." };
        }
    } catch (error) {
        console.error("Error registering the user:", error.response ? error.response.data : error.message);
        return { success: false, message: error.response?.data?.message || "Error registering the user." };
    }
};

export const resetPassword = async (email, newPassword, confirmPassword) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/login/password-reset/`, { email, new_password: newPassword, confirm_password: confirmPassword });
        return { success: true, message: "Password redefined successfully." };
    } catch (error) {
        console.error("Error redefining the password:", error);
        return { success: false, message: error.response?.data?.detail || "Error redefining the password, try again." };
    }
};

export const logout = async () => {
    const refreshToken = localStorage.getItem('user_refresh_token');

    console.log("Logout token:", refreshToken);

    if (!refreshToken) {
        console.error("Refresh token was not found. The user is not loged in.");
        return { success: false, message: "Refresh token was not found. The user is not loged in." };
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/login/logout/`, {
            refresh: refreshToken
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
            }
        });

        // Remover tokens do localStorage
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_refresh_token');

        return { success: true, message: "Loged out successfully." };
    } catch (error) {
        console.error("Error loging out:", error.response ? error.response.data : error.message);
        return { success: false, message: error.response?.data?.message || "Error loging out." };
    }
};

export const checkEmailExists = async (user_email) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/login/check-email/`, {
            params: { email: user_email }
        });

        return { success: response.status === 200, exists: response.status === 200 };
    } catch (error) {
        console.error("Error verifying the email:", error);
        return { success: false, message: error.response?.data?.message || "Error verifying the email." };
    }
};

export const updateUserPremiumStatus = async (userId) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/api/v1/users/${userId}/`,
            { is_premium: true }, 
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user_token')}`
                }
            }
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.detail || "An error occurred" };
    }
};

export const fetchUser = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/users/${userId}/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.detail || "An error occurred" };
    }
};
