import axios from 'axios';
import { BaseUrl } from '../../src/utills/Constants';
axios.defaults.baseURL = BaseUrl;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.response.use((response) => {
    return response?.data
}, (error) => {
    return error?.response?.data ? error?.response?.data : { error: 'Something went wrong',error }
});

export const ApiManager = {
    get: async (endpoint, params = {}) => {
        return axios.get(endpoint, { params });
    },
    post: async (endpoint, body, params = {}) => {
        return axios.post(endpoint, body, { params });
    },
    put: async (endpoint, body, params = {}) => {
        return axios.put(endpoint, body, { params });
    },
    patch: async (endpoint, body, params = {}) => {
        return axios.patch(endpoint, body, { params });
    },
    delete: async (endpoint, params = {}) => {
        return axios.delete(endpoint, { params });
    },
};