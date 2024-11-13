import axios from 'axios';
import {generateSessionId} from "../hooks/useSessionId";
import i18n from "../resources/i18n";

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : "https://backend-service-260498167768.us-central1.run.app",
    withCredentials: true,
});

let sessionId = null;

const getOrCreateSessionId = () => {
    if (!sessionId) {
        sessionId = generateSessionId();
        console.log("Session Id Generated: ", sessionId)
    }
    return sessionId;
};

api.interceptors.request.use((config) => {
    config.headers['X-Session-ID'] = getOrCreateSessionId();
    config.headers['Accept-Language'] = i18n.language;
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
