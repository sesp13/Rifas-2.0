import { Button, Container, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { GameLogTable } from './GameLogTable/GameLogtable';
import { useNavigate } from 'react-router-dom';
import { AppRouting } from '../../routes';

export const GameLogPage = () => {
  const { rounds, players: storePlayers } = useAppSelector(
    (state) => state.game
  );
  const reversedRounds = [...rounds].reverse();
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate(AppRouting.DASHBOARD);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Registro de Juegos
        </Typography>
      </Grid>
      {reversedRounds.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="h5">
            La partida no tiene juegos registrados
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <Button variant="contained" onClick={goToDashboard}>
                Volver al tablero
              </Button>
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {reversedRounds.map(
                ({ roundNumber, eventsPerPlayer, repartitorId }) => {
                  return (
                    <Grid item xs={12} key={roundNumber}>
                      <Container
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography variant="h5" marginBottom={2}>
                          Ronda {roundNumber}
                        </Typography>
                        <Typography variant="h5">
                          Repartidor: {storePlayers[repartitorId].name}
                        </Typography>
                      </Container>
                      <GameLogTable
                        playerEvents={eventsPerPlayer}
                        players={storePlayers}
                      />
                    </Grid>
                  );
                }
              )}
            </Grid>
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <Container sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            variant="contained"
            onClick={goToDashboard}
            aria-label="go-to-dashboard-btn"
          >
            Volver al tablero
          </Button>
        </Container>
      </Grid>
    </Grid>
  );
};
