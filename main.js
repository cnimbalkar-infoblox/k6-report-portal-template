// main.js (updated)
import {runSuites, createReporter} from 'https://cdn.jsdelivr.net/npm/k6-report-portal@1.0.0/lib/index.min.js';
import {loadConfig} from './src/config.js';
// !IMPORTANT: Import test suites from the build directory
import exampleTest from './build/test/exampleTest.js';

export const options = {
    scenarios: {
        'access-control-tests': {
            executor: 'shared-iterations',
            vus: Number(__ENV.VUS) || 1,
            iterations: Number(__ENV.ITERATIONS),
            maxDuration: __ENV.MAX_DURATION
        }
    }
};


export function setup() {
    return loadConfig();
}

export function teardown() {

}

export default async function (config) {
    let reporter = createReporter(config.reporterConfig);
    let logger = reporter.start();

    if (!logger) {
        throw new Error('Failed to initialize reporter');
    }

    try {
        await runSuites({
            ...config,
            logger,
            testSuites: {
                // !IMPORTANT: Add imported test suites to the testSuites object
                'exampleTest': exampleTest
            }
        });
        reporter.finish();
    } catch (error) {
        reporter.finish('FAILED');
        throw error;
    }
}