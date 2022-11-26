import axios from 'axios';

const baseURL = "https://api.airtable.com/v0/appjWdL7YgpxIxCKA";
const accessToken = "keyfXgn8PL6pB3x32";

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(
    (req) => {
        req.headers = { 
            'Authorization': `Bearer ${accessToken}`,
        }
        return req;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default axiosInstance;