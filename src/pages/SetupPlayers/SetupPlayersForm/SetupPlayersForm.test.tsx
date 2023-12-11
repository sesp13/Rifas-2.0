import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from '../../../store';
import { SetupPlayersForm } from './SetupPlayersForm';
import { basicGameState } from '../../../tests';

const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
  preloadedState: {
    game: basicGameState
  },
});

const setupComponent = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <SetupPlayersForm />
      </BrowserRouter>
    </Provider>
  );

describe('Tests on <SetupPlayersForm />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render the form correctly', () => {
    setupComponent();
    expect(screen.getByLabelText('setup-players-form')).toBeTruthy();
  });

  test('should print the correct number of players', () => {
    setupComponent();
    const storePlayers = Object.keys(store.getState().game.players).length;
    expect(screen.getAllByRole('textbox').length).toEqual(storePlayers);
  });
});
