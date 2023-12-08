import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

interface IUser {
  id: string;
  company_name: string;
  fantasy_name: string;
  active: number;
  cnpj: number;
  local: number;
  opening_date: string;
}

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

  constructor() {
    this.findAllUsers();
  }

  findAllUsers(): void {
    this.http.get<IUser[]>('http://localhost:3000/users')
      .subscribe((data: IUser[]) => {
        this.users = data;
      });
  }
}
