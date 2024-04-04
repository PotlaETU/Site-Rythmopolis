import {User} from "./user";

export interface Identite {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
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
  name: '',
  email: '',
  password: '',
  role: 'NON_ACTIF',
  jwtToken: ''
};
