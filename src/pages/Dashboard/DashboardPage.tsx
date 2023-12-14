import { Grid, Typography } from '@mui/material';
import { DashboardTable } from './DashboardTable/DashboardTable';
import { Player } from '../../interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const DashboardPage = () => {
  const {
    players,
    entryValue,
    kickOutValue,
    currentRepartitorId,
    currentRoundNumber,
  } = useSelector((state: RootState) => state.game);
  const playersArray: Player[] = Object.keys(players).map(
    (key) => players[key]
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h4">
                Este turno reparte: {players[currentRepartitorId].name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4">Turno {currentRoundNumber}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DashboardTable
            players={playersArray}
            entryValue={entryValue}
            kickoutValue={kickOutValue}
          ></DashboardTable>
        </Grid>
      </Grid>
    </>
  );
};
