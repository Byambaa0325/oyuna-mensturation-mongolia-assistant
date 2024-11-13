const {SecretManagerServiceClient} = require("@google-cloud/secret-manager");
const secretClient = new SecretManagerServiceClient();

async function getSecret(secretId, versionId = "latest") {
    const [version] = await secretClient.accessSecretVersion({
        name: `projects/${process.env.GOOGLE_CLOUD_SECRET_ID}/secrets/${secretId}/versions/${versionId}`,
    });

    return version.payload.data.toString("utf8");
}

async function getSystemPrompt(locale = 'en') {
    try {
        const systemPrompt = await getSecret("oyuna_system_prompt_template_"+locale);
        return { text: systemPrompt };
    } catch (error) {
        console.error('Failed to fetch system prompt:', error);
        throw error;
    }
}

exports.getSystemPrompt = getSystemPrompt;
