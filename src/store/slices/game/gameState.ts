import { Player } from '../../../interfaces';

export interface GameState {
  players: Player[];
  kickOutValue: number;
  entryValue: number;
  pointLimit: number;
}
