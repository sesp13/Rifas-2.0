import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from './gameState';
import { GameRound, Player } from '../../../interfaces';

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
  kickedOuts: ['id128', 'id125'],
  currentValidMaxScore: 0,
  winnerPlayerKey: null,
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
  kickedOuts: [],
  currentValidMaxScore: 0,
  winnerPlayerKey: null,
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

      const setUpPlayers: Record<string, Player> = {};
      const setupPlayersArray: Player[] = [];
      for (let i = 0; i < numberOfPlayers; i++) {
        const id = Math.random().toString(16).slice(2);
        const newPlayer = {
          id,
          name: '',
          kickOuts: 0,
          points: 0,
        };
        setUpPlayers[id] = newPlayer;
        setupPlayersArray.push(newPlayer);
      }

      state.entryValue = entryValue;
      state.kickOutValue = kickOutValue;
      state.pointLimit = pointLimit;
      state.players = setUpPlayers;
      state.roundsOrder = Object.keys(state.players);
      state.currentRepartitorId = setupPlayersArray[0].id;
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
    endRound: (
      state: GameState,
      action: PayloadAction<Record<string, number>>
    ) => {
      const scores = action.payload;
      const scoresKeys = Object.keys(scores);
      const kickedOuts: string[] = [];
      let currentValidMaxScore: number = state.players[scoresKeys[0]].points;

      scoresKeys.forEach((key) => {
        const currentScore = state.players[key].points;
        const newScore = currentScore + scores[key];
        if (newScore > state.pointLimit) {
          state.players[key].kickOuts += 1;
          kickedOuts.push(key);
        } else {
          currentValidMaxScore = Math.max(currentValidMaxScore, newScore);
          state.players[key].points = newScore;
        }
      });

      // Set the max valid score for the kickedouts
      kickedOuts.forEach((key) => {
        state.players[key].points = currentValidMaxScore;
      });

      state.kickedOuts = kickedOuts;
      state.currentValidMaxScore = currentValidMaxScore;
    },
    updateRounds: (state: GameState) => {
      // Update rounds info
      state.currentRoundNumber += 1;
      const currentRepartitorIndex = state.roundsOrder.indexOf(
        state.currentRepartitorId
      );
      const newRepartitorIndex =
        currentRepartitorIndex + 1 > state.roundsOrder.length - 1
          ? 0
          : currentRepartitorIndex + 1;
      state.currentRepartitorId = state.roundsOrder[newRepartitorIndex];
    },
    setWinner: (state: GameState, action: PayloadAction<string>) => {
      state.winnerPlayerKey = action.payload;
    },
    logRound: (state: GameState, action: PayloadAction<GameRound>) => {
      state.rounds.push(action.payload);
    },
  },
});

export const { setupGame, updatePlayers, endRound, updateRounds, setWinner, logRound } =
  gameSlice.actions;
