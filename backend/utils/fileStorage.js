const path = require('path');
const fs = require('fs');

const getDataFilePath = (filename) => path.join(__dirname, '..', 'data', filename);

module.exports = { getDataFilePath };
