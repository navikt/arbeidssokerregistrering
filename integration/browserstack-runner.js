const createTestCafe = require('testcafe');
const utils = require('./getNetworkIp');

const pullRequest = process.env.TRAVIS_PULL_REQUEST || false;
const branch = pullRequest
    ? process.env.TRAVIS_PULL_REQUEST_BRANCH
    : process.env.TRAVIS_BRANCH || 'Local';

process.env.BROWSERSTACK_PROJECT_NAME = 'arbeidssokerregistrering';
process.env.BROWSERSTACK_BUILD_ID = branch;

utils.getNetworkIp().then(ip => {

    console.log("Starter testcafe");
    createTestCafe(ip, 1337, 1338)
        .then(testcafe => {

            testcafe
                .createRunner()
                .startApp("cross-env PORT=4001 REACT_APP_MOCK_BES=true REACT_APP_MOCK=true npm start", 20000)
                .src(['integration/registrering.test.ts', 'integration/uu.test.ts'])
                .browsers(['browserstack:iPhone XS@12.0', 'browserstack:chrome:Windows 10', 'browserstack:ie@11.0:Windows 8.1', 'browserstack:Samsung Galaxy S9@8.0'])
                .screenshots('./integration/screenshots/', true, '${BROWSER}_${TEST}.png')
                .run()
                .then(failedCount => {
                    console.log('Tests failed: ' + failedCount);
                    testcafe.close();
                    if(failedCount > 0) process.exit(1);
                })
                .catch(e => {
                    console.log("Runner error: " + e);
                    testcafe.close();
                    process.exit(1);

                });
        })

});
