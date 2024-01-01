import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { gameSlice } from '../../store';
import { basicGameState } from '../../tests';
import { DashboardPage } from './DashboardPage';
import { AppRouting } from '../../routes';

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

  test('kickedOuts panel should not be visible', () => {
    setupComponent();
    let kickedOutsPanel: HTMLElement | null = null;
    try {
      kickedOutsPanel = screen.getByLabelText('kicked-outs-panel');
    } catch (err) {
      expect(kickedOutsPanel).toBeFalsy();
    }
  });

  test('End round should redirect to end round page', () => {
    setupComponent();
    const endRoundbtn = screen.getByLabelText('end-round-btn');
    fireEvent.click(endRoundbtn);
    expect(mockedNavigate).toHaveBeenCalledWith(AppRouting.END_ROUND);
  });
});
