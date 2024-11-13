import React from 'react';
import { Box, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useTranslation} from "react-i18next";

function PrivacyDisclaimer() {
    const { t } = useTranslation();
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                width: '100%',
                py: 2
            }}
        >
            <LockOutlinedIcon
                sx={{
                    color: 'text.primary',
                    fontSize: '1rem',
                }}
            />
            <Typography
                variant="caption"
                color="text.primary"
            >
                {t('disclaimer.inline_text')}
            </Typography>
        </Box>
    );
}

export default PrivacyDisclaimer;
