import { combineReducers } from '@reduxjs/toolkit';
import { gameSlice } from './slices';

export const rootReducer = combineReducers({
  game: gameSlice.reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
