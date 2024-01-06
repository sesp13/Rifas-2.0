import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { WinnerPage } from './WinnerPage';
import { gameSlice } from '../../store';
import { gameStateWithWinner } from '../../tests';
import { configureStore } from '@reduxjs/toolkit';
import { calcDebtWithFormat } from '../../helpers';

const store = configureStore({
  reducer: { game: gameSlice.reducer },
  preloadedState: { game: gameStateWithWinner },
});

const winnerPlayer =
  gameStateWithWinner.players[gameStateWithWinner.winnerPlayerKey!];

const setupComponent = () =>
  render(
    <BrowserRouter>
      <Provider store={store}>
        <WinnerPage />
      </Provider>
    </BrowserRouter>
  );

describe('Tests on <WinnerPage >', () => {
  test('should show the winners name', () => {
    setupComponent();
    const winnersName = screen.getByLabelText('winners-name');
    expect(winnersName.innerHTML).toEqual(winnerPlayer.name);
  });

  test('should render winner table', () => {
    setupComponent();
    const winnerTable = screen.getByLabelText('winner-table');
    expect(winnerTable).toBeTruthy();
  });

  test('should render winner table', () => {
    setupComponent();
    const winnerTable = screen.getByLabelText('winner-table');
    expect(winnerTable).toBeTruthy();
  });

  test('should render the won ammount', () => {
    setupComponent();
    const wonAmmount = document.querySelector('.won-ammount')?.innerHTML;
    expect(wonAmmount).toBeTruthy();
  });

  test('should render total savings', () => {
    setupComponent();
    const savingsValue = document.querySelector('.total-savings')?.innerHTML;
    expect(savingsValue!).toContain(
      calcDebtWithFormat({
        entryValue: gameStateWithWinner.entryValue,
        kickoutValue: gameStateWithWinner.kickOutValue,
        numberOfKickouts: winnerPlayer.kickOuts,
      })
        .replace('$', '')
        .trim()
    );
  });
});
