import ollama from 'ollama';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

// Importações utilizando os aliases do tsconfig
import { AngularGenerator } from '../ai-driven-sdd-angular/generators/angular.generator';
import { validateEngine } from '../ai-driven-sdd-angular/generators/engine.test';

/** * Cores para o terminal para facilitar o monitoramento do Agente 
 */
const COLORS = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
    red: "\x1b[31m",
    magenta: "\x1b[35m",
};

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q: string) => new Promise<string>(res => rl.question(`${COLORS.green}❯ ${COLORS.reset}`, res));

/**
 * TOOLS (Definição estrita das capacidades do Agente)
 */
const agentTools = {
    read_project_file: (args: { relativePath: string }): string => {
        try {
            const targetPath = path.resolve(process.cwd(), args.relativePath);
            return fs.readFileSync(targetPath, 'utf-8');
        } catch (e: any) {
            return `Erro ao ler: ${e.message}`;
        }
    },

    validate_spec_syntax: (args: { specPath: string }): string => {
        console.log(`${COLORS.cyan}🔍 Validando spec: ${args.specPath}${COLORS.reset}`);
        const result = validateEngine(args.specPath);

        if (result.success) {
            return `✅ Spec válida. Nome: ${result.data?.name}, Classe: ${result.data?.className}`;
        }
        return `❌ Erro de sintaxe: ${result.error}. O Markdown precisa ser ajustado.`;
    },

    run_angular_generator: async (args: { specPath: string }): Promise<string> => {
        try {
            console.log(`${COLORS.yellow}🏗️  Iniciando builders para: ${args.specPath}${COLORS.reset}`);
            const gen = new AngularGenerator();
            const fullPath = path.resolve(process.cwd(), args.specPath);
            gen.generateFeature(fullPath);
            return `🚀 Geração concluída com sucesso (Component, Service, Model, Template, Scss, Spec e Routes).`;
        } catch (e: any) {
            return `❌ Falha crítica no pipeline: ${e.message}`;
        }
    },

    write_spec_file: (args: { specPath: string, content: string }): string => {
        try {
            const fullPath = path.resolve(process.cwd(), args.specPath);
            const dir = path.dirname(fullPath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

            fs.writeFileSync(fullPath, args.content, 'utf-8');
            return `📝 Spec atualizada com sucesso em ${args.specPath}`;
        } catch (e: any) {
            return `Erro ao gravar: ${e.message}`;
        }
    }
};

const SYSTEM_PROMPT = `
Você é um Arquiteto de Software especialista em Angular 21, Signals e Native Federation.
Você opera o motor SDD em 'ai-driven-sdd-angular'.

FLUXO OBRIGATÓRIO:
1. Sempre analise arquivos existentes com 'read_project_file'.
2. Valide qualquer mudança em specs com 'validate_spec_syntax'.
3. Só gere código com 'run_angular_generator' após validação bem-sucedida.
4. Use rigorosamente as regras de 'specs/_context/architecture-principles.md'.
`;

async function run() {
    console.clear();
    console.log(`${COLORS.bright}${COLORS.magenta}🤖 AGENTE SDD-ANGULAR ATIVO (Ollama)${COLORS.reset}`);
    console.log(`Padrão: Angular 21 | Native Federation | Signals\n`);

    const messages: any[] = [{ role: 'system', content: SYSTEM_PROMPT }];

    while (true) {
        const query = await ask("");
        if (query.toLowerCase() === 'sair') break;

        messages.push({ role: 'user', content: query });

        let processing = true;
        while (processing) {
            const response = await ollama.chat({
                model: 'qwen2.5-coder:7b',
                messages: messages,
                tools: [
                    // ... suas definições de tools aqui ...
                ]
            });

            // Adiciona a resposta da IA ao histórico (essencial para o contexto)
            messages.push(response.message);

            if (response.message.tool_calls && response.message.tool_calls.length > 0) {
                for (const call of response.message.tool_calls) {
                    const toolName = call.function.name as keyof typeof agentTools;
                    const toolArgs = call.function.arguments;

                    console.log(`${COLORS.yellow}⚙️  Executando: ${toolName}...${COLORS.reset}`);

                    // EXECUTA A FUNÇÃO REAL
                    const output = await (agentTools[toolName] as any)(toolArgs);

                    console.log(`${COLORS.green}📥 Resultado: ${output}${COLORS.reset}`);

                    // ENVIA O RESULTADO DE VOLTA PARA A IA
                    messages.push({
                        role: 'tool',
                        content: String(output),
                        name: toolName
                    });
                }
                // Após enviar os resultados das tools, o loop continua 
                // para que a IA possa dar a resposta final em texto.
            } else {
                // Se não houver mais chamadas de ferramentas, exibe a fala final da IA
                console.log(`\n🤖 ${COLORS.bright}${response.message.content}${COLORS.reset}`);
                processing = false;
            }
        }
    }
    rl.close();
}

run();