import { FeatureSpec } from '../parser';

export function buildComponent(spec: FeatureSpec): string {
    const formControls = spec.fields
        .map(f => `      ${f.name}: ['']`)
        .join(',\n');

    return `
import { FormBuilder, FormGroup } from '@angular/forms';

export class ${spec.name.replace('-', '')}Component {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
${formControls}
    });
  }
}
`;
}