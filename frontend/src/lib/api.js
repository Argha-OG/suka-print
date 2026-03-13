import axios from 'axios';

export const getRawBaseURL = () => {
    const rawUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    return rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;
};

export const getBaseURL = () => {
    return `${getRawBaseURL()}/api`;
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

export default api;
