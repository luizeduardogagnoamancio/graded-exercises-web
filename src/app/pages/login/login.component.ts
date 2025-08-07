import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading = false;
  errorMessage: string | null = null;

  loginData = {
    email: '',
    password: ''
  };

  rememberMe = false;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.loginService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);

        this.authService.login(response.token);

        this.router.navigate(['']);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Falha no login:', err);
        this.errorMessage = 'Email ou senha inválidos. Tente novamente.';
        this.isLoading = false;
      }
    });
  }
}
