import React, {memo, useEffect, useRef} from 'react';
import { Box, Paper } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import {CommonQuestionsInChatStatic} from "../resources/CommonQuestionInChat";

const MessagePlaceholder = () => (
    <Paper
        elevation={0}
        sx={{
            px: 3,
            py: 1,
            borderRadius: 3,
            maxWidth: '75%',
            height: '24px', // Fixed height
            backgroundColor: 'grey.100',
            mb: 1
        }}
    />
);

const ChatWindow = memo(function ChatWindow({ messages, onQuestionClick, isSubmitting }) {
    const messagesEndRef = useRef(null);


    // Auto-scroll to the bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }, [messages]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            <Box
                sx={{
                    height: '70vh',
                    overflowY: 'auto',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {messages.length === 0 ? (
                        <>
                            <MessagePlaceholder />
                        </>
                    ) : (
                    messages.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent:
                                message.role === 'user' ? 'flex-end' : 'flex-start',
                            mb: 1,
                        }}
                    >
                        <Paper
                            elevation={0}
                            className="fade-in"
                            sx={{
                                px: 3,
                                py: 1,
                                borderRadius: 3,
                                maxWidth: '75%',
                                backgroundColor:
                                    message.role === 'user' ? 'secondary.main' : 'primary.main', // Light pink for bot messages
                                color: 'text.chat',
                                lineHeight: 1.6,
                                fontSize: '14px'
                            }}
                        >
                            {message.role === 'bot' ? (
                                message.parts.map((part, idx) => (
                                    <ReactMarkdown
                                        key={idx}
                                        className="markdown-content"
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeHighlight]}
                                        sx={{

                                        }}
                                    >
                                        {part.text}
                                    </ReactMarkdown>
                                ))
                            ) : (
                                <Box component="span">{message.text}</Box>
                            )}
                        </Paper>

                        <div ref={messagesEndRef} />
                    </Box>
                ))
            )}
                    <CommonQuestionsInChatStatic isSubmitting={isSubmitting} onQuestionClick={onQuestionClick}/>
            </Box>

        </Box>
    );
});

export default ChatWindow;
