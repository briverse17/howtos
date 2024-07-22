const fs = require('fs')
const path = require('path')

const directory = '.'
const contentsFile = './contents.json'

function updateContents(directory, contentFile) {
    // Read existing JSON file or create an empty array if it doesn't exist
    const files = Object()
    if (fs.existsSync(contentFile)) {
        Object.assign(files, JSON.parse(fs.readFileSync(contentFile, 'utf-8')))
    }

    // Read the directory and get all file names
    const newFiles = Object()
    fs.readdirSync(directory).map((file) => {
        if (file.endsWith(".md") && !Object.hasOwn(files, file)) {
            content = fs.readFileSync(path.join(directory, file), 'utf-8').split('\n').shift()
            newFiles[file] = content
        }
    })

    // // Merge existing file list with new file list
    const updatedFiles = { ...files, ...newFiles }

    // Write the updated file list back to JSON file
    fs.writeFileSync(contentFile, JSON.stringify(updatedFiles, null, 2))

    console.log(`Updated ${contentFile} with ${Object.keys(updatedFiles).length} files from ${directory}`)
}

try {
    // Scan the directory and update files.json
    updateContents(directory, contentsFile)

    // Stage the updated files.json
    execSync(`git add ${contentsFile}`)

    // console.log('Pre-commit hook completed successfully.');
} catch (error) {
    console.error('Error in pre-commit hook:', error)
    process.exit(1)
}