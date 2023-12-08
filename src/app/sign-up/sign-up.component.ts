import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserDto } from '../../dto/create-user.dto';
import { LoginDto } from '../../dto/login-dto';

interface ILogin {
  cnpj: string;
  password: string;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  error: boolean = false;
  errorCompanyName: string[] = [];
  errorFantasyName: string[] = [];
  errorCNPJ: string[] = [];
  errorLocal: string[] = [];
  errorOpeningDate: string[] = [];
  errorPassword: string[] = [];
  otherErrors: string[] = [];

  http = inject(HttpClient);
  router = inject(Router);

  resetErrors() {
    this.error = false;
    this.errorCompanyName = [];
    this.errorFantasyName = [];
    this.errorCNPJ = [];
    this.errorLocal = [];
    this.errorOpeningDate = [];
    this.errorPassword = [];
    this.otherErrors = [];
  }

  onSubmit(form: NgForm): void {
    this.resetErrors();

    const {
      company_name,
      fantasy_name,
      cnpj,
      local,
      opening_date,
      password
    } = form.value;

    this.http.post<CreateUserDto>(
      'http://localhost:3000/users',
      {
        company_name,
        fantasy_name,
        cnpj: cnpj.toString(),
        local,
        opening_date,
        password
      })
      .subscribe({
        next: () => {
          this.login({ cnpj: cnpj.toString(), password });
        },
        error: (error) => {
          this.error = true;

          const { message, statusCode, error: errorDescription } = error.error;


          if (statusCode === 400) {
            this.errorCompanyName = message.filter(
              (message: string) => message.includes('company_name')
            );
            this.errorFantasyName = message.filter(
              (message: string) => message.includes('fantasy_name')
            );
            this.errorCNPJ = message.filter(
              (message: string) => message.includes('cnpj')
            );
            this.errorLocal = message.filter(
              (message: string) => message.includes('local')
            );
            this.errorOpeningDate = message.filter(
              (message: string) => message.includes('opening_date')
            );
            this.errorPassword = message.filter(
              (message: string) => message.includes('password')
            );
          }

          if (statusCode !== 400) {
            this.otherErrors = [errorDescription];
          }
        },
      })
  }

  login({ cnpj, password }: ILogin): void {
    this.http.post<LoginDto>(
      'http://localhost:3000/auth/login',
      {
        cnpj: cnpj.toString(),
        password
      })
    .subscribe({
      next: (data: LoginDto) => {
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('/dashboard');
      }
    })
  }
}
