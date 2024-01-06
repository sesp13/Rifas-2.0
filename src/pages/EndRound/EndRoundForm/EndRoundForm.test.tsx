import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from '../../../store';
import { basicGameState } from '../../../tests';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { EndRoundForm } from './EndRoundForm';
import { AppRouting } from '../../../routes';

const mockedDispatch = jest.fn();
const mockedNavigate = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
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
        <EndRoundForm />
      </BrowserRouter>
    </Provider>
  );

const fillForm = () => {
  const inputsContainers = screen.getAllByTestId('player-points');
  inputsContainers.forEach((container) => {
    const inputElement = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: '8' } });
  });
};

describe('Tests on <EndRoundForm />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render the form', () => {
    setupComponent();
    const form = screen.getByLabelText('end-round-form');
    expect(form).toBeTruthy();
  });

  test('submit button should be disabled by default', () => {
    setupComponent();
    const submitBtn = screen.getByRole('button');
    expect(submitBtn).toHaveProperty('disabled', true);
  });

  test('if a winner checkbox is checked should disable the others', () => {
    setupComponent();
    const winnerChecks = screen.getAllByRole('checkbox');
    fireEvent.click(winnerChecks[0]);
    const otherChecks = screen.getAllByRole('checkbox');
    otherChecks.shift();
    otherChecks.forEach((element) => {
      expect(element).toHaveProperty('disabled', true);
    });
  });

  test('should call dispatch after filling the entire form and redirect to winner page', async () => {
    mockedDispatch.mockReturnValue(
      new Promise((resolve) => {
        resolve({ hasWinner: true });
      })
    );
    setupComponent();
    fillForm();

    const submitBtn = screen.getByRole('button', { name: 'submit-btn' });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalled();
      expect(mockedNavigate).toHaveBeenCalledWith(AppRouting.WINNER);
    });
  });

  test('should call dispatch after filling the entire form and redirect to dashboard page', async () => {
    mockedDispatch.mockReturnValue(
      new Promise((resolve) => {
        resolve({ hasWinner: false });
      })
    );
    setupComponent();
    fillForm();

    const submitBtn = screen.getByRole('button', { name: 'submit-btn' });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalled();
      expect(mockedNavigate).toHaveBeenCalledWith(AppRouting.DASHBOARD);
    });
  });
});
