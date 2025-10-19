import { FormsModule } from '@angular/forms';
import { RegisterRequestDto } from './../../models/dto/register/registerRequest.dto';
import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { UserRoleEnum } from '../../models/enum/userRole.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,
            CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading: boolean = false;
  errorMessage: string | null = null;
  name: string = "";
  email: string = "";
  password: string = "";
  userRole: UserRoleEnum = UserRoleEnum.USER;
  confirmPassword: string = '';

  registerData: RegisterRequestDto = {
      name: "",
      email: "",
      password: "",
      role: UserRoleEnum.USER
    };


  constructor(private registerService: RegisterService,
              private router: Router
  ) { }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.registerData.name = this.name;
    this.registerData.email = this.email;
    this.registerData.password = this.password;
    this.registerData.role = this.userRole;


    this.registerService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Cadastro realizado com sucesso!', response);
        this.isLoading = false;

        this.router.navigate(['/register-success']);
      },
      error: (err) => {
        console.error('Erro ao realizar o cadastro:', err);
        this.errorMessage = 'Não foi possível criar a conta. Verifique os dados e tente novamente.';
        this.isLoading = false;
      }
    });
  }

}
