const doBackup = require('./backup');
const uploadToS3 = require('./aws/s3');
const { sendMetric } = require('./aws/cloud-watch');
const settings = require('./settings/settings');
const cleanup = require('./cleanup');
const logger = require('./log');

const CronJob = require('cron').CronJob;

const execute = async () => {
    logger.info('--- Starting execution ---');
    try {
        const { dumpPath } = await doBackup();

        logger.info(`Backup file generated: ${dumpPath}`);

        const { s3Key } = await uploadToS3({ filePath: dumpPath });

        logger.info(`Backup file uploaded to S3: ${s3Key}`);
    } catch (error) {
        logger.error('Error executing backup routine');
        logger.error(error);

        await sendMetric('BackupFailed');

        return;
    }

    if (settings.cron) {
        const deleteFiles = await cleanup();

        deleteFiles.forEach(file => {
            logger.info(`Old dump deleted: ${file}`);
        });

        await sendMetric('BackupSuccessful');
    }

    logger.info('--- Finishing execution ---');
};

if (settings.cron) {
    logger.info('Registering cron job');
    new CronJob(settings.cron, execute, null, true);
} else {
    logger.info('One time execution');
    execute();
}
