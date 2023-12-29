import {
  AppDispatch,
  RootState,
  endRound,
  setWinner,
  updateRounds,
} from '../..';
import { EndRoundData } from '../../../interfaces';

export const startEndRound = (payload: Record<string, number>) => {
  return async (
    dispatch: AppDispatch,
    getState: () => RootState
  ): Promise<EndRoundData> => {
    let gameHasWinner = false;
    let winnerKey = null;

    let gameState = getState().game;
    dispatch(endRound(payload));
    
    // Check winner
    gameState = getState().game;
    if (gameState.kickedOuts.length === Object.keys(payload).length - 1) {
      winnerKey = Object.keys(gameState.players).filter(
        (key) => !gameState.kickedOuts.includes(key)
      )[0];
      gameHasWinner = true;
      dispatch(setWinner(winnerKey));
    }

    dispatch(updateRounds());

    return {
      hasWinner: gameHasWinner,
      winnerKey,
    };
  };
};
