import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from './gameState';
import { Player } from '../../../interfaces';

// Just for testing
const numberOfPlayers = 4;
const dummiePlayers: Player[] = [];
for (let i = 0; i < numberOfPlayers; i++) {
  dummiePlayers.push({
    id: Math.random().toString(16).slice(2),
    name: '',
    kickOuts: 0,
    points: 0,
  });
}
// End my testing

const getInitialState = (): GameState => {
  return {
    players: dummiePlayers,
    entryValue: 0,
    kickOutValue: 0,
    pointLimit: 0,
  };
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: getInitialState(),
  reducers: {
    setupGame: (
      state: GameState,
      action: PayloadAction<{
        numberOfPlayers: number;
        entryValue: number;
        kickOutValue: number;
        pointLimit: number;
      }>
    ) => {
      const { entryValue, kickOutValue, pointLimit, numberOfPlayers } =
        action.payload;
      state.entryValue = entryValue;
      state.kickOutValue = kickOutValue;
      state.pointLimit = pointLimit;

      const players: Player[] = [];
      for (let i = 0; i < numberOfPlayers; i++) {
        players.push({
          id: Math.random().toString(16).slice(2),
          name: '',
          kickOuts: 0,
          points: 0,
        });
      }

      state.players = players;
    },
  },
});

export const { setupGame } = gameSlice.actions;
