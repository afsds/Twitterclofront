import axios from 'axios';
import { API_BASE_URL } from './base_api';

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/users/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_token')}`
            }
        });
        if (response.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: "Failed to fetch users." };
        }
    } catch (error) {
        console.error("Error fetching users:", error.response ? error.response.data : error.message);
        return { success: false, message: error.response?.data || "An error occurred." };
    }
};

export const toggleFollowUser = async (userId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/follows/`, { user_id: userId, }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_token')}`
            }
        });

        if (response.status === 201) {
            return { success: true, is_following: true }; 
        } else if (response.status === 204) {
            return { success: true, is_following: false }; 
        } else {
            return { success: false, message: "Failed to toggle follow status." };
        }
    } catch (error) {
        console.error("Error toggling follow status:", error.response ? error.response.data : error.message);
        return { success: false, message: error.response?.data || "An error occurred." };
    }
};