const path = require('path');
const fs = require('fs');
const config = require('./settings/config.json');
const processFile = require('./utils/fileManager');

try {

    console.clear(); console.log('Analysis results:\n');

    // Get file name from console (ej. 'D:\\gubiarpa\\file.txt')
    let fullName = path.join(config.inputPath, process.argv[2]);

    // Read contents of the file
    fs.readFile(fullName, 'utf8', (err, content) => {
        if (err) {
            console.log(err);
            return;
        }
        processFile(config, content);
    });

} catch (err) {
    console.error(err);
}