import events from 'events';
import fs from 'fs';
import readline from 'readline';
export async function readFirstLine(filePath) {
    const stream = fs.createReadStream(filePath);
    const reader = readline.createInterface({ input: stream });
    const contents = new Promise((resolve, reject) => {
        reader.on('error', reject);
        reader.on('line', (line) => {
            reader.close();
            resolve(line);
        });
    });
    contents.finally(() => stream.close());
    return await contents;
}
export async function mapLines(filePath, callback) {
    const stream = fs.createReadStream(filePath);
    const reader = readline.createInterface({ input: stream });
    let lineNumber = 1;
    reader.on('error', (error) => {
        throw error;
    });
    reader.on('line', (contents) => {
        callback(lineNumber++, contents);
    });
    await events.once(reader, 'close');
}
export async function readLine(filePath, line) {
    const stream = fs.createReadStream(filePath);
    const reader = readline.createInterface({ input: stream });
    let lineNumber = 1;
    const contents = new Promise((resolve, reject) => {
        reader.on('error', reject);
        reader.on('line', (contents) => {
            if (lineNumber++ === line) {
                reader.close();
                resolve(contents);
            }
        });
    });
    contents.finally(() => stream.close());
    return await contents;
}
//# sourceMappingURL=file.js.map