export interface GameRound {
  repartitorId: string;
  eventsPerPlayer: Record<string,PlayerEvent>;
  roundNumber: number;
}

export interface PlayerEvent {
  playerKey: string,
  startPoints: number;
  endPoints: number;
  earnedPoints: number;
  isKickedOut: boolean;
  kickOuts: number;
}

export interface EndRoundData {
  hasWinner: boolean;
  winnerKey: string | null;
}
