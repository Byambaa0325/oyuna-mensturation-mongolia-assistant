import React from 'react';
import {Chip, Grid} from '@mui/material';
import Typography from "@mui/material/Typography";
const commonQuestions = [
    "Сарын тэмдгийн өвдөлтийг хэрхэн намдаах вэ?",
    "Эрүүл сарын тэмдгийн мөчлөг ямар байдаг вэ?",
    "Хоолны дэглэм сарын тэмдэгт хэрхэн нөлөөлдөг вэ?",
    "Сарын тэмдгийн талаар хэзээ эмчид хандах ёстой вэ?",
];

const CommonQuestions = ({ onQuestionClick, isSubmitting }) => {
    return (
        <Grid container direction="column" spacing={2} py={2}>
            <Grid item>
                <Typography variant="subtitle1" color="text.primary" gutterBottom>
                    Түгээмэл Асуултууд: Юу ч асууж болно гэдгийг санаарай. Эсвэл доорх асуултаас эхлээрэй
                </Typography>
            </Grid>
            <Grid item container spacing={2}>
                {commonQuestions.map((question, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Chip
                            label={question}
                            clickable
                            color="secondary"
                            onClick={() => onQuestionClick(question)}
                            disabled={isSubmitting}
                            variant="outlined"
                            sx={{
                                width: '100%',
                                height: 'auto',
                                '& .MuiChip-label': {
                                    display: 'block',
                                    whiteSpace: 'normal',
                                    padding: '8px 4px',
                                }
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default CommonQuestions;
