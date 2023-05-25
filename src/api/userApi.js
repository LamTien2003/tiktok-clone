import axiosClient from './axiosClient';

const userApi = {
    getSearchUser(params) {
        const url = 'users/search';
        return axiosClient.get(url, { params: params });
    },
    getSuggestUser(params) {
        const url = 'users/suggested';
        return axiosClient.get(url, { params: params });
    },
    getCurrentUser(username) {
        const url = `users/@${username}`;
        return axiosClient.get(url);
    },
};

export default userApi;
