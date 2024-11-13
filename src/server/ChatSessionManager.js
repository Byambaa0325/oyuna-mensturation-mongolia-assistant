const ModelManager = require("./ModelManager");


class ChatSessionManager {
    constructor(modelManager, sessionTimeout = 30 * 60 * 1000) { // 30 minutes default
        this.sessions = new Map();
        if (!(modelManager instanceof ModelManager)) {
            throw new Error('ModelManager instance required');
        }
        this.modelManager = modelManager;
        this.sessionTimeout = sessionTimeout;
    }

    getOrCreateSession(sessionId, locale = 'en') {
        if (!this.modelManager.isLocaleSupported(locale)) {
            throw new Error(`Unsupported locale: ${locale}`);
        }

        if (!this.sessions.has(sessionId)) {
            this.sessions.set(sessionId, {
                chat: this.modelManager.getModel(locale).startChat({}),
                lastUsed: Date.now(),
                locale: locale
            });
        } else {
            this.sessions.get(sessionId).lastUsed = Date.now();
        }
        return this.sessions.get(sessionId).chat;
    }

    cleanupStaleSessions() {
        const now = Date.now();
        for (const [sessionId, session] of this.sessions.entries()) {
            if (now - session.lastUsed > this.sessionTimeout) {
                this.sessions.delete(sessionId);
            }
        }
    }
}
module.exports = ChatSessionManager;

