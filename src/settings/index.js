const settings = require('./settings');
const defaultSettings = require('./defaultSettings');

const resolvedSettings = {...defaultSettings, ...settings};

module.exports = resolvedSettings;
