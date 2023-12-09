import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from './gameState';
import { Player } from '../../../interfaces';

// Just for testing
const numberOfPlayers = 4;
const dummiePlayers: Record<string, Player> = {};
for (let i = 0; i < numberOfPlayers; i++) {
  const id = Math.random().toString(16).slice(2);
  dummiePlayers[id] = {
    id,
    name: '',
    kickOuts: 0,
    points: 0,
  };
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

      const players: Record<string, Player> = {};
      for (let i = 0; i < numberOfPlayers; i++) {
        const id = Math.random().toString(16).slice(2);
        dummiePlayers[id] = {
          id,
          name: '',
          kickOuts: 0,
          points: 0,
        };
      }

      state.players = players;
    },
    updatePlayers: (
      state: GameState,
      action: PayloadAction<Record<string, Player>>
    ) => {
      const playersObj = action.payload;
      for (const key of Object.keys(playersObj)) {
        if (state.players[key]) {
          state.players[key] = { ...playersObj[key] };
        }
      }
    },
  },
});

export const { setupGame, updatePlayers } = gameSlice.actions;
