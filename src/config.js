// config.js (updated)
export function loadConfig() {

    // Ensure required report fields have values
    const reporterConfig = {
        endpoint: __ENV.RP_ENDPOINT,
        token: __ENV.RP_TOKEN,
        project: __ENV.RP_PROJECT,
        launch: __ENV.RP_LAUNCH,
        description: __ENV.RP_DESCRIPTION,
        publishResult: true,
        mode: __ENV.RP_MODE,
        attributes: [
            {'key': 'component', 'value': __ENV.RP_COMPONENT},
            {'value': 'automated'}
        ],
        debug: __ENV.NODE_ENV === 'development',
    };

    // Log to verify required fields are set
    console.log(`Reporter config - endpoint: ${reporterConfig.endpoint}, project: ${reporterConfig.project}, token: ${reporterConfig.token ? '[SET]' : '[MISSING]'}`);

    return {
        reporterConfig,
        baseURL: __ENV.BASE_URL,
        token: __ENV.AUTH_TOKEN,
        enabledSuites: __ENV.ENABLED_SUITES.split(',')
    };
}