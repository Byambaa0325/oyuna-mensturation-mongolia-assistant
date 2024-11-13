const { VertexAI } = require("@google-cloud/vertexai");
const { getSystemPrompt } = require("./modelConstants");


class ModelManager {
    constructor() {
        this.models = new Map(); // Store models for each locale
        this.vertexAI = null;
        this.availableLocales = ['en', 'mn'];
    }

    async initialize() {
        try {
            const vertexAIConfig = this.createVertexAIConfig();
            this.vertexAI = new VertexAI(vertexAIConfig);

            // Initialize models for all available locales
            console.log("Initializing the models for following locales", this.availableLocales)
            await Promise.all(
                this.availableLocales.map(locale => this.initializeModelForLocale(locale))
            );

            return this.models;
        } catch (error) {
            console.error('Failed to initialize models:', error);
            throw error;
        }
    }

    async initializeModelForLocale(locale) {
        try {
            console.log("Attempting to initialize model for locale", locale)
            const modelConfig = await this.createModelConfig(locale);
            const model = this.vertexAI.preview.getGenerativeModel(modelConfig);
            this.models.set(locale, model);
            console.log("Model initialized for locale", locale)
            return model;
        } catch (error) {
            console.error(`Failed to initialize model for locale ${locale}:`, error);
            throw error;
        }
    }

    createVertexAIConfig() {
        const config = {
            project: process.env.GOOGLE_CLOUD_PROJECT,
            location: process.env.GOOGLE_CLOUD_LOCATION,
        };

        // Validate config
        if (!config.project || !config.location) {
            throw new Error('Missing required VertexAI configuration');
        }

        return config;
    }

    async createModelConfig(locale) {
        if (!this.availableLocales.includes(locale)) {
            throw new Error(`Unsupported locale: ${locale}`);
        }

        return {
            model: 'gemini-1.5-flash-002',
            generationConfig: {
                maxOutputTokens: 8192,
                temperature: 1,
                topP: 0.95,
            },
            safetySettings: this.getSafetySettings(),
            systemInstruction: {
                parts: [await getSystemPrompt(locale)],
            },
        };
    }

    getSafetySettings() {
        return [
            {category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'OFF'},
            {category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'OFF'},
            {category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'OFF'},
            {category: 'HARM_CATEGORY_HARASSMENT', threshold: 'OFF'},
        ];
    }

    getModel(locale = 'en') {
        if (!this.models.has(locale)) {
            throw new Error(`Model not initialized for locale: ${locale}`);
        }
        return this.models.get(locale);
    }

    isLocaleSupported(locale) {
        return this.availableLocales.includes(locale);
    }

    getAvailableLocales() {
        return [...this.availableLocales];
    }

    async reinitializeModel(locale) {
        if (!this.isLocaleSupported(locale)) {
            throw new Error(`Unsupported locale: ${locale}`);
        }
        return await this.initializeModelForLocale(locale);
    }

    getModelStatus(locale) {
        return {
            initialized: this.models.has(locale),
            supported: this.isLocaleSupported(locale)
        };
    }
}

module.exports = ModelManager;
