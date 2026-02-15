"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildComponent = buildComponent;
function buildComponent(spec) {
    const formControls = spec.fields
        .map(f => {
        const rules = spec.validationRules?.[f.name] || [];
        const validators = [];
        if (rules.some(r => r.includes('obrigatório'))) {
            validators.push('Validators.required');
        }
        if (rules.some(r => r.includes('mínimo'))) {
            const minLength = rules.find(r => r.includes('mínimo'))?.match(/\d+/)?.[0];
            if (minLength)
                validators.push(`Validators.minLength(${minLength})`);
        }
        if (f.name === 'email') {
            validators.push('Validators.email');
        }
        // Se não houver validadores, retorna apenas o campo simples
        if (validators.length === 0) {
            return `    ${f.name}: ['']`;
        }
        // Se houver, usa o objeto de configuração para evitar erro de assinatura
        return `    ${f.name}: ['', { validators: [${validators.join(', ')}] }]`;
    })
        .join(',\n');
    return `
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ${spec.className}Service, ${spec.className}Request } from './${spec.name}.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-${spec.name}',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './${spec.name}.component.html',
  styleUrls: ['./${spec.name}.component.scss']
})
export class ${spec.className}Component {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ${spec.className}Service
  ) {
    this.form = this.fb.group({
${formControls}
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const request: ${spec.className}Request = this.form.value;
      this.service.create(request).subscribe({
        next: (response) => console.log('Success', response),
        error: (err) => console.error('Error', err)
      });
    }
  }
}
`;
}
