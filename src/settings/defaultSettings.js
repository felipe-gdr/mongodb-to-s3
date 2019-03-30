const defaultSettings = {
    targetDir: './dumps',
    mongodb: {
        user: '',
        password: '',
        host: 'locahost',
        port: 27017
    },
    aws: {
        cloudWatch: {
            namespace: 'ops',
        }
    }
};

module.exports = defaultSettings;
