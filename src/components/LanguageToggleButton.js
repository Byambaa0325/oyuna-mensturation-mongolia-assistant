import React from 'react';
import i18n from "../resources/i18n";
import { Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageToggleButton = () => {
    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'mn' : 'en';
        console.log("Switching to ", newLang);
        localStorage.setItem('locale', newLang);
        i18n.changeLanguage(newLang);
        window.location.reload();
    };

    return (
        <Button
            onClick={toggleLanguage}
            startIcon={<LanguageIcon />}
            variant="outlined"
            color="text.primary"
            size="small"
            sx={{
                textTransform: 'none',
                minWidth: '120px',
                borderRadius: 2,
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
            }}
        >
            {i18n.language === 'en' ? 'Монгол' : 'English'}
        </Button>
    );
};

export default LanguageToggleButton;
