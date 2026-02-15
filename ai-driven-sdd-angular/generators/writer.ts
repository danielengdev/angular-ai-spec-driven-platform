import * as fs from 'fs';
import * as path from 'path';

export function writeFeature(basePath: string, featureName: string, files: Record<string, string>) {
    const featurePath = path.join(basePath, featureName);

    if (!fs.existsSync(featurePath)) {
        fs.mkdirSync(featurePath, { recursive: true });
    }

    Object.entries(files).forEach(([fileName, content]) => {
        fs.writeFileSync(path.join(featurePath, fileName), content);
    });
}