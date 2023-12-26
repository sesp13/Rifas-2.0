import { AppDispatch, RootState, endRound, setWinner } from '../..';

export const startEndRound = (payload: Record<string, number>) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    let state = getState();
    dispatch(endRound(payload));
    state = getState();
    // Check winner
    if (state.game.kickedOuts.length === Object.keys(payload).length - 1) {
      dispatch(setWinner());
    }
  };
};
