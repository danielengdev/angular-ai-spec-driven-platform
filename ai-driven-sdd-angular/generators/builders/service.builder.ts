import { FeatureSpec } from '../parser';

export function buildService(spec: FeatureSpec): string {
  const api = spec.api;
  let imports = `import { Injectable } from '@angular/core';`;
  let interfaces = '';
  let methods = '';
  let constructor = 'constructor() {}';

  if (api) {
    imports += `
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';`;

    const reqFields = api.requestFields.map(f => `  ${f}: any;`).join('\n');
    const resFields = api.responseFields.map(f => `  ${f}: any;`).join('\n');

    interfaces = `
export interface ${spec.className}Request {
${reqFields}
}

export interface ${spec.className}Response {
${resFields}
}
`;

    constructor = `constructor(private http: HttpClient) {}`;

    const methodName = api.method === 'POST' ? 'create' : 'getData';
    const methodArgs = api.method === 'POST' || api.method === 'PUT' ? `data: ${spec.className}Request` : '';
    const httpArgs = api.method === 'POST' || api.method === 'PUT' ? `'${api.endpoint}', data` : `'${api.endpoint}'`;

    methods = `
  ${methodName}(${methodArgs}): Observable<${spec.className}Response> {
    return this.http.${api.method.toLowerCase()}<${spec.className}Response>(${httpArgs});
  }
`;
  }

  return `
${imports}
${interfaces}
@Injectable({
  providedIn: 'root'
})
export class ${spec.className}Service {

  ${constructor}
${methods}
}
`;
}