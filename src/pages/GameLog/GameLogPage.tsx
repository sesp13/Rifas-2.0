import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { GameLogTable } from './GameLogTable/GameLogtable';

export const GameLogPage = () => {
  const { rounds } = useAppSelector((state) => state.game);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Registro de Juegos
        </Typography>
      </Grid>
      <Grid item>
        {rounds.map((round) => {
          return <GameLogTable data={round} key={round.roundNumber} />;
        })}
      </Grid>
    </Grid>
  );
};
