const fs = require('fs')
const path = require('path')

const directoryPath = '.'
const jsonFilePath = './contents.json'

// Read existing JSON file or create an empty array if it doesn't exist
const files = Object()
if (fs.existsSync(jsonFilePath)) {
    Object.assign(files, JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8')))
}

// Read the directory and get all file names
const newFiles = Object()
fs.readdirSync(directoryPath).map((file) => {
    if (file.endsWith(".md") && !Object.hasOwn(files, file)) {
        content = fs.readFileSync(path.join(directoryPath, file), 'utf-8').split('\n').shift()
        newFiles[file] = content
    }
})

// // Merge existing file list with new file list
const updatedFiles = { ...files, ...newFiles }

// Write the updated file list back to JSON file
fs.writeFileSync(jsonFilePath, JSON.stringify(updatedFiles, null, 2))

console.log(`Updated ${jsonFilePath} with ${Object.keys(updatedFiles).length} files from ${directoryPath}`)
