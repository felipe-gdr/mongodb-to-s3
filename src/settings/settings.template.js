const settings = {
    targetDir: './dumps',
    cron: '* * * * * *',
    mongodb: {
        user: '',
        password: '',
        host: 'localhost',
        port: 27017,
        database: ''
    },
    aws: {
        secretAccessKey: '',
        accessKeyId: '',
        region: '',
        bucket: ''
    }
};

module.exports = settings;
