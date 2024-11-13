import {Box, Chip, Collapse, Paper, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useTranslation} from "react-i18next";
import {AgeGroupOptions, questionsByRoleAndAge, RoleOptions} from "../model/UserEnums";



const CommonQuestion = ({
                            question,
                            isSubmitting,
                            onQuestionClick
                        }) => {
    return (
        <Paper
            elevation={0}
            className="fade-in"
            sx={{
                py: 1,
                backgroundColor: 'secondary.main',
            }}
        >
            <Chip
                label={question}
                clickable
                color="text.message"
                onClick={() => onQuestionClick(question)}
                disabled={isSubmitting}
                variant="outlined"
                sx={{
                    borderStyle: 'dashed',
                    width: '100%',
                    height: 'auto',
                    '& .MuiChip-label': {
                        display: 'block',
                        whiteSpace: 'normal',
                        padding: '8px',
                    }
                }}
            />
        </Paper>
    );
};

// Parent component where you'll use the CommonQuestion component
const CommonQuestionList = ({ questions, isSubmitting, onQuestionClick }) => {
    return (
        <>
            {questions.map((question, index) => (
                <CommonQuestion
                    key={index}
                    question={question}
                    isSubmitting={isSubmitting}
                    onQuestionClick={onQuestionClick}
                />
            ))}
        </>
    );
};

const CommonQuestionsInChatStatic = ({isSubmitting, onQuestionClick}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [questions, setQuestions] = useState([]);
    const { t } = useTranslation();

    // Function to get and format questions based on role and age
    const getFormattedQuestions = () => {
        const role = RoleOptions.getFromStorage();
        let selectedQuestions;

        if (RoleOptions.isSelfOrFriend(role)) {
            const ageGroup = AgeGroupOptions.getFromStorage();
            if (ageGroup) {
                selectedQuestions = questionsByRoleAndAge[role][ageGroup];
            } else {
                selectedQuestions = questionsByRoleAndAge[role][AgeGroupOptions.ADULT];
            }
        } else {
            if (role) {
                selectedQuestions = questionsByRoleAndAge[role][AgeGroupOptions.ADULT];
            } else {
                selectedQuestions = questionsByRoleAndAge[RoleOptions.SELF][AgeGroupOptions.ADULT];
            }
        }

        return selectedQuestions.map((question) => t(question));
    };

    // Update questions when component mounts and when storage changes
    useEffect(() => {
        const updateQuestions = () => {
            setQuestions(getFormattedQuestions());
        };

        // Initial update
        updateQuestions();

        // Listen for storage changes
        const handleStorageChange = (event) => {
            if (event.key === 'disclaimerRole' || event.key === 'disclaimerAge') {
                updateQuestions();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Custom event listener for direct updates
        window.addEventListener('userPreferencesUpdated', updateQuestions);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('userPreferencesUpdated', updateQuestions);
        };
    }, [t]); // Add t as dependency since it's used in getFormattedQuestions

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mb: 1,
            }}
        >
            <Paper
                elevation={0}
                className="fade-in"
                sx={{
                    px: 3,
                    py: 1,
                    maxWidth: '75%',
                    backgroundColor: 'secondary.main',
                    color: 'text.chat',
                    lineHeight: 1.6,
                    border: '1px solid #B7B7B7',
                    borderRadius: 3,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant='subtitle1'>
                        {t('common_question.title')}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={toggleExpand}
                        aria-label="toggle common questions"
                        aria-expanded={isExpanded}
                        data-testid="toggle-questions"
                        sx={{
                            ml: 1,
                            color: 'text.primary',
                            '&:hover': {
                                color: 'text.secondary'
                            }}}
                    >
                        {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </Box>

                <Collapse in={isExpanded}>
                    <Typography
                        variant='caption'
                        data-testid="common-questions-content"
                        sx={{
                            border: 'none',
                            color: 'text.message',
                            display: 'block',
                            mb: 1,
                        }}
                    >
                        {t('common_question.tagline')}
                    </Typography>
                    <CommonQuestionList
                        questions={questions}
                        isSubmitting={isSubmitting}
                        onQuestionClick={onQuestionClick}
                    />
                </Collapse>
            </Paper>
        </Box>
    );
};
export { CommonQuestion, CommonQuestionList, CommonQuestionsInChatStatic };
