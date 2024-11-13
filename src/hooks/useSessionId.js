import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const generateSessionId = () => {
    return uuidv4();
};

const getStoredSessionId = () => {
    try {
        return sessionStorage.getItem('chatSessionId');
    } catch (error) {
        console.warn('Unable to access session storage:', error);
        return null;
    }
};

const setStoredSessionId = (id) => {
    try {
        sessionStorage.setItem('chatSessionId', id);
    } catch (error) {
        console.warn('Unable to store in session storage:', error);
    }
};

export const useSessionId = () => {
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        let id = getStoredSessionId();
        if (!id) {
            id = generateSessionId();
            setStoredSessionId(id);
        }
        setSessionId(id);
    }, []);

    return sessionId;
};
