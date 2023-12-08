import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'teste-techamorsaude-front';

  router = inject(Router)

  constructor() {
    this.checkRoutes();
  }

  checkRoutes(): void {
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        const token = localStorage.getItem('token');
        const { url } = value as NavigationEnd;

        if (token && url === '/') {
          this.router.navigateByUrl('/dashboard');
        }

        if (!token && url === '/dashboard') {
          this.router.navigateByUrl('/');
        }
      }
    })
  }
}
