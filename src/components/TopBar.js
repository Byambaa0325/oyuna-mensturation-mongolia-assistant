import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import Tooltip from '@mui/material/Tooltip';
import {Box, Tab, Tabs, useTheme, useMediaQuery} from "@mui/material";
import {Link} from "react-router-dom";
import LanguageToggleButton from "./LanguageToggleButton";
import {useTranslation} from "react-i18next";

const CustomAppBar = ({currentPath}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation();

    return (
        <AppBar position="static" color="white">
            <Toolbar sx={{ minHeight: { xs: '56px' } }}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: { xs: 1, sm: 2 }, // Reduced gap on mobile
                    overflow: 'hidden' // Prevent overflow
                }}>
                    {/* Logo */}
                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            flexShrink: 0,
                            mr: { xs: 1, sm: 2 } // Adjust margin based on screen size
                        }}
                    >
                        <Box
                            component="img"
                            src={`${process.env.PUBLIC_URL}/optimized-images/logoNew.webp`}
                            alt="Logo"
                            sx={{
                                height: { xs: '32px', sm: '40px' }, // Smaller logo on mobile
                                objectFit: 'contain'
                            }}
                        />
                    </Box>

                    {/* Navigation Tabs */}
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        overflow: 'hidden' // Prevent tabs from overflowing
                    }}>
                        <Tabs
                            value={currentPath}
                            textColor="inherit"
                            variant={isMobile ? "scrollable" : "standard"}
                            scrollButtons={isMobile ? "auto" : false}
                            allowScrollButtonsMobile
                            sx={{
                                '& .MuiTab-root': {
                                    minWidth: { xs: 'auto', sm: 90 }, // Adjust tab width
                                    padding: { xs: '6px 12px', sm: '12px 16px' }, // Adjust padding
                                    fontSize: { xs: '0.8rem', sm: '1rem' } // Smaller font on mobile
                                }
                            }}
                        >
                            <Tab
                                sx={{ textTransform: 'none' }}
                                label={t('navigation.oyuna')}
                                value="/"
                                component={Link}
                                to="/"
                            />
                            <Tab
                                sx={{ textTransform: 'none' }}
                                label={t('navigation.about')}
                                value="/about"
                                component={Link}
                                to="/about"
                            />
                            <Tab
                                sx={{ textTransform: 'none' }}
                                label={t('navigation.help')}
                                value="/help"
                                component={Link}
                                to="/help"
                            />
                        </Tabs>
                    </Box>

                    {/* Right side icons container */}
                    <Box sx={{
                        display: 'flex',
                        gap: { xs: 0.5, sm: 1 }, // Reduced gap on mobile
                        flexShrink: 0
                    }}>
                        {/* Language Toggle */}
                        <LanguageToggleButton />

                        {/* Privacy Icon */}
                        <Tooltip
                            title={t('disclaimer.tooltip')}
                            arrow
                        >
                            <IconButton
                                color="inherit"
                                aria-label="privacy"
                                sx={{
                                    padding: { xs: '4px', sm: '8px' } // Smaller padding on mobile
                                }}
                            >
                                <PrivacyTipIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;
