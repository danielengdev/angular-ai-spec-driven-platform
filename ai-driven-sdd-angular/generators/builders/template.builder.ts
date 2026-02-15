import { FeatureSpec } from '../parser';

export function buildTemplate(spec: FeatureSpec): string {
  const fields = spec.fields.map(field => {
    const label = field.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    let inputType = 'text';

    if (field.type === 'boolean') {
      inputType = 'checkbox';
    } else if (field.name.toLowerCase().includes('email')) {
      inputType = 'email';
    } else if (field.name.toLowerCase().includes('password')) {
      inputType = 'password';
    }

    return `
  <div class="field">
    <label for="${field.name}">${label}</label>
    <input id="${field.name}" type="${inputType}" formControlName="${field.name}" />
  </div>`;
  }).join('\n');

  return `
<h2>${spec.name}</h2>

<form [formGroup]="form">
${fields}

  <button type="submit" [disabled]="form.invalid">Cadastrar</button>
</form>
`;
}