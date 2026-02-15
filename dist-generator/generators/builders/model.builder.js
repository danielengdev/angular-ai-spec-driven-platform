"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildModel = buildModel;
function buildModel(spec) {
    const interfaceName = spec.name
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join('');
    const fields = spec.fields
        .map(f => `  ${f.name}: ${f.type};`)
        .join('\n');
    return `export interface ${interfaceName} {\n${fields}\n}`;
}
