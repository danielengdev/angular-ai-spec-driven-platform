
import { parseSpec } from './ai-driven-sdd-angular/generators/parser';
import * as path from 'path';

const specFile = path.join(process.cwd(), 'ai-driven-sdd-angular/specs/features/cadastro-conta.feature.spec.md');
console.log('Parsing spec file:', specFile);

try {
    const spec = parseSpec(specFile);
    console.log('Parsed Spec Name:', spec.name);
    console.log('Parsed Class Name:', spec.className);
    console.log('Parsed Constant Name:', spec.constantName);
    console.log('Parsed Fields:', JSON.stringify(spec.fields, null, 2));
} catch (error) {
    console.error('Error parsing spec:', error);
}
