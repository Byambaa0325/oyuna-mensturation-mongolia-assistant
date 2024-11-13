import React from 'react';
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {useTranslation} from "react-i18next";

function ChatInput({ handleSubmit, input, setInput, isSubmitting }) {
    const { t } = useTranslation();
    return <Box
        sx={{
            height: '84px',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            border: 'none'
        }}>
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                backgroundColor: 'background.paper',
                border: '4px solid',
                borderColor: '#f5f5f5',
                borderRadius: 3,
                width: '100%',
                py: 1,
                alignItems: 'center',
                position: 'relative',
                animation: !input ? 'pulseBox 2s infinite' : 'none',
                '@keyframes pulseBox': {
                    '0%': {
                        boxShadow: '0 0 0 0 rgba(25, 118, 210, 0.4)',
                    },
                    '70%': {
                        boxShadow: '0 0 0 10px rgba(25, 118, 210, 0)',
                    },
                    '100%': {
                        boxShadow: '0 0 0 0 rgba(25, 118, 210, 0)',
                    },
                },
                transition: 'all 0.3s ease',
                '&:focus-within': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                },
            }}
        >
            <TextField
                fullWidth
                variant="standard"
                placeholder={t('chat.input.placeholder')}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                sx={{
                    ml: 1,
                    '& .MuiInput-root': {
                        fontSize: '14px',
                        paddingLeft: '12px',
                    },
                    '& .MuiInput-underline': {
                        '&:before': {
                            borderBottom: 'none'
                        },
                        '&:after': {
                            borderBottom: 'none'
                        },
                        '&:hover:not(.Mui-disabled):before': {
                            borderBottom: 'none'
                        }
                    }
                }}
            />
            <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                fullWidth={false}
                sx={{
                    mr: 1,
                    p: 0.5,
                    maxWidth: '28px',
                    minWidth: '28px',
                    bgcolor: "primary.main",
                    borderRadius: 10,
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                        transform: 'scale(1.05)'
                    }
                }}
            >
                {isSubmitting ? <CircularProgress size={24} color="inherit" />
                    : <ArrowUpwardIcon sx={{
                        color: 'text.primary',
                        fontSize: '16px',
                        p: 0,
                        m: 0
                    }} >
                    </ArrowUpwardIcon>
                }
            </Button>
        </Box>
    </Box>;
}

export default ChatInput;
