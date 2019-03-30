# MongoDB to S3
A simple node script that will generate a dump of a MongoDB database and upload it to an S3 bucket


## Configuration
Create a file `src/settings/settings.js` based on `src/settings/settings.template.js` and modify the options according to your database and AWS environments.

## Executing
Run `node src/index.js`.

### Scheduling a cron job
To schedule a cron job add a `cron` property to the `src/settings.js` file:
```$js
const settings = {
    cron: '0 * * * * *', // this will execute the routine on the first second of every minute.
    // ... other fields
};
```

and then run `node src/index.js`;
