import { Player } from '../../interfaces';
import { GameState } from '../../store';

const basicPlayers: Record<string, Player> = {
  player1: { id: 'player1', kickOuts: 0, name: '', points: 0 },
  player2: { id: 'player2', kickOuts: 0, name: '', points: 0 },
  player3: { id: 'player3', kickOuts: 0, name: '', points: 0 },
};

const playersWithDebts: Record<string, Player> = {
  player1: { id: 'player1', kickOuts: 1, name: 'Player 1', points: 50 },
  player2: { id: 'player2', kickOuts: 2, name: 'Player 2', points: 90 },
  player3: { id: 'player3', kickOuts: 2, name: 'Player 3', points: 70 },
};

const basicPlayersArray = Object.keys(basicPlayers);
const playersWithDebtsArray = Object.keys(basicPlayers);

export const basicGameState: GameState = {
  players: basicPlayers,
  entryValue: 1000,
  kickOutValue: 1000,
  pointLimit: 100,
  currentRepartitorId: basicPlayersArray[0],
  currentRoundNumber: 1,
  rounds: [],
  roundsOrder: [...basicPlayersArray],
  kickedOuts: [],
  currentValidMaxScore: 0,
  winnerPlayerKey: '',
};

export const gameStateWithWinner: GameState = {
  players: playersWithDebts,
  entryValue: 1000,
  kickOutValue: 1000,
  pointLimit: 100,
  currentRepartitorId: playersWithDebtsArray[0],
  currentRoundNumber: 5,
  rounds: [],
  roundsOrder: [...playersWithDebtsArray],
  kickedOuts: [playersWithDebts.player2.id, playersWithDebts.player3.id],
  currentValidMaxScore: 50,
  winnerPlayerKey: playersWithDebts.player1.id,
};
