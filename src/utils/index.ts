import { readdirSync, statSync, readFileSync } from 'fs'
import { join, extname } from 'path'
import { ArticlesType } from "../types"

// Function to read text files into a JSON object
function readTextFilesToJson(dir: string): ArticlesType {
    const files = readdirSync(dir);
    const fileContents: ArticlesType = {};

    files.forEach((file) => {
        const filePath = join(dir, file);
        if (statSync(filePath).isFile() && extname(file) === '.md') {
            const content = readFileSync(filePath, 'utf-8');
            fileContents[file] = content;
        }
    });

    return fileContents;
}

// Example usage
// const dirPath = './texts'; // Directory containing the text files
// const jsonResult = readTextFilesToJson(dirPath);
// console.log(JSON.stringify(jsonResult, null, 2));

export default readTextFilesToJson