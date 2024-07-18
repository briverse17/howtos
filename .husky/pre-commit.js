const fs = require('fs');
const path = require('path');

const directoryPath = 'content';
const jsonFilePath = 'content/contents.json';

// Read existing JSON file or create an empty array if it doesn't exist
const files = Object();
if (fs.existsSync(jsonFilePath)) {
    // files = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
    Object.assign(files, JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8')));
}

// Read the directory and get all file names
fs.readdirSync(directoryPath).map((file) => {
    if (file.endsWith(".md") && Object.hasOwn(files, file)) {
        content = fs.readFileSync(path.join(directoryPath, file), 'utf-8')
        Object.assign(files, {...files, file: content})
    }
});


// // Merge existing file list with new file list
// const updatedFileList = Array.from(new Set([...fileList, ...files]));

// Write the updated file list back to JSON file
fs.writeFileSync(jsonFilePath, JSON.stringify(files, null, 2));

console.log(`Updated ${jsonFilePath} with ${files.length} files from ${directoryPath}`);
