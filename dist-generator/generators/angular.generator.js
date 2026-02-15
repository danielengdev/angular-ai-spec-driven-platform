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
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const parser_1 = require("./parser");
const writer_1 = require("./writer");
const model_builder_1 = require("./builders/model.builder");
const component_builder_1 = require("./builders/component.builder");
const service_builder_1 = require("./builders/service.builder");
const template_builder_1 = require("./builders/template.builder");
const routes_builder_1 = require("./builders/routes.builder");
const unitedtest_builder_1 = require("./builders/unitedtest.builder");
const updateMainRoutes_builder_1 = require("./builders/updateMainRoutes.builder");
const style_builder_1 = require("./builders/style.builder");
const FEATURES_PATH = path.resolve(__dirname, '../../ai-driven-sdd-angular/specs/features');
const OUTPUT_BASE = path.resolve(__dirname, '../../src/app/features');
function main() {
    const files = fs
        .readdirSync(FEATURES_PATH)
        .filter(f => f.endsWith('.feature.spec.md'));
    files.forEach(file => {
        const fullPath = path.join(FEATURES_PATH, file);
        const spec = (0, parser_1.parseSpec)(fullPath);
        const featurePath = path.join(OUTPUT_BASE, spec.name);
        // // 🔁 Evitar overwrite
        // if (fs.existsSync(featurePath)) {
        //     console.log(`⚠️ Feature ${spec.name} já existe. Pulando...`);
        //     return;
        // }
        console.log(`🚀 Gerando feature: ${spec.name}`);
        // 🧠 Builders
        const model = (0, model_builder_1.buildModel)(spec);
        const component = (0, component_builder_1.buildComponent)(spec);
        const service = (0, service_builder_1.buildService)(spec);
        const template = (0, template_builder_1.buildTemplate)(spec);
        const routes = (0, routes_builder_1.buildRoutes)(spec);
        const unitTest = (0, unitedtest_builder_1.buildComponentSpec)(spec);
        const style = (0, style_builder_1.buildStyle)(spec);
        // 📝 Escrita de arquivos
        (0, writer_1.writeFeature)(OUTPUT_BASE, spec.name, {
            [`${spec.name}.model.ts`]: model,
            [`${spec.name}.service.ts`]: service,
            [`${spec.name}.component.ts`]: component,
            [`${spec.name}.component.html`]: template,
            [`${spec.name}.component.scss`]: style,
            [`${spec.name}.routes.ts`]: routes,
            [`${spec.name}.component.spec.ts`]: unitTest
        });
        // 🔄 Atualiza app.routes.ts automaticamente
        (0, updateMainRoutes_builder_1.updateMainRoutes)(spec);
        console.log(`✅ Feature gerada com sucesso: ${spec.name}`);
    });
}
main();
