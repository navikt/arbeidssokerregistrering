
const config = {
    src_folders: ["integration/tests"],
    page_objects_path: ["integration/pages"],
    output_folder: "integration/reports",
    custom_assertions_path: "",
    globals_path: "./integration/globals.js",

    selenium: {
        start_process: false,
    },

    test_settings: {
        default: {
            launch_url: 'http://localhost:3001/arbeidssokerregistrering',
            globals: {
                wait: 20000,
            },
            selenium_port: 9515,
            selenium_host: "localhost",
            default_path_prefix: '',
            desiredCapabilities: {
                browserName: "chrome",
                javascriptEnabled: true,
                acceptSslCerts: true,
                keepAlive: false,
                chromeOptions: {
                    args: ['--headless', '--no-sandbox', '--disable-gpu', '--log-level=3'],
                },
            }
        },
    }
};

module.exports = config;