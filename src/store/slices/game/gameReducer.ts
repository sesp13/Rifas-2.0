import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from './gameState';
import { Player } from '../../../interfaces';

// Just for testing
const dummiePlayers: Record<string, Player> = {
  id123: {
    id: 'id123',
    name: 'Santiago E',
    kickOuts: 2,
    points: 50,
  },
  id124: {
    id: 'id124',
    name: 'Sebastian',
    kickOuts: 0,
    points: 80,
  },
  id125: {
    id: 'id125',
    name: 'Nelson',
    kickOuts: 1,
    points: 80,
  },
  id128: {
    id: 'id128',
    name: 'Alonso',
    kickOuts: 0,
    points: 45,
  },
};

const dummieInitialState: GameState = {
  players: dummiePlayers,
  entryValue: 5000,
  kickOutValue: 1000,
  pointLimit: 100,
  rounds: [],
  currentRepartitorId: dummiePlayers[Object.keys(dummiePlayers)[0]].id,
  currentRoundNumber: 1,
  roundsOrder: Object.keys(dummiePlayers),
};
// End testing

const realInitialState: GameState = {
  players: {},
  entryValue: 0,
  kickOutValue: 0,
  pointLimit: 0,
  rounds: [],
  currentRepartitorId: '',
  currentRoundNumber: 1,
  roundsOrder: [],
};

// End my testing

const getInitialState = (): GameState => {
  return {
    ...dummieInitialState,
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
