import React, { useState, useEffect, useCallback } from 'react';
import ChatWindow from '../components/ChatWindow';
import ChatInput from "../components/ChatInput";
import api from "../components/api";
import { useErrorMessages} from "../components/ErrorMessages";
import { MAX_INPUT_LENGTH } from "../constants";
import {useTranslation} from "react-i18next";
import {AgeGroupOptions, getStarterMessage, prependUserContext, RoleOptions} from "../model/UserEnums";

const ChatPage = () => {
    const [input, setInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [messages, setMessages] = useState([]);
    const errorMessages = useErrorMessages();
    const { t } = useTranslation();
    const [isPrimaryUser, setIsPrimaryUser] = useState(false);

    const updateStarterMessage = useCallback(() => {
        const ageGroup = AgeGroupOptions.getFromStorage();
        const isPrimary = AgeGroupOptions.isPrimary(ageGroup);
        const role = RoleOptions.getFromStorage();

        console.log("Getting disclaimer role", role);
        console.log("Getting disclaimer ageGroup", ageGroup);

        setIsPrimaryUser(isPrimary);
        const initialMessages = isPrimary
            ? [errorMessages.INVALID_USER]
            : getStarterMessage(t, role, ageGroup);

        setMessages(initialMessages);
    }, [t]);



    useEffect(() => {
        // Initial setup
        updateStarterMessage();

        // Listen for storage changes
        const handleStorageChange = (event) => {
            if (event.key === RoleOptions.KEY || event.key === AgeGroupOptions.KEY) {
                updateStarterMessage();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Custom event listener for direct updates within the same window
        window.addEventListener('userPreferencesUpdated', updateStarterMessage);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('userPreferencesUpdated', updateStarterMessage);
        };
    }, [updateStarterMessage]);

    const sendMessage = useCallback(async (message) => {
        if (message.trim().length > MAX_INPUT_LENGTH) return;
        const userMessage = { text: message, role: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setIsSubmitting(true);
        setInput('');

        try {
            const response = await api.post('/api/chat', { message: prependUserContext(message) });
            const botMessage = {
                role: 'bot',
                parts: response.data.reply,
            };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            let errorMessage;
            if (error.message === 'Network Error') {
                errorMessage = errorMessages.NETWORK_ERROR;
            } else if (error.response && error.response.status === 500) {
                errorMessage = errorMessages.SERVER_ERROR;
            } else {
                errorMessage = errorMessages.UNKNOWN_ERROR;
            }
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const handlePrimaryMessage = useCallback(async (message) => {
        const userMessage = { text: message, role: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setIsSubmitting(true);
        setInput('');
        setMessages(prevMessages => [...prevMessages, errorMessages.INVALID_USER]);
        setIsSubmitting(false);
    },[])

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        if (isPrimaryUser) {
            await handlePrimaryMessage(input);
        } else {
            await sendMessage(input);
        }
    }, [input, sendMessage]);

    const handleCommonQuestionClick = useCallback((question) => {
        if (isSubmitting) return;
        setInput(question);
    }, [isSubmitting]);

    return (
        <>
            <ChatWindow messages={messages} onQuestionClick={handleCommonQuestionClick} isSubmitting={isSubmitting} />
            <ChatInput
                handleSubmit={handleSubmit}
                input={input}
                setInput={setInput}
                isSubmitting={isSubmitting}
            />

        </>
    );
};

export default ChatPage;
