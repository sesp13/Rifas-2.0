import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from './gameState';
import { Player } from '../../../interfaces';

const getInitialState = (): GameState => {
  return {
    players: [],
    entryValue: 1000,
    kickOutValue: 1000,
    pointLimit: 100,
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
        players.push({ name: '', kickOuts: 0, points: 0 });
      }
      console.log(players);

      state.players = players;
    },
  },
});

export const { setupGame } = gameSlice.actions;