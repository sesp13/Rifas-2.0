import { Player, GameRound } from '../../../interfaces';

export interface GameState {
  players: Record<string, Player>;
  kickOutValue: number;
  entryValue: number;
  pointLimit: number;
  // Rounds management
  rounds: GameRound[];
  roundsOrder: string[];
  currentRepartitorId: string;
  currentRoundNumber: number;
}
