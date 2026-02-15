import * as path from 'path';
import * as fs from 'fs';

export function updateMainRoutes(spec: any) {
    const routesPath = path.resolve(__dirname, '../../../src/app/app.routes.ts');

    const routeImport = `import { ${spec.className}Component } from './features/${spec.name}/${spec.name}.component';`;

    let content = fs.readFileSync(routesPath, 'utf-8');
    const routeCheckRegex = new RegExp(`path:\\s*['"]${spec.name}['"]`);

    if (!routeCheckRegex.test(content)) {
        content = routeImport + '\n' + content;

        content = content.replace(
            'export const routes: Routes = [',
            `export const routes: Routes = [
  {
    path: '${spec.name}',
    loadChildren: () => import('./features/${spec.name}/${spec.name}.routes')
      .then(m => m.${spec.constantName}Routes)
  },`
        );

        fs.writeFileSync(routesPath, content);
    }
}