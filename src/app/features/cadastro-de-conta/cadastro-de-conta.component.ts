
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CadastroDeContaService, CadastroDeContaRequest } from './cadastro-de-conta.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-de-conta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-de-conta.component.html',
  styleUrls: ['./cadastro-de-conta.component.scss']
})
export class CadastroDeContaComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CadastroDeContaService
  ) {
    this.form = this.fb.group({
    fullName: ['', { validators: [Validators.required, Validators.minLength(3)] }],
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required, Validators.minLength(8)] }],
    confirmPassword: [''],
    acceptTerms: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const request: CadastroDeContaRequest = this.form.value;
      this.service.create(request).subscribe({
        next: (response) => console.log('Success', response),
        error: (err) => console.error('Error', err)
      });
    }
  }
}
