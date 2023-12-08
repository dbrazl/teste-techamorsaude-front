import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

interface IFindUser {
  cnpj: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  user = null;

  http = inject(HttpClient);

  constructor() {
    this.findUser({ cnpj: '12345678912345'});
  }

  findUser({ cnpj }: IFindUser): void {
    this.http.get(`http://localhost:3000/users/${cnpj}`)
      .subscribe((data: any) => {
        this.user = data;
      });
  }
}
