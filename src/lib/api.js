import axios from 'axios';

export const getRawBaseURL = () => {
    // With unified architecture, we use same-origin relative paths
    return '';
};

export const getBaseURL = () => {
    return '/api';
};

const api = axios.create({
    baseURL: getBaseURL(),
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 Unauthorized errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token is invalid or expired
            if (typeof window !== 'undefined') {
                localStorage.removeItem('adminToken');
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
