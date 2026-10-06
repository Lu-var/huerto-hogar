const { esbuildPluginIstanbul } = require('esbuild-plugin-istanbul')

module.exports = function configureKarma(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'test/**/*.spec.js',
        ],
        preprocessors: {
            'test/**/*.spec.js': ['esbuild', 'coverage'],
        },
        esbuild: {
            target: 'es2022',
            jsx: 'automatic',
            loader: {
                '.js': 'jsx',
            },
            plugins: [
                esbuildPluginIstanbul({
                    filter: /\/(src|test)\//,
                    loader: 'jsx',
                    name: 'istanbul-instrumentation',
                }),
            ],
        },
        plugins: [
            'karma-jasmine',
            'karma-jsdom-launcher',
            'karma-esbuild',
            'karma-coverage',
        ],
        reporters: ['progress', 'coverage'],
        browsers: ['jsdom'],
        singleRun: true,
        autoWatch: false,
        client: {
            clearContext: false,
        },
        logLevel: config.LOG_WARN,
        coverageReporter: {
            dir: 'reports/coverage/',
            reporters: [
                { type: 'text-summary' },
                { type: 'html' },
                { type: 'lcovonly' },
            ],
            check: {
                global: {
                    statements: 50,
                    branches: 40,
                    functions: 50,
                    lines: 50,
                },
            },
        },
    })
}
