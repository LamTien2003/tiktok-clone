import axios from 'axios';
import { getTokens } from '@/utils/storage';

const axiosClient = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        const token = getTokens();
        if (token) {
            config.headers['token'] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default axiosClient;
