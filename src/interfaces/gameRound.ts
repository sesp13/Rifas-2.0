export interface GameRound {
  repartitorId: string;
  // TODO - Log Game events
  events: [];
  roundNumber: number;
}

export interface EndRoundData {
  hasWinner: boolean;
  winnerKey: string | null;
}
