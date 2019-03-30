const doBackup = require('./backup');


const execute = async () => {
    const { dumpPath } = await doBackup();

    console.log(`backup executed: ${dumpPath}`);
};

execute();

