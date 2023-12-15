import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { gameSlice } from '../../store';
import { basicGameState } from '../../tests';
import { DashboardPage } from './DashboardPage';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

const store = configureStore({
  reducer: { game: gameSlice.reducer },
  preloadedState: { game: basicGameState },
});

const setupComponent = () =>
  render(
    <BrowserRouter>
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    </BrowserRouter>
  );

describe('Tests on <DashboardPage />', () => {
  test('should render the header correctly', () => {
    setupComponent();
    const header = screen.getByLabelText('dashboard-header');
    expect(header).toBeTruthy();
  });

  test('End round should redirect to end round page', () => {
    setupComponent();
    const endRoundbtn = screen.getByLabelText('end-round-btn');
    fireEvent.click(endRoundbtn);
    expect(mockedNavigate).toHaveBeenCalledWith('/end-round');
  });
});
