import { Player } from '../../interfaces';
import { GameState } from '../../store';

const basicPlayers: Record<string, Player> = {
  player1: { id: 'player1', kickOuts: 0, name: '', points: 0 },
  player2: { id: 'player2', kickOuts: 0, name: '', points: 0 },
  player3: { id: 'player3', kickOuts: 0, name: '', points: 0 },
};
const basicPlayersArray = Object.keys(basicPlayers);

export const basicGameState: GameState = {
  players: basicPlayers,
  entryValue: 1000,
  kickOutValue: 1000,
  pointLimit: 100,
  currentRepartitorId: basicPlayersArray[0],
  currentRoundNumber: 1,
  rounds: [],
  roundsOrder: [...basicPlayersArray],
};
