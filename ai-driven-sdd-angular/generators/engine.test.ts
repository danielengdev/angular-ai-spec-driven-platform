import { parseSpec } from './parser';
import * as path from 'path';

/**
 * Função de validação que o Agente utilizará
 */
export function validateEngine(specRelativePath: string) {
    const specFile = path.resolve(process.cwd(), specRelativePath);

    try {
        const spec = parseSpec(specFile);
        return {
            success: true,
            data: {
                name: spec.name,
                className: spec.className,
                fields: spec.fields
            }
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        };
    }
}

// Bloco de teste para execução manual (seu repro_parser original)
if (require.main === module) {
    const defaultSpec = 'ai-driven-sdd-angular/specs/features/cadastro-conta.feature.spec.md';
    console.log('🧪 Iniciando teste do motor de parsing...');

    const result = validateEngine(defaultSpec);
    if (result.success) {
        console.log('✅ Spec válida:', result.data?.name);
        console.log('Fields:', JSON.stringify(result.data?.fields, null, 2));
    } else {
        console.error('❌ Erro na Spec:', result.error);
    }
}