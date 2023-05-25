import axiosClient from './axiosClient';

const videoApi = {
    getVideoForYou(params) {
        const url = 'videos';
        return axiosClient.get(url, { params });
    },
};

export default videoApi;
