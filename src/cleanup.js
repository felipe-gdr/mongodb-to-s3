const fs = require('fs');
const path = require('path');
const settings = require('./settings/settings');

const listFiles = dir =>
    new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });

const getCreationDate = file =>
    new Promise((resolve, reject) => {
        fs.stat(file, (err, stat) => {
            if (err) {
                reject(err);
            } else {
                resolve(new Date(stat.ctime));
            }
        });
    });

const deleteFile = file =>
    new Promise((resolve, reject) => {
        fs.unlink(file, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

const cleanupOldFiles = async () => {
    const { targetDir, localRetentionInDays } = settings;

    const files = await listFiles(targetDir);

    const threshold =
        new Date().getTime() - localRetentionInDays * 24 * 60 * 60 * 1000;

    const promises = files.map(file => path.join(targetDir, file)).map(async file => {
        const creationDate = await getCreationDate(file);

        if (creationDate < threshold) {
            await deleteFile(file);

            return file;
        }
    });

    return Promise.all(promises).then(files => files.filter(Boolean));
};

module.exports = cleanupOldFiles;
