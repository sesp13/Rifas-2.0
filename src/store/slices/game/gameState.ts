import { Player } from '../../../interfaces';

export interface GameState {
  players: Record<string, Player>;
  kickOutValue: number;
  entryValue: number;
  pointLimit: number;
}
