const AWS = require('aws-sdk');
const fs = require('fs');

const settings = require('./settings');

AWS.config.update({
    secretAccessKey: settings.aws.secretAccessKey,
    accessKeyId: settings.aws.accessKeyId,
    region: settings.aws.region,
});

const upload = ({filePath}) => {
    const s3 = new AWS.S3();

    const parts = filePath.split('/');
    const key = parts[parts.length - 1];

    const params = {
        Bucket: settings.aws.bucket,
        Body: fs.createReadStream(filePath),
        Key: key,
    };

    return new Promise((resolve, reject) => {
        s3.putObject(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

upload({ filePath: './dumps/mongodump_2019-3-30-14-14-45.gz' })
    .then(() => console.log('success!'))
    .catch(error => console.log(error));

module.exports = upload;
