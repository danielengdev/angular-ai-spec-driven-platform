"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSpec = parseSpec;
const fs = __importStar(require("fs"));
function parseSpec(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const nameMatch = content.match(/# Feature:\s*(.+)/);
    const name = nameMatch ? nameMatch[1].trim().toLowerCase().replace(/\s+/g, '-') : 'unknown';
    const className = name
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
    const constantName = className; // Using PascalCase for route constants
    // Parse Inputs
    const inputsSection = content.split('## Inputs')[1] || '';
    const inputsLines = inputsSection.split('\n');
    const inputsEndIndex = inputsLines.findIndex(line => line.trim().startsWith('##') || line.trim().startsWith('---'));
    const fieldLines = inputsEndIndex !== -1 ? inputsLines.slice(0, inputsEndIndex) : inputsLines;
    const fields = fieldLines
        .filter(l => l.trim().startsWith('-'))
        .map(line => {
        const [name, type] = line.replace('-', '').split(':').map(v => v.trim());
        return { name, type };
    });
    // Parse API Contract
    let api;
    const apiSectionParts = content.split('## Contrato de API');
    if (apiSectionParts.length > 1) {
        const apiSection = apiSectionParts[1];
        const methodMatch = apiSection.match(/(POST|GET|PUT|DELETE|PATCH)\s+(\/[^\s]+)/);
        if (methodMatch) {
            const method = methodMatch[1];
            const endpoint = methodMatch[2];
            const requestMatch = apiSection.match(/Request:\s*{([^}]+)}/s);
            const responseMatch = apiSection.match(/Response:\s*{([^}]+)}/s);
            const requestFields = requestMatch
                ? requestMatch[1].split(',').map(s => s.trim()).filter(s => s)
                : [];
            const responseFields = responseMatch
                ? responseMatch[1].split(',').map(s => s.trim()).filter(s => s)
                : [];
            api = { method, endpoint, requestFields, responseFields };
        }
    }
    // Parse Validation Rules
    const validationRules = {};
    const validationSectionParts = content.split('## Regras de Validação');
    if (validationSectionParts.length > 1) {
        const validationSection = validationSectionParts[1].split('##')[0];
        const lines = validationSection.split('\n');
        let currentField = '';
        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('- ') && trimmed.endsWith(':')) {
                currentField = trimmed.replace('- ', '').replace(':', '').trim();
                validationRules[currentField] = [];
            }
            else if (trimmed.startsWith('- ') && currentField) {
                validationRules[currentField].push(trimmed.replace('- ', '').trim());
            }
        });
    }
    return { name, className, constantName, fields, api, validationRules };
}
