import { Button, Grid, Typography } from '@mui/material';
import { DashboardTable } from './DashboardTable/DashboardTable';
import { Player } from '../../interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { AppRouting } from '../../routes';
import { KickedOutsList } from './KickedOutsList/KickedOutsList';

const showKickedOuts = (kickedOutsArray: string[]) =>
  kickedOutsArray.length > 0 ? (
    <Grid item xs={12}>
      <KickedOutsList />
    </Grid>
  ) : (
    ''
  );

export const DashboardPage = () => {
  const {
    players,
    entryValue,
    kickOutValue,
    kickedOuts,
    currentRepartitorId,
    currentRoundNumber,
    roundsOrder,
  } = useSelector((state: RootState) => state.game);
  const playersArray: Player[] = roundsOrder.map((key) => players[key]);

  const navigate = useNavigate();

  const onNavigatePage = (route: AppRouting | string) => {
    navigate(route);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2} aria-label="dashboard-header">
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
        {showKickedOuts(kickedOuts)}
        <Grid item xs={12}>
          <DashboardTable
            players={playersArray}
            entryValue={entryValue}
            kickoutValue={kickOutValue}
          ></DashboardTable>
        </Grid>
        <Grid item xs={12}>
          <Grid container sx={{ justifyContent: 'space-between', gap: '10px' }}>
            <Button
              onClick={() => onNavigatePage(AppRouting.GAME_LOG)}
              variant="contained"
              aria-label="game-log-btn"
            >
              Ver registro de juegos
            </Button>
            <Button
              onClick={() => onNavigatePage(AppRouting.CHANGE_ORDER)}
              variant="contained"
              aria-label="change-order-btn"
            >
              Cambiar el orden de los jugadores
            </Button>
            <Button
              onClick={() => onNavigatePage(`${AppRouting.END_ROUND}/true`)}
              variant="contained"
              aria-label="edit-last-round-btn"
            >
              Editar último turno
            </Button>
            <Button
              onClick={() => onNavigatePage(AppRouting.END_ROUND)}
              variant="contained"
              aria-label="end-round-btn"
            >
              Fin de turno
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
