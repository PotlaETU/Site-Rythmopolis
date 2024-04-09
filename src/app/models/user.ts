import {Role} from "./role";

export interface User{
  id: number;
  nom: string;
  email: string;
  role: Role;
  token: string;
}
