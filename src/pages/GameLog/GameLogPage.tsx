import { Container, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { GameLogTable } from './GameLogTable/GameLogtable';

export const GameLogPage = () => {
  const { rounds, players: storePlayers } = useAppSelector(
    (state) => state.game
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Registro de Juegos
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {rounds.map(({ roundNumber, eventsPerPlayer, repartitorId }) => {
            return (
              <Grid item xs={12} key={roundNumber}>
                <Container
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
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
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};
