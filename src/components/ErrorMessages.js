import { useTranslation } from "react-i18next";

// Create a custom hook to get the error messages
export const useErrorMessages = () => {
    const { t } = useTranslation();

    return {
        NETWORK_ERROR: {
            role: 'bot',
            parts: [{
                text: t('error.network')
            }]
        },
        SERVER_ERROR: {
            role: 'bot',
            parts: [{
                text: t('error.server')
            }]
        },
        INVALID_INPUT: {
            role: 'bot',
            parts: [{
                text: t('error.invalid_input')
            }]
        },
        TIMEOUT_ERROR: {
            role: 'bot',
            parts: [{
                text: t('error.timeout')
            }]
        },
        UNKNOWN_ERROR: {
            role: 'bot',
            parts: [{
                text: t('error.unknown')
            }]
        },
        RATE_LIMIT_EXCEEDED: {
            role: 'bot',
            parts: [{
                text: t('error.rate_limit')
            }]
        },
        INVALID_USER: {
            role: 'bot',
            parts: [{
                text: t('error.invalid_user')
            }]
        }
    };
};