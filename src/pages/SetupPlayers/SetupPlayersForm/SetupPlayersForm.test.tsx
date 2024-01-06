import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from '../../../store';
import { SetupPlayersForm } from './SetupPlayersForm';
import { basicGameState } from '../../../tests';

const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch,
}));

const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
  preloadedState: {
    game: basicGameState,
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

  test('submit button should be disabled by default', () => {
    setupComponent();
    const submitBtn = screen.getByRole('button');
    expect(submitBtn).toHaveProperty('disabled', true);
  });

  test('should call dispatch after filling the entire form', () => {
    setupComponent();

    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((inputElement) => {
      fireEvent.change(inputElement, { target: { value: 'Player' } });
    });

    const submitBtn = screen.getByRole('button', { name: 'submit-btn' });
    fireEvent.click(submitBtn);

    expect(mockedDispatch).toHaveBeenCalled();
  });
});
