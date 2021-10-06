// First we need to import axios.js
import axios from "axios";
import queryString from "query-string";
// Next we make an 'instance' of it
const axiosClient = axios.create({
    // .. where we make our configurations
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

// Also add/ configure interceptors && all the other cool stuff
axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) =>
        // Edit response config
        response,
    (error) => {
        if (error.response) {
            console.log("Error axios", error.response);
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
