import { Typography } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { WinnerTable } from './WinnerTable.tsx/WinnerTable';
import { NumberFormatCOP, calcDebt, calcDebtWithFormat } from '../../helpers';

export const WinnerPage = () => {
  const { winnerPlayerKey, players, entryValue, kickOutValue } = useAppSelector(
    (state) => state.game
  );

  if (!winnerPlayerKey) return <p>Error: No winner setted</p>;
  const winnerPlayer = players[winnerPlayerKey];

  const losers = Object.keys(players)
    .filter((key) => key !== winnerPlayerKey)
    .map((key) => players[key]);

  const finalIncome = losers.reduce(
    (acumulator, currentPlayer) =>
      acumulator +
      calcDebt({
        entryValue,
        kickoutValue: kickOutValue,
        numberOfKickouts: currentPlayer.kickOuts,
      }),
    0
  );

  return (
    <>
      <Typography variant="body1">Tenemos un ganador!</Typography>
      <Typography variant="h3" aria-label="winners-name" gutterBottom>
        {winnerPlayer.name}
      </Typography>
      <Typography variant="body1" marginBottom={2} align="left">
        Información de los perdedores
      </Typography>
      <WinnerTable
        players={losers}
        entryValue={entryValue}
        kickoutValue={kickOutValue}
      />
      <Typography variant="h4" align="left" marginTop={2}>
        Datos del ganador
      </Typography>
      <ul>
        <li>
          <Typography variant="body1" align="left">
            En total ganaste:{' '}
            <span className="won-ammount">{NumberFormatCOP(finalIncome)}</span>
          </Typography>
        </li>
        <li>
          <Typography variant="body1" align="left">
            En total ahorraste:
            <span className="total-savings">
              {calcDebtWithFormat({
                entryValue,
                kickoutValue: kickOutValue,
                numberOfKickouts: winnerPlayer.kickOuts,
              })}
            </span>
          </Typography>
        </li>
      </ul>
    </>
  );
};
