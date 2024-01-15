import {
  AppDispatch,
  RootState,
  endRound,
  logRound,
  setWinner,
  updateRounds,
} from '../..';
import { EndRoundData, GameRound } from '../../../interfaces';

export const startEndRound = (payload: Record<string, number>) => {
  return async (
    dispatch: AppDispatch,
    getState: () => RootState
  ): Promise<EndRoundData> => {
    let gameHasWinner = false;
    let winnerKey = null;

    let gameState = getState().game;

    // Prepare End round Log
    const roundLog: GameRound = {
      repartitorId: gameState.currentRepartitorId,
      eventsPerPlayer: {},
      roundNumber: gameState.currentRoundNumber,
    };

    Object.keys(gameState.players).forEach((key) => {
      const earnedPointsInRound = payload[key];
      const currentScore = gameState.players[key].points;
      const currentKickouts = gameState.players[key].kickOuts;

      roundLog.eventsPerPlayer[key] = {
        playerKey: key,
        startPoints: currentScore,
        endPoints: 0,
        earnedPoints: earnedPointsInRound,
        isKickedOut: false,
        kickOuts: currentKickouts,
      };
    });

    dispatch(endRound(payload));

    // Log end round event
    gameState = getState().game;
    Object.keys(gameState.players).forEach((key) => {
      const isPlayerKickedOut = gameState.kickedOuts.includes(key);
      const pointsAfterRound = gameState.players[key].points;
      const kickoutsAfterRound = gameState.players[key].kickOuts;

      roundLog.eventsPerPlayer[key] = {
        ...roundLog.eventsPerPlayer[key],
        endPoints: pointsAfterRound,
        isKickedOut: isPlayerKickedOut,
        kickOuts: kickoutsAfterRound,
      };
    });

    // Check winner
    if (gameState.kickedOuts.length === Object.keys(payload).length - 1) {
      winnerKey = Object.keys(gameState.players).filter(
        (key) => !gameState.kickedOuts.includes(key)
      )[0];
      gameHasWinner = true;
      dispatch(setWinner(winnerKey));
    }

    dispatch(logRound(roundLog));
    dispatch(updateRounds());

    return {
      hasWinner: gameHasWinner,
      winnerKey,
    };
  };
};
