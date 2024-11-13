import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import {useTranslation} from "react-i18next";

const GoogleFeedbackPrompt = () => {
    const { t } = useTranslation();
    const handleSurveyClick = () => {
        const surveyUrl = 'https://forms.gle/fVnucgr4zw86FpnH9';
        window.open(surveyUrl, '_blank');
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Stack direction="column" spacing={2} alignItems="center">
                <Typography variant="body2">
                    {t('feedback.title')}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    ({t('feedback.description')})
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSurveyClick}
                >
                    {t('feedback.button')}
                </Button>
            </Stack>
        </Box>
    );
};

export default GoogleFeedbackPrompt;
