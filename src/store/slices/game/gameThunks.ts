import { AppDispatch, RootState, endRound, setWinner } from '../..';

export const startEndRound = (payload: Record<string, number>) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    let gameState = getState().game;
    dispatch(endRound(payload));
    gameState = getState().game;

    // Check winner
    if (gameState.kickedOuts.length === Object.keys(payload).length - 1) {
      const winnerKey = Object.keys(gameState.players).filter(
        (key) => !gameState.kickedOuts.includes(key)
      )[0];
      dispatch(setWinner(winnerKey));
      console.log(winnerKey);
    }
  };
};
