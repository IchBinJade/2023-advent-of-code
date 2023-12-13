import fs from "fs"

export function getArrayFromFile(path) {
    return fs.readFileSync(path, 'utf8').split('\n');
}