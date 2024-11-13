const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const ChatSessionManager = require('./src/server/ChatSessionManager');
const helmet = require('helmet');
const axios = require("axios");
const ModelManager = require("./src/server/ModelManager");

require('dotenv').config();

const app = express();
const PORT = 5000;

let modelManager;
let sessionManager;

// Wrapping the initialization in an async function
async function initializeApp() {
    try {
        modelManager = new ModelManager();
        await modelManager.initialize();

        sessionManager = new ChatSessionManager(modelManager);

        startServer();
    } catch (error) {
        console.error('Failed to initialize application:', error);
        process.exit(1);
    }
}

function startServer() {
    app.set('trust proxy', 1);
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        keyGenerator: (req) => {
            return req.headers['x-forwarded-for'] || req.ip;
        }
    });
    console.log(process.env)

    // Middleware
    app.use(express.json());
    app.use(cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                'https://www.facebook.com',
                'https://graph.facebook.com',
                'https://period.mn',
                'https://www.period.mn',
                process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.FRONTEND_URL
            ];

            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'X-Session-ID', 'CSRF-Token', 'Accept-Language'],
        credentials: true,
    }));

    app.use(limiter);
    app.use(helmet());

    // Set up periodic cleanup
    setInterval(() => sessionManager.cleanupStaleSessions(), 15 * 60 * 1000); // Run every 5 minutes

    const sessionIdMiddleware = (req, res, next) => {
        const sessionId = req.headers['x-session-id'];
        const locale = req.headers['accept-language'];
        if (!sessionId) {
            console.log('Session ID not found in headers');
            console.log('Headers:', req.headers);
            console.log('Cookies:', req.cookies);
            return res.status(400).json({error: 'Session ID is required'});
        }

        if (!locale) {
            console.log('Locale not found in headers');
            return res.status(400).json({error: 'Locale is required'});
        }
        req.sessionId = sessionId;
        req.locale = locale;
        next();
    };

    // Route handlers
    app.post('/api/chat', sessionIdMiddleware, (req, res) => {
        const {message} = req.body;
        const sessionId = req.sessionId;
        const locale = req.locale;
        processUserMessage(message, sessionId, locale)
            .then(reply => res.json(reply))
            .catch(error => handleError(error, res));
    });

    app.post('/webhook/messenger', (req, res) => {
        const body = req.body;

        if (body.object === 'page') {
            body.entry.forEach(entry => {
                const webhookEvent = entry.messaging[0];
                console.log(webhookEvent);

                if (webhookEvent.message) {
                    handleMessage(webhookEvent.sender.id, webhookEvent.message);
                }
            });
            res.status(200).send('EVENT_RECEIVED');
        } else {
            res.sendStatus(404);
        }
    });

    app.get('/webhook/messenger', (req, res) => {
        const VERIFY_TOKEN = 'Ewk9cb_TkrfquaB2jPb_hP8r8H1ru-5iUe7AtrXro28';
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        if (mode && token) {
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                console.log('WEBHOOK_VERIFIED');
                res.status(200).send(challenge);
            } else {
                res.sendStatus(403);
            }
        }
    });

    function handleMessage(senderId, receivedMessage) {
        console.log(`Received message from ${senderId}:`, receivedMessage.text);
        processUserMessage(receivedMessage.text, senderId)
            .then(reply => {
                console.log(`Sending reply to ${senderId}:`, reply);
                // Implement sending the reply back to the user via the Messenger API
                callSendAPI(senderId, reply);
            })
            .catch(error => {
                console.error('Error processing message:', error);
            });
    }

    function callSendAPI(sender_psid, response) {
        // Construct the message body
        let request_body = {
            "recipient": {
                "id": sender_psid
            },
            "message": response
        };

        return axios({
            method: 'post',
            url: 'https://graph.facebook.com/v2.6/me/messages',
            params: {
                access_token: process.env.PAGE_ACCESS_TOKEN
            },
            data: request_body
        })
            .then(response => {
                console.log('Message sent!');
                return response.data;
            })
            .catch(error => {
                console.error("Unable to send message:", error.message);
                throw error;
            });
    }

    // Helper functions
    function processUserMessage(userMessage, sessionId, locale) {
        const chat = sessionManager.getOrCreateSession(sessionId, locale);
        return chat.sendMessageStream([{text: userMessage}])
            .then(streamResult => streamResult.response)
            .then(response => response.candidates[0].content)
            .then(responseContent => extractReplyText(responseContent));
    }

    function extractReplyText(responseContent) {
        if (responseContent.parts && Array.isArray(responseContent.parts)) {
            return {reply: responseContent.parts};
        }
        return {reply: [{text: responseContent}]};
    }

    function handleError(error, res) {
        console.error('Error:', error);
        res.status(500).json({
            reply: [{text: 'Error communicating with Vertex AI'}],
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }

    // Start server
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

// Call the initialization function
initializeApp();
