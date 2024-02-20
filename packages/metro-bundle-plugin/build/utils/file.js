import events from 'events';
import fs from 'fs';
import readline from 'readline';
export async function readFirstLine(filePath) {
    const stream = fs.createReadStream(filePath);
    const reader = readline.createInterface({ input: stream });
    const line = new Promise((resolve, reject) => {
        reader.on('error', reject);
        reader.on('line', (line) => {
            reader.close();
            resolve(line);
        });
    });
    line.finally(() => stream.close());
    return await line;
}
export async function mapLines(filePath, callback) {
    const stream = fs.createReadStream(filePath);
    const reader = readline.createInterface({ input: stream });
    let index = 0;
    reader.on('error', (error) => {
        throw error;
    });
    reader.on('line', (line) => {
        callback(index++, line);
    });
    await events.once(reader, 'close');
}
//# sourceMappingURL=file.js.map