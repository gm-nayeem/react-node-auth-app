import axios from 'axios';

const baseUrl = 'http://localhost:4200/api';

export const userRequest = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});
