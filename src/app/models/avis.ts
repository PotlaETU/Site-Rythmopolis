import {Evenement} from "./evenement";
import {Client} from "./client";

export interface Avis {
  evenement: Evenement;
  client: Client;
  date_avis: Date;
  commentaire: string;
  note: number;
}
