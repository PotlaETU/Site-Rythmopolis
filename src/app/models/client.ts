import {User} from "./user";
import {Reservation} from "./reservation";

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
