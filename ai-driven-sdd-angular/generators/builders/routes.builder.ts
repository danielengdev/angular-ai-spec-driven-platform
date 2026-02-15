export function buildRoutes(spec: any): string {
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