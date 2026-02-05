import axios from "axios";

/**
 * Global Axios instance configuration
 * Uses a base URL and standard timeout for all API calls
 */
export const api = axios.create({
    baseURL: "https://pro-tasker-backend-llnd.onrender.com/api",
    timeout: 8000,
    headers: {
        "Content-Type": "application/json",
    },
});

/*  Request Interceptor  */

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("pro_tasker_token");

    /**
     * Automatically attach Authorization header if a token exists.
     * We exclude public auth endpoints to avoid sending stale headers
     * during login or registration.
     */
    if (
        token &&
        config.headers &&
        !config.url?.includes("/users/login") &&
        !config.url?.includes("/users/register")
    ) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

/*  Response Interceptor  */

api.interceptors.response.use(
    (response) => response,
    (error) => {
        /**
         * 401 Unauthorized handling:
         * If the token is expired or invalid, we clear local storage
         * to prevent the app from attempting further authenticated requests.
         */
        if (error.response?.status === 401) {
            localStorage.removeItem("pro_tasker_token");
            localStorage.removeItem("pro_tasker_user");

            // Note: Manual redirect can be handled here if not using a PrivateRoute component
            // window.location.href = "/login";
        }

        return Promise.reject(error);
    },
);
