import {User} from "./user";

export interface Client {
  id: number;
  nom: string;
  prenom: string;
  avatar: string;
  adresse: string;
  code_postal: string;
  ville: string;
  user: User;
}
