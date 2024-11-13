import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';


const FeatureCard = styled(Card)(({ theme }) => ({
    height: '100%',
    backgroundColor: '#ffffff',
    boxShadow: theme.shadows[1],
    '&:hover': {
        transform: 'scale(1.05)',
        transition: 'transform 0.3s ease-in-out',
    },
}));

const AboutPage = () => (
    <>
        <Box sx={{
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100vw',
            backgroundColor: 'white',
            color: 'text',
        }}>
            <Grid container sx={{ height: 'auto' }}>
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        pl: { xs: 2, sm: 10, lg: 20 },
                        py: { xs: 5 },
                        position: { md: 'absolute' },
                        top: { xs: '0', sm: '20%', lg: '30%' },
                    }}>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Introducing "Oyuna"
                        </Typography>
                        <Typography variant="subtitle1" sx={{ py: { xs: 1, sm: 2, lg: 3 } }}>
                            Mongolia's AI Chatbot for Menstrual Health Support
                        </Typography>
                        <Typography variant="caption">
                            Ulaanbaatar, Mongolia — 2024/10/24
                        </Typography>
                    </Box>
                </Grid>

                {/* Image Section */}
                <Grid item xs={12} md={6} sx={{ alignItems: 'center' }}>
                    <Box
                        component="img"
                        src="optimized-images/aboutbackground.webp"
                        alt="People on their phone"
                        sx={{
                            maxWidth: '99%',
                            height: 'auto',
                            objectFit: 'cover',
                            margin: 0,
                            padding: 0
                        }}
                    />
                </Grid>
            </Grid>
        </Box>

        <Container maxWidth="lg" sx={{
            py: { xs: 2, sm: 4 },
            px: { xs: 4, sm: 8, lg: 20 },
            backgroundColor: 'white',
        }}>
            <Typography fontWeight="bold" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' }, pt: 2 }}>
                Today, we are excited to announce the launch of "Oyuna", an AI-powered chatbot designed to provide accurate, culturally sensitive menstrual health support to girls, parents, teachers, and boys across Mongolia.
            </Typography>
            <Typography variant="caption" fontStyle='italic' color="grey">
                Please note that Oyuna is not a substitute for professional medical advice, diagnosis, or treatment. It is intended to provide information and support only. Always consult a healthcare professional for medical concerns.
            </Typography>

            <Typography variant="body2" sx={{ py: 4 }}>
                Oyuna aims to break down cultural barriers and stigmas associated with menstruation by offering a safe, anonymous platform where users can ask questions and receive reliable information. Developed in collaboration with local healthcare professionals, educators, and cultural experts, Oyuna is tailored to meet the unique needs of the Mongolian community.
            </Typography>
            <Typography variant="body2">
                According to a study on Menstrual Hygiene Management (MHM) in Mongolia, many girls face significant challenges in managing menstruation at school due to inadequate Water, Sanitation, and Hygiene (WASH) facilities. Oyuna aims to address these gaps by providing critical information and support in an accessible format.
            </Typography>

            <Typography variant="h5" color="error" fontWeight="bold" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' }, pb: 4, pt: { xs: 4, sm: 6, lg: 8 } }}>
                Addressing a Critical Need
            </Typography>

            <Typography variant="body2">
                In many parts of Mongolia, girls face challenges in managing menstruation due to limited access to accurate information and pervasive cultural taboos. This can lead to misconceptions, health issues, and social stigma.
            </Typography>

            <Box sx={{ textAlign: 'center', pt: { xs: 2, sm: 4 }, fontStyle: 'italic', px: { xs: 2, sm: 4 } }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    “By providing a trusted source of information, Oyuna empowers individuals to make informed decisions about their health and fosters a supportive community environment.”
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ~ Zaya, Project Lead for Oyuna.
                </Typography>
            </Box>

            <Typography variant="h5" color="success" fontWeight="bold" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' }, pb: 4, pt: { xs: 4, sm: 6, lg: 8 } }}>
                Supporting All Members of the Community
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <FeatureCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Role-Based Interactions
                            </Typography>
                            <Typography variant="body2">
                                Users select their role—girl, parent, teacher, or boy—to receive customized information relevant to their perspective and needs.
                            </Typography>
                        </CardContent>
                    </FeatureCard>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <FeatureCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Culturally Sensitive Content
                            </Typography>
                            <Typography variant="body2">
                                Provides accurate information on menstrual health, puberty, hygiene practices, and emotional support, all delivered with respect for local traditions and beliefs.
                            </Typography>
                        </CardContent>
                    </FeatureCard>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <FeatureCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Multilingual Support
                            </Typography>
                            <Typography variant="body2">
                                Communicates fluently in Mongolian, understanding regional dialects and colloquial expressions to ensure clarity and comprehension.
                            </Typography>
                        </CardContent>
                    </FeatureCard>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <FeatureCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Accessible Platforms
                            </Typography>
                            <Typography variant="body2">
                                Available through a web interface and popular messaging apps, making it easy to access from various devices and locations.
                            </Typography>
                        </CardContent>
                    </FeatureCard>
                </Grid>
            </Grid>

            {/* Role-based Audience Cards */}
            <Grid container spacing={2} sx={{ my: { xs: 2, sm: 3 } }}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ backgroundColor: '#FFE3E3', height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" align="center" fontWeight="bold">
                                Girls
                            </Typography>
                            <Typography variant="body2" align="center" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                                Offers a safe space to learn about menstruation, ask questions, and receive guidance without fear or embarrassment.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ backgroundColor: '#E3F6FF', height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" align="center" fontWeight="bold">
                                Parents, Teachers
                            </Typography>
                            <Typography variant="body2" align="center" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                                Provides resources to help adults educate and support girls, promoting open communication and understanding.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ backgroundColor: '#006D5B', color: 'white', height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" align="center" fontWeight="bold">
                                Boys
                            </Typography>
                            <Typography variant="body2" align="center" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                                Encourages boys to learn about menstruation to reduce stigma and promote empathy, fostering a supportive environment.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 3, pb: 4, pt: { xs: 4, sm: 6, lg: 8 } }}>
                <Box
                    sx={{
                        width: { xs: 150, sm: 200 },
                        height: { xs: 150, sm: 250 },
                        borderRadius: '40% 40% 0 0 ',
                        background: 'linear-gradient(135deg, #A5D7E8, #FFE3E3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    <Typography variant="h6" color="text.primary" align="center" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        OUR MISSION
                    </Typography>
                </Box>

                {/* Text Columns */}
                <Box>
                    <Typography variant="h6" color="text.primary" fontWeight="bold" gutterBottom>
                        Privacy and Anonymity
                    </Typography>
                    <Typography variant="body2">
                        Understanding the sensitivity of the topic, Oyuna ensures complete user anonymity. No personal data is required to interact with the chatbot, and all conversations are kept confidential.
                    </Typography>
                    <Typography variant="h6" color="text.primary" fontWeight="bold" gutterBottom>
                        Community Collaboration
                    </Typography>
                    <Typography variant="body2">
                        Oyuna is the result of a collaborative effort involving local NGOs, educational institutions, and community leaders. This collective approach ensures that the chatbot remains relevant, accurate, and culturally appropriate.
                    </Typography>
                    <Typography variant="h6" color="text.primary" fontWeight="bold" gutterBottom>
                        Availability
                    </Typography>
                    <Typography variant="body2">
                        Oyuna is now accessible at <Link to={'https://period.mn'}>Period.mn</Link> and can be added on messaging platforms such as [List of Supported Platforms, e.g., Telegram, Facebook Messenger]. The service is free to use, reinforcing our commitment to making menstrual health support accessible to everyone.
                    </Typography>
                </Box>
            </Box>
            < Box>
                <Typography gutterBottom variant="h5" fontWeight="bold" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' }, pb: { xs: 4, sm: 4, lg: 4 }, pt: { xs: 4, sm: 6, lg: 8 } }}>
                    About the Development Team
                </Typography>
                <Typography variant="body2" >
                    Our team comprises passionate professionals from the fields of artificial intelligence, healthcare, education, and social work, all dedicated to improving menstrual health support in Mongolia. The insights gained from the 2016 study on MHM in Mongolian schools have been instrumental in developing Oyuna, guiding us to address the specific needs and challenges faced by girls across different regions(UNICEF MHM Study, Chapter 2).
                </Typography>
            </Box >
        </Container>
    </>
);

export default AboutPage;
