import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { IUser } from '../../dto/user-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  users: IUser[] = [];

  http = inject(HttpClient);
  router = inject(Router);

  constructor() {
    this.findAllUsers();
  }

  findAllUsers(): void {
    const token = localStorage.getItem('token');

    this.http.get<IUser[]>('http://localhost:3000/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .subscribe((data: IUser[]) => {
        this.users = data;
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
