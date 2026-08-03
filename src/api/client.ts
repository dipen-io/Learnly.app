import axios from "axios";
import { config } from '../../constants/config';

export const apiClient = axios.create({
    baseURL: config.apiUrl,
    timeout: config.apiTimeout,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((req) => {
    // const token = getStoredToken();
    const token = "this_is_my_secret_token";
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
})

apiClient.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            // token expired/invalid -> log out user, redirect to login        
        }
        return Promise.reject(err);
    }
)