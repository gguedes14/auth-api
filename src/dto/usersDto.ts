export interface UsersDTO {
  name: string;
  lastName: string
  email: string;
  password: string;
  taxId: string;
  birthDate: string;
}

export interface UpdateUserDTO {
  name?: string;
  lastName?: string;
  taxId?: string;
  email?: string;
  birthDate?: string;
}
