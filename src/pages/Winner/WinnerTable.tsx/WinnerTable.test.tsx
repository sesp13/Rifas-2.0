import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { gameSlice } from '../../../store';
import { gameStateWithWinner } from '../../../tests';
import { calcDebtWithFormat } from '../../../helpers';
import { WinnerTable } from './WinnerTable';

const store = configureStore({
  reducer: { game: gameSlice.reducer },
  preloadedState: { game: gameStateWithWinner },
});

const losers = Object.keys(gameStateWithWinner.players)
  .filter((key) => key !== gameStateWithWinner.winnerPlayerKey)
  .map((key) => gameStateWithWinner.players[key]);

const setupComponent = () =>
  render(
    <BrowserRouter>
      <Provider store={store}>
        <WinnerTable
          entryValue={gameStateWithWinner.entryValue}
          kickoutValue={gameStateWithWinner.kickOutValue}
          players={losers}
        />
      </Provider>
    </BrowserRouter>
  );

describe('Tests on <WinnerTable />', () => {
  test('should render the table correctly', () => {
    setupComponent();
    const table = screen.getByLabelText('winner-table');
    expect(table).toBeTruthy();
  });

  test('table should have the same row number as players in state', () => {
    setupComponent();
    const table = screen.getByLabelText('winner-table');
    const bodyRows = table.querySelectorAll('tr.body-row');
    expect(bodyRows.length).toEqual(losers.length);
  });

  test('name column should show the correct name', () => {
    setupComponent();
    const table = screen.getByLabelText('winner-table');
    const firstKickoutsColumn = table.querySelector('.name-column p');
    const firstKickoutValue = firstKickoutsColumn?.innerHTML;
    const firstPlayer = losers[0];
    expect(firstKickoutValue).toEqual(firstPlayer.name);
  });

  test('debt column should show the correct debt', () => {
    setupComponent();
    const table = screen.getByLabelText('winner-table');
    const firstDebtColumn = table.querySelector('.debt-column p');
    const debtCalculated = firstDebtColumn?.innerHTML;
    const firstPlayer = losers[0];
    expect(debtCalculated).toContain(
      calcDebtWithFormat({
        entryValue: gameStateWithWinner.entryValue,
        kickoutValue: gameStateWithWinner.kickOutValue,
        numberOfKickouts: firstPlayer.kickOuts,
      })
        .replace('$', '')
        .trim()
    );
  });

  test('kickouts column should show the correct kickouts', () => {
    setupComponent();
    const table = screen.getByLabelText('winner-table');
    const firstKickoutsColumn = table.querySelector('.kickouts-column p');
    const firstKickoutValue = firstKickoutsColumn?.innerHTML;
    const firstPlayer = losers[0];
    expect(firstKickoutValue).toEqual(firstPlayer.kickOuts.toString());
  });
});
