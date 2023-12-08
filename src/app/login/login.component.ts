import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginDto } from '../../dto/login-dto';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  error: boolean = false;
  errorCNPJ: string[] = [];
  errorPassword: string[] = [];
  otherErrors: string[] = [];

  http = inject(HttpClient);
  router = inject(Router);

  resetErrors() {
    this.error = false;
    this.errorCNPJ = [];
    this.errorPassword = [];
    this.otherErrors = [];
  }

  onSubmit(form: NgForm) {
    this.resetErrors();

    const { cnpj, password } = form.value;

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
        },
        error: (error) => {
          this.error = true;

          const { message, statusCode, error: errorDescription } = error.error;


          if (statusCode === 400) {
            this.errorCNPJ = message.filter(
              (message: string) => message.includes('cnpj')
            );
            this.errorPassword = message.filter(
              (message: string) => message.includes('password')
            );
          }

          if (statusCode !== 400) {
            this.otherErrors = [errorDescription];
          }
        },
      });
  }

  goToSignUp(): void {
    this.router.navigateByUrl('/register');
  }
}
