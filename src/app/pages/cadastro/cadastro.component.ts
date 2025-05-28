import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms'; // Adicionado FormBuilder, FormGroup, Validators, etc.
import { HttpClient } from '@angular/common/http'; // Adicionado HttpClient
import { CommonModule } from '@angular/common'; // Para diretivas como *ngIf, ngClass
import { ReactiveFormsModule } from '@angular/forms'; // Para formulários reativos

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card'; // Para um visual de card
import { ToastModule } from 'primeng/toast'; // Para feedback ao usuário
import { MessageService } from 'primeng/api'; // Para o Toast

// Validador customizado para senhas
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  standalone: true, // Se for standalone, importe os módulos aqui
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService] // Adicionar MessageService para o Toast
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, { validators: passwordMatchValidator });
  }

  get f() { return this.cadastroForm.controls; }

  onSubmit() {
    if (this.cadastroForm.invalid) {
      // Marcar todos os campos como tocados para exibir erros
      Object.values(this.cadastroForm.controls).forEach(control => {
        control.markAsTouched();
      });
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Por favor, preencha todos os campos corretamente.' });
      return;
    }

    this.loading = true;
    const { email, password, acceptTerms } = this.cadastroForm.value;
    const userData = { email, password, acceptTerms };

    // Substitua '/api/auth/register' pelo seu endpoint real de backend
    this.http.post('/api/auth/register', userData).subscribe({
      next: (response) => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Conta criada com sucesso!' });
        this.cadastroForm.reset();
        // Adicionar redirecionamento ou outra ação aqui
      },
      error: (error) => {
        this.loading = false;
        console.error('Erro no cadastro:', error);
        const detailMessage = error.error?.message || error.message || 'Não foi possível criar a conta. Tente novamente.';
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: detailMessage });
      }
    });
  }
}
