const config = {
    type: 'app',
    name: 'jupyter',
    title: 'Jupyter',
    coreApp: true,

    minDHIS2Version: '2.40',

    pwa: {
        enabled: true,
        caching: {
            patternsToOmitFromAppShell: [/.*/],
        },
    },

    entryPoints: {
        app: './src/AppWrapper.js',
    },
}

module.exports = config
