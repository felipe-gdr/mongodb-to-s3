const path = require('path');
const settings = require('./settings/settings');
const defaultSettings = require('./settings/defaultSettings');
const exec = require('child_process').exec;

const resolvedSettings = { ...defaultSettings, ...settings };

const buildCmdOptions = ({ host, port, database, user, password }) => {
    const valuesArray = [host, port, database, user, password];
    const optsArray = ['--host', '--port', '--db', '--username', '--password'];

    return valuesArray
        .map((value, index) => (value ? `${optsArray[index]} ${value}` : null))
        .filter(Boolean)
        .join(' ');
};

const doBackup = () => {
    const now = new Date();
    const dateString = `${now.getFullYear()}-${now.getMonth() +
        1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;

    const { targetDir, mongodb } = resolvedSettings;

    const dumpPath = path.join(
        targetDir,
        `${mongodb.database}_${dateString}.gz`
    );

    const cmd = `mongodump ${buildCmdOptions(
        mongodb
    )} --gzip --archive=${dumpPath}`;

    return new Promise((resolve, reject) => {
        exec(cmd, error => {
            if (error) {
                reject(error);
            } else {
                resolve({ dumpPath });
            }
        });
    });
};

module.exports = doBackup;
