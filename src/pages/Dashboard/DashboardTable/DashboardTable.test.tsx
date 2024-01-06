import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { gameSlice } from '../../../store';
import { basicGameState } from '../../../tests';
import { DashboardTable } from './DashboardTable';
import { Player } from '../../../interfaces';
import { calcDebt, calcDebtWithFormat } from '../../../helpers';

const store = configureStore({
  reducer: { game: gameSlice.reducer },
  preloadedState: { game: basicGameState },
});
const playersArray: Player[] = Object.keys(basicGameState.players).map(
  (key) => basicGameState.players[key]
);

const setupComponent = () =>
  render(
    <BrowserRouter>
      <Provider store={store}>
        <DashboardTable
          entryValue={basicGameState.entryValue}
          kickoutValue={basicGameState.kickOutValue}
          players={playersArray}
        />
      </Provider>
    </BrowserRouter>
  );

describe('Tests on <DashboardTable />', () => {
  test('should render the table correctly', () => {
    setupComponent();
    const table = screen.getByLabelText('dashboard-table');
    expect(table).toBeTruthy();
  });

  test('table should have the same row number as players in state', () => {
    setupComponent();
    const table = screen.getByLabelText('dashboard-table');
    const bodyRows = table.querySelectorAll('tr.body-row');
    expect(bodyRows.length).toEqual(playersArray.length);
  });

  test('debt column should show the correct debt', () => {
    setupComponent();
    const table = screen.getByLabelText('dashboard-table');
    const firstDebtColumn = table.querySelector('.debt-column p');
    const debtCalculated = firstDebtColumn?.innerHTML;
    const firstPlayer = playersArray[0];
    expect(debtCalculated).toContain(
      calcDebtWithFormat({
        entryValue: basicGameState.entryValue,
        kickoutValue: basicGameState.kickOutValue,
        numberOfKickouts: firstPlayer.kickOuts,
      })
        .replace('$', '')
        .trim()
    );
  });
});
