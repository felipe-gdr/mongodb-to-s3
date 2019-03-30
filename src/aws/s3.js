const AWS = require('aws-sdk');
const fs = require('fs');

const settings = require('./settings');

AWS.config.update({
    secretAccessKey: settings.aws.secretAccessKey,
    accessKeyId: settings.aws.accessKeyId,
    region: settings.aws.region
});

const upload = ({ filePath }) => {
    const s3 = new AWS.S3();

    const parts = filePath.split('/');
    const key = parts[parts.length - 1];

    const params = {
        Bucket: settings.aws.bucket,
        Body: fs.createReadStream(filePath),
        Key: key
    };

    return new Promise((resolve, reject) => {
        s3.putObject(params, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ s3Key: key });
            }
        });
    });
};

module.exports = upload;
