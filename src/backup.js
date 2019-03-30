const settings = require('./settings');
const fs = require('fs');
const exec = require('child_process').exec;

const defaultSettings = {
    targetDir: './dumps',
    mongodb: {
        user: '',
        password: '',
        host: 'locahost',
        port: 27017,
    },
};

const resolvedSettings = {...defaultSettings, ...settings};

const buildCmdOptions = ({
                             host,
                             port,
                             database,
                             user,
                             password,
                         }) => {
    const valuesArray = [host, port, database, user, password];
    const optsArray = ['--host', '--port', '--db', '--username', '--password'];

    return valuesArray
        .map((value, index) => value ? `${optsArray[index]} ${value}` : null)
        .filter(Boolean)
        .join(' ');
};

const doBackup = () => {
    const now = new Date();
    const dateString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;

    const {targetDir, mongodb} = resolvedSettings;

    const dumpPath = `${targetDir}/${mongodb.database}_${dateString}.gz`;

    const cmd = `mongodump ${buildCmdOptions(mongodb)} --gzip --archive=${dumpPath}`;

    return new Promise((resolve, reject) => {
        exec(cmd, error => {
            if (error) {
                reject(error);
            } else {
                resolve({dumpPath});
            }
        });
    });
};

module.exports = doBackup;
