import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
    {
        question: 'What is Oyuna, and who is it for?',
        answer: 'Oyuna is an AI chatbot designed to provide accurate, culturally sensitive information and support on menstrual health. It is intended for use by girls, parents, teachers, and boys in Mongolia to promote understanding, reduce stigma, and support menstrual health.',
    },
    {
        question: 'How does Oyuna work?',
        answer: 'Users can access Oyuna through a web interface or messaging apps. Upon starting, users select their role (girl, parent, teacher, boy), and the chatbot tailors the conversation to provide relevant information and answer questions specific to that perspective.',
    },
    {
        question: 'What kind of information does Oyuna provide?',
        answer: 'Oyuna covers a wide range of topics, including:\n- Menstrual cycle and puberty\n- Hygiene practices during menstruation\n- Managing menstrual discomfort\n- Cultural beliefs and myths about menstruation\n- How to support someone who is menstruating',
    },
    {
        question: 'Is Oyuna available in languages other than Mongolian?',
        answer: 'Currently, Oyuna communicates in Mongolian, including regional dialects, to best serve the local community. We are exploring options to include additional languages in the future based on user needs.',
    },
    {
        question: 'How does Oyuna ensure privacy and anonymity?',
        answer: 'Oyuna does not require users to provide any personal information. Conversations are encrypted and not linked to individual identities, ensuring that users can seek information without concerns about privacy.',
    },
    {
        question: 'Is there a cost to use Oyuna?',
        answer: 'No, Oyuna is completely free to use. Our goal is to make menstrual health support accessible to everyone in Mongolia.',
    },
    {
        question: 'How accurate is the information provided by Oyuna?',
        answer: 'All information has been developed and reviewed by qualified healthcare professionals and educators. Oyuna’s content is regularly updated to reflect the latest health guidelines and cultural considerations.',
    },
    {
        question: 'Can Oyuna replace professional medical advice?',
        answer: 'While Oyuna provides valuable information, it is not a substitute for professional medical advice. Users are encouraged to consult healthcare professionals for personal medical concerns or conditions.',
    },
    {
        question: 'How does Oyuna handle sensitive cultural topics?',
        answer: 'Oyuna has been carefully designed with input from cultural experts to ensure that all content is respectful and appropriate. The chatbot addresses sensitive topics with discretion, aiming to educate while honoring cultural traditions.',
    },
    {
        question: 'How can I provide feedback or suggest improvements to Oyuna?',
        answer: 'We welcome user feedback to help us improve Oyuna continually. You can provide feedback directly through the chatbot interface or contact us at [Contact Email].',
    },
    {
        question: 'What platforms is Oyuna available on?',
        answer: 'Oyuna can be accessed via our website at [Website URL] and through messaging apps such as [List of Supported Platforms]. We aim to make Oyuna as accessible as possible across various devices.',
    },
    {
        question: 'How does Oyuna support boys and men?',
        answer: 'Oyuna includes educational content specifically designed for boys and men to promote understanding and empathy. By educating all members of the community, we hope to reduce stigma and foster a supportive environment for girls and women.',
    },
    {
        question: 'Is any training required to use Oyuna?',
        answer: 'No training is required. Oyuna is designed to be user-friendly and intuitive. Simply start a conversation, select your role, and begin asking questions.',
    },
    {
        question: 'How is Oyuna different from other health chatbots?',
        answer: 'Oyuna is specifically tailored to the cultural context of Mongolia, addressing the unique challenges and needs related to menstrual health support in the region. It provides localized content in Mongolian, making it more relevant and accessible to the community it serves.',
    },
    {
        question: 'How can organizations and schools integrate Oyuna into their programs?',
        answer: 'We encourage educational institutions and organizations to utilize Oyuna as a resource. For partnerships or to discuss integration, please contact us at zaazxssx4@gmail.com.',
    },
];

const HelpPage = () => (
    <Container maxWidth="md" sx={{ 
        py: 4
    }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{color:'text.message'}}>
            Help & FAQ
        </Typography>
        <Typography variant="body1" paragraph align="center">
            Here are some frequently asked questions to help you get started with Oyuna:
        </Typography>
        {faqs.map((faq, index) => (
            <Accordion key={index} >
                <AccordionSummary expandIcon={<ExpandMoreIcon  sx={{ color: 'secondary.main'}} />}>
                    <Typography variant="h6">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails >
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                        {faq.answer}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        ))}
    </Container>
);

export default HelpPage;
