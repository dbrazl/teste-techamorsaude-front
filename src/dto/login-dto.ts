interface IUser {
  company_name: string;
  fantasy_name: string;
  cnpj: string;
  local: number;
  opening_date: string;
  active: number;
}

export interface LoginDto {
  user: IUser;
  token: string;
}
