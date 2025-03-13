import {Suite, Test, Setup, Teardown} from "https://cdn.jsdelivr.net/npm/k6-report-portal@1.0.0/lib/index.min.js";

@Suite({
    name: 'Example Test Suite',
    description: 'An example test suite for demonstration purposes',
    features: ['example']
})
class ExampleTests {

    @Setup()
    async setupSuite({testId, logger, baseURL}) {
        console.log("Setting up the test suite...");
        // Log suite setup information
        logger.info(testId, "Setting up test suite...");

        logger.json(testId, {
            environment: baseURL,
            timestamp: new Date().toISOString()
        }, 'setup-config.json', 'Test Configuration');
    }

    @Test({
        name: 'Create Resource Test',
        description: 'Test resource creation',
        priority: 'P1',
        features: ['policies'],
        service: 'AUTHZ'
    })
    async createResourceTest({testId, logger}) {
        const stepId = logger.startStep(testId, 'Create Resource', 'Attempting to create resource');

        try {
            //throw new Error("not good");
        } catch (error) {
            // Use the defect method instead of manually setting FAILED status
            logger.defect(stepId, error.message);
            throw error;
        }

        // No need to pass PASSED status, it's the default
        logger.info(stepId, 'Resource created successfully');
        logger.finishStep(stepId);
    }

    @Test({
        name: 'Example Test',
        description: 'An example test case',
        priority: 'P1',
        features: ['example'],
        service: 'EXAMPLE'
    })
    async exampleTest({baseURL, token, testId, logger}) {
        // Log test execution details
        logger.info(testId, "Starting example test execution");

        logger.highlight(
            testId,
            `Testing API endpoint: ${baseURL}/api/example`,
            baseURL,
            'code'
        );

        // Example request data
        const requestData = {
            method: 'GET',
            endpoint: '/api/example',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        // Log request details
        logger.json(
            testId,
            requestData,
            'request-data.json',
            'API Request Configuration'
        );

        // Example response data
        const responseData = {
            status: 'success',
            data: {id: 123}
        };

        // Log response data
        logger.json(
            testId,
            responseData,
            'response-data.json',
            'API Response Data'
        );

        // Log success message
        logger.success(testId, "Test completed successfully");
    }

    @Teardown()
    async teardownSuite({testId, logger}) {
        console.log("Tearing down the test suite...");
        logger.info(testId, "Cleaning up test resources...");
    }
}

export default new ExampleTests();