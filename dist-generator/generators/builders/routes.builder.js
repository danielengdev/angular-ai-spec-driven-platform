"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRoutes = buildRoutes;
function buildRoutes(spec) {
    return `
import { Routes } from '@angular/router';
import { ${spec.className}Component } from './${spec.name}.component';

export const ${spec.constantName}Routes: Routes = [
  {
    path: '',
    component: ${spec.className}Component
  }
];
`;
}
