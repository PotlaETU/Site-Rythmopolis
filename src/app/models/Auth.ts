import {User} from "./user";
import {Role} from "./role";

export interface Identite {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nom: string;
  prenom:string;
  adresse:string;
  code_postal:string;
  ville: string;
  email: string;
  password: string;
}

export interface Profil {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  "email_verified_at": string;
}

export const ANONYMOUS_USER: User = <User>{
  id: 0,
  nom: '',
  email: '',
  role: Role.NON_ACTIF,
  token: ''
};
