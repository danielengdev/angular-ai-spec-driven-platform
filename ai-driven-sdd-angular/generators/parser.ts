import * as fs from 'fs';

export interface FeatureSpec {
    name: string;
    fields: { name: string; type: string }[];
}

export function parseSpec(filePath: string): FeatureSpec {
    const content = fs.readFileSync(filePath, 'utf-8');

    const nameMatch = content.match(/# Feature:\s*(.+)/);
    const name = nameMatch ? nameMatch[1].trim().toLowerCase().replace(/\s+/g, '-') : 'unknown';

    const section = content.split('## Inputs')[1];

    const fields = section
        .split('\n')
        .filter(l => l.trim().startsWith('-'))
        .map(line => {
            const [name, type] = line.replace('-', '').split(':').map(v => v.trim());
            return { name, type };
        });

    return { name, fields };
}