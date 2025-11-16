import fs from 'fs';
import path from 'path';

export default class FileUtils {
    static ensureDir(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    static getFilesSorted(dirPath) {
        const files = fs.readdirSync(dirPath);
        return files
            .map(file => ({
                name: file,
                time: fs.statSync(path.join(dirPath, file)).mtime.getTime()
            }))
            .sort((a, b) => a.time - b.time);
    }

    static enforceLimit(dirPath, maxFiles) {
        const files = this.getFilesSorted(dirPath);
        while (files.length > maxFiles) {
            const fileToDelete = files.shift();  
            fs.unlinkSync(path.join(dirPath, fileToDelete.name));
        }
    }
}
