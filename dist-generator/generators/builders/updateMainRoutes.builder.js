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
exports.updateMainRoutes = updateMainRoutes;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
function updateMainRoutes(spec) {
    const routesPath = path.resolve(__dirname, '../../../src/app/app.routes.ts');
    const routeImport = `import { ${spec.className}Component } from './features/${spec.name}/${spec.name}.component';`;
    let content = fs.readFileSync(routesPath, 'utf-8');
    const routeCheckRegex = new RegExp(`path:\\s*['"]${spec.name}['"]`);
    if (!routeCheckRegex.test(content)) {
        content = routeImport + '\n' + content;
        content = content.replace('export const routes: Routes = [', `export const routes: Routes = [
  {
    path: '${spec.name}',
    loadChildren: () => import('./features/${spec.name}/${spec.name}.routes')
      .then(m => m.${spec.constantName}Routes)
  },`);
        fs.writeFileSync(routesPath, content);
    }
}
