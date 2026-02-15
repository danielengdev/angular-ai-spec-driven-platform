
const { parseSpec } = require('./dist-generator/generators/parser');
const path = require('path');

const specFile = path.join(process.cwd(), 'ai-driven-sdd-angular/specs/features/cadastro-conta.feature.spec.md');
console.log('Parsing:', specFile);

try {
    const spec = parseSpec(specFile);
    console.log('API:', JSON.stringify(spec.api, null, 2));
} catch (e) {
    console.error(e);
}
