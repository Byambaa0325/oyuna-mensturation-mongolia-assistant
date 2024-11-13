// src/components/FeedbackPrompt.js
import React, { useState } from 'react';
import { Box, Typography, Rating, TextField, Button, Stack } from '@mui/material';

const FeedbackPrompt = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        // Handle feedback submission
        console.log('Rating:', rating);
        console.log('Comment:', comment);
        // Reset feedback
        setRating(0);
        setComment('');
    };

    return (
        <Box sx={{ padding: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" gutterBottom>
                    Танд үлдээх сэтгэгдэл байна уу?
                </Typography>
                <Rating
                    name="feedback-rating"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
                <TextField
                    variant="outlined"
                    placeholder="Санал сэтгэгдэл?"
                    size="small"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button variant="contained" color="secondary" onClick={handleSubmit} disabled={rating === 0 && comment.trim() === ''}>
                    Илгээх
                </Button>
            </Stack>
        </Box>
    );
};

export default FeedbackPrompt;
