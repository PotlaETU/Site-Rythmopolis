import {Evenement} from "./evenement";
import {Artiste} from "./artiste";

export interface Participant {
  evenement: Evenement;
  artistes: Artiste[];
  ordre: number;
}
