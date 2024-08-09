const fs = require('fs');
const path = require('path');

// Define the path to the log file
const logFilePath = path.join(__dirname, '../logs/app.log');

// Function to log messages to the file
function log(message) {
    // Create a timestamp
    const timestamp = new Date().toISOString();

    // Format the log message
    const logMessage = `[${timestamp}] ${message}\n`;

    // Write the log message to the file
    if (fs.existsSync(logFilePath)) {
        fs.appendFileSync(logFilePath, logMessage, 'utf8');
    } else {
        fs.writeFileSync(logFilePath, logMessage, 'utf8');
    }
}

// Function to log an info message
function info(message) {
    log(`INFO: ${message}`);
}

// Function to log a warning message
function warn(message) {
    log(`WARN: ${message}`);
}

// Function to log an error message
function error(message) {
    log(`ERROR: ${message}`);
}

// Export the log functions
module.exports = {
    info,
    warn,
    error,
};
