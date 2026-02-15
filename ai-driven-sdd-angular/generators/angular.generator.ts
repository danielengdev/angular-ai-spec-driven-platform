import * as path from 'path';
import * as fs from 'fs';
import { parseSpec } from './parser';
import { buildModel } from './builders/model.builder';
import { buildComponent } from './builders/component.builder';
import { writeFeature } from './writer';

const FEATURES_PATH = path.join(__dirname, '../specs/features');
const OUTPUT_BASE = path.join(__dirname, '../app/features');

function main() {
    const files = fs.readdirSync(FEATURES_PATH).filter(f => f.endsWith('.feature.spec.md'));

    files.forEach(file => {
        const fullPath = path.join(FEATURES_PATH, file);
        const spec = parseSpec(fullPath);

        const model = buildModel(spec);
        const component = buildComponent(spec);

        writeFeature(OUTPUT_BASE, spec.name, {
      `${spec.name}.model.ts`: model,
            `${spec.name}.component.ts`: component
    });

    console.log(`Feature gerada: ${spec.name}`);
});
}

main();