module.exports = function configureKarma(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'test/**/*.spec.js',
        ],
        preprocessors: {
            'test/**/*.spec.js': ['esbuild'],
        },
        esbuild: {
            target: 'es2022',
            jsx: 'automatic',
            loader: {
                '.js': 'jsx',
            },
        },
        plugins: [
            'karma-jasmine',
            'karma-jsdom-launcher',
            'karma-esbuild',
        ],
        reporters: ['progress'],
        browsers: ['jsdom'],
        singleRun: true,
        autoWatch: false,
        client: {
            clearContext: false,
        },
        logLevel: config.LOG_WARN,
    })
}
