import * as path from 'path';
import * as fs from 'fs';

import { parseSpec } from './parser';
import { writeFeature } from './writer';

import { buildModel } from './builders/model.builder';
import { buildComponent } from './builders/component.builder';
import { buildService } from './builders/service.builder';
import { buildTemplate } from './builders/template.builder';
import { buildRoutes } from './builders/routes.builder';
import { buildComponentSpec } from './builders/unitedtest.builder';
import { updateMainRoutes } from './builders/updateMainRoutes.builder';
import { buildStyle } from './builders/style.builder';

const FEATURES_PATH = path.resolve(__dirname, '../../ai-driven-sdd-angular/specs/features');

const OUTPUT_BASE = path.resolve(__dirname, '../../src/app/features');

function main() {
    const files = fs
        .readdirSync(FEATURES_PATH)
        .filter(f => f.endsWith('.feature.spec.md'));

    files.forEach(file => {
        const fullPath = path.join(FEATURES_PATH, file);
        const spec = parseSpec(fullPath);

        const featurePath = path.join(OUTPUT_BASE, spec.name);

        // // 🔁 Evitar overwrite
        // if (fs.existsSync(featurePath)) {
        //     console.log(`⚠️ Feature ${spec.name} já existe. Pulando...`);
        //     return;
        // }

        console.log(`🚀 Gerando feature: ${spec.name}`);

        // 🧠 Builders
        const model = buildModel(spec);
        const component = buildComponent(spec);
        const service = buildService(spec);
        const template = buildTemplate(spec);
        const routes = buildRoutes(spec);
        const unitTest = buildComponentSpec(spec);
        const style = buildStyle(spec);

        // 📝 Escrita de arquivos
        writeFeature(OUTPUT_BASE, spec.name, {
            [`${spec.name}.model.ts`]: model,
            [`${spec.name}.service.ts`]: service,
            [`${spec.name}.component.ts`]: component,
            [`${spec.name}.component.html`]: template,
            [`${spec.name}.component.scss`]: style,
            [`${spec.name}.routes.ts`]: routes,
            [`${spec.name}.component.spec.ts`]: unitTest
        });

        // 🔄 Atualiza app.routes.ts automaticamente
        updateMainRoutes(spec);

        console.log(`✅ Feature gerada com sucesso: ${spec.name}`);
    });
}

main();