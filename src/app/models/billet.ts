import {Prix} from "./prix";
import {Reservation} from "./reservation";

export interface Billet {
  quantite: number;
  prix: Prix;
  reservation: Reservation;
}
