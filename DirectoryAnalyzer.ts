import * as fs from 'fs';
import * as path from 'path';
import { DirectoryReport } from './DirectoryReport';

export class DirectoryAnalyzer {
    analyze(dirPath: string): DirectoryReport {
        const report: DirectoryReport = {
            files: 0,
            directories: 0,
            totalSize: 0,
            extensions: {}
        };

        const walkSync = (currentPath: string) => {
            const items = fs.readdirSync(currentPath);
            
            for (const item of items) {
                const itemPath = path.join(currentPath, item);
                const stat = fs.statSync(itemPath);

                if (stat.isDirectory()) {
                    report.directories++;
                    walkSync(itemPath); 
                } else if (stat.isFile()) {
                    report.files++;
                    report.totalSize += stat.size;
                    
                    const ext = path.extname(item);
                    if (ext) {
                        report.extensions[ext] = (report.extensions[ext] || 0) + 1;
                    }
                }
            }
        };

        if (fs.existsSync(dirPath)) {
            walkSync(dirPath);
        } else {
            throw new Error(`Directory not found: ${dirPath}`);
        }

        return report;
    }
}