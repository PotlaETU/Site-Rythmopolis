import {Evenement} from "./evenement";

export interface Prix {
  id: number;
  categorie: string;
  nombre_places: number;
  valeur: number;
  evenement: Evenement;
}
