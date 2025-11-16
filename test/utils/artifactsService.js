import fs from 'fs';
import path from 'path';
import FileUtils from './fileUtils.js';

class ArtifactsService {
    constructor(opts = {}) {
        this.baseDir = path.join(process.cwd(), opts.baseDir || 'artifacts');
        this.screenshotDir = path.join(this.baseDir, opts.screenshotDir || 'screenshots');
        this.logsDir = path.join(this.baseDir, opts.logsDir || 'logs');
        this.maxArtifacts = typeof opts.maxArtifacts === 'number' ? opts.maxArtifacts : 3;  // Set max amount of artifacts

        try {
            FileUtils.ensureDir(this.screenshotDir);
            FileUtils.ensureDir(this.logsDir);
            console.log(`ArtifactsService init: base=${this.baseDir}`);
        } catch (e) {
            console.error('ArtifactsService init error:', e);
        }
    }

    _safeTestTitle(testTitle = 'unknown_test') {
        if (typeof testTitle !== 'string') testTitle = String(testTitle);
        return testTitle.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-]/g, '');
    }

    generateFileName(testTitle, extension) {
        const safeTitle = this._safeTestTitle(testTitle);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        return `${safeTitle}_${timestamp}.${extension}`;
    }

    async saveScreenshot(testTitle) {
        const fileName = this.generateFileName(testTitle, 'png');
        const filePath = path.join(this.screenshotDir, fileName);

        try {
            console.log('Saving screenshot to', filePath);
            if (typeof global.browser === 'undefined') {
                throw new Error('global.browser is undefined — cannot take screenshot');
            }
            await browser.saveScreenshot(filePath);
            console.log('Screenshot saved:', filePath);
            FileUtils.enforceLimit(this.screenshotDir, this.maxArtifacts);
        } catch (e) {
            console.error('Error saving screenshot:', e);
            try {
                fs.appendFileSync(path.join(this.baseDir, 'artifact_errors.log'),
                    `screenshot error for ${testTitle}: ${e.stack || e}\n`);
            } catch (ee) {
                console.error('Failed to write artifact_errors.log', ee);
            }
        }
    }

    saveErrorLog(testTitle, error) {
        const fileName = this.generateFileName(testTitle, 'txt');
        const filePath = path.join(this.logsDir, fileName);

        try {
            const logContent = [
                '-------- ERROR LOG --------',
                `Test: ${testTitle}`,
                `Time: ${new Date().toISOString()}`,
                '',
                'Message:',
                error && error.message ? error.message : String(error),
                '',
                'Stack:',
                error && error.stack ? error.stack : 'no stack available'
            ].join('\n');

            fs.writeFileSync(filePath, logContent);
            console.log('Error log saved:', filePath);
            FileUtils.enforceLimit(this.logsDir, this.maxArtifacts);
        } catch (e) {
            console.error('Error saving error log:', e);
            try {
                fs.appendFileSync(path.join(this.baseDir, 'artifact_errors.log'),
                    `log error for ${testTitle}: ${e.stack || e}\n`);
            } catch (ee) {
                console.error('Failed to write artifact_errors.log', ee);
            }
        }
    }

    async saveArtifactsOnFail(testObj = {}) {
        try {
            if (!testObj || !testObj.error) {
                console.log('saveArtifactsOnFail called but no error present on testObj');
                return;
            }
            const title = testObj.title || 'unknown_test';
            console.log('saveArtifactsOnFail for', title);

            await this.saveScreenshot(title);
            this.saveErrorLog(title, testObj.error);
        } catch (e) {
            console.error('Unhandled error in saveArtifactsOnFail:', e);
            try {
                fs.appendFileSync(path.join(this.baseDir, 'artifact_errors.log'),
                    `saveArtifactsOnFail unhandled: ${e.stack || e}\n`);
            } catch (ee) {
                console.error('Failed to write artifact_errors.log', ee);
            }
        }
    }
}

export default new ArtifactsService();
