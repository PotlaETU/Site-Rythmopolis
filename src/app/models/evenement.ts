import {Lieu} from "./lieu";
import {Type} from "./type";
import {Artiste} from "./artiste";

export interface Evenement {
  id: number;
  titre: Type;
  description: string;
  date_event: Date;
  lieu: Lieu;
  artistes: Artiste[]
}
