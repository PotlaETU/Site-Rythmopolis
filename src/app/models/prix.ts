import {Evenement} from "./evenement";

export interface Prix {
  id: number;
  categorie: string;
  nombre: number;
  valeur: number;
  evenement: Evenement;
}
