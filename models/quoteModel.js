const fs = require('fs');
const path = require('path');

// Define the path to the quotes JSON file
const filePath = path.join(__dirname, '../models/quotes.json');

// Function to read and parse the quotes from the JSON file
function getQuotes() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    } else {
        return "The file doesn't exist.";
    }
}

// Function to save quotes to the JSON file
function saveQuotes(quotes) {
    const jsonData = JSON.stringify(quotes, null, 2);

    if (jsonData) {
        fs.writeFileSync(filePath, jsonData, 'utf8');
        return true;
    } else {
        console.error('Failed to serialize quotes data');
        return false;
    }
}

// Export the functions for use in the controller
module.exports = {
    getQuotes,
    saveQuotes,
};
