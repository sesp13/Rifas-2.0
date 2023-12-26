import { Player, GameRound } from '../../../interfaces';

export interface GameState {
  players: Record<string, Player>;
  kickedOuts: string[],
  currentValidMaxScore: number,
  kickOutValue: number;
  entryValue: number;
  pointLimit: number;
  // Rounds management
  rounds: GameRound[];
  roundsOrder: string[];
  currentRepartitorId: string;
  currentRoundNumber: number;
}
