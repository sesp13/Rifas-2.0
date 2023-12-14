import { Button, Grid, Typography } from '@mui/material';
import { DashboardTable } from './DashboardTable/DashboardTable';
import { Player } from '../../interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

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
  
  const navigate = useNavigate();

  const onEndRound = () => {
    navigate('/end-round');
  }

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
        <Grid item xs={12}>
          <Grid container justifyContent={'end'}>
            <Button onClick={onEndRound} variant="contained" >Fin de turno</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
