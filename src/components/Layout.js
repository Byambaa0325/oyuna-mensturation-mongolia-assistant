import React from 'react';
import {Box, Container} from '@mui/material';
import {useLocation} from 'react-router-dom';
import CustomAppBar from "./TopBar";
import DisclaimerDialog from "./Disclaimer";
import GoogleFeedbackForm from "./GoogleFeedbackForm";
import {styles} from '../App.styles';
import PrivacyDisclaimer from "./PrivacyDisclaimerInline";

const Layout = ({children}) => {
    const location = useLocation();

    return (
        <div>
            <DisclaimerDialog/>
            <CustomAppBar currentPath={location.pathname}/>
            <Box sx={styles.mainBox}>
                <Container maxWidth="lg" sx={styles.container}>
                    {children}
                    <PrivacyDisclaimer/>
                    <GoogleFeedbackForm/>
                </Container>
            </Box>
        </div>
    );
};

export default Layout;
