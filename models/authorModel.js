const fs = require('fs');
const path = require('path');

// Define the path to the authors JSON file
const filePath = path.join(__dirname, '../models/authors.json');

// Function to read and parse the authors from the JSON file
function getAuthors() {
    // if (fs.existsSync(filePath)) {
    //     const data = fs.readFileSync(filePath, 'utf8');
    //     if (data) {
    //         return JSON.parse(data);
    //     } else {
    //         return [];
    //     }
    // } else {
    //     return [];
    // }
}

// Function to save authors to the JSON file
function saveAuthors(authors) {
    const jsonData = JSON.stringify(authors, null, 2);

    if (jsonData) {
        fs.writeFileSync(filePath, jsonData, 'utf8');
        return true;
    } else {
        console.error('Failed to serialize authors data');
        return false;
    }
}

// Export the functions for use in the controller
module.exports = {
    getAuthors,
    saveAuthors,
};
