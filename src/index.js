const fs = require('fs');
const config = require('./config/config.json');
const readRaw = require('./utils/fileManager');

try {console.log(process.argv); return;

    // Get file name from console (ej. 'D:\\gubiarpa\\file.txt')
    let fileName = process.argv[2];

    // Read contents of the file
    fs.readFile(fileName, 'utf8', (err, content) => {
        if (err) console.log(err);
        console.log(readRaw(content));
    });

} catch (err) {
    console.error(err);
}