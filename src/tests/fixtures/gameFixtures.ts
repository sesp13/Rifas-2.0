import { GameState } from '../../store';

export const basicGameState: GameState = {
  players: {
    player1: { id: 'player1', kickOuts: 0, name: '', points: 0 },
    player2: { id: 'player2', kickOuts: 0, name: '', points: 0 },
    player3: { id: 'player3', kickOuts: 0, name: '', points: 0 },
  },
  entryValue: 1000,
  kickOutValue: 1000,
  pointLimit: 100,
};
