import axios from "axios";
// import { getCookie } from '../components/common/Common';


const baseUrl = import.meta.env.VITE_APP_BACKEND_URL;
const instance = axios.create({
    baseURL: baseUrl,
    // withCredentials: true,
});



// const handleRefreshToken = async () => {
//     const res = await instance.post('/api/auth/refresh-token', { refreshToken: getCookie('refreshToken') });
//     if (res && res.data) return res.data.accessToken;
//     return null;
// };

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// const NO_RETRY_HEADER = 'x-no-retry';

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response?.data?.data ? response.data.data : response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // if (error.config && error.response && +error.response.status === 401 && !error.config.headers[NO_RETRY_HEADER]) {
    //     const access_token = await handleRefreshToken();
    //     error.config.headers[NO_RETRY_HEADER] = 'true';
    //     if (access_token) {
    //         error.config.headers['Authorization'] = `Bearer ${access_token}`;
    //         localStorage.setItem('access_token', access_token);
    //         return instance.request(error.config);
    //     }
    // }

    if (error.config && error.response && +error.response.status === 400 && error.config.url === '/api/auth/refresh-token') {
        window.location.href = '/login';
    }

    if (error.response.status === 403) return null;

    return error?.response?.data ?? Promise.reject(error);
});

export default instance;