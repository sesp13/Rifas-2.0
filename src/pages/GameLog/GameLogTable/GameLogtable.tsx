import { Grid, Typography } from '@mui/material';
import { GameRound } from '../../../interfaces';

interface GameLogTableProps {
  data: GameRound;
}

export const GameLogTable = (params: GameLogTableProps) => {
  const { data } = params;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Ronda {data.roundNumber}</Typography>
      </Grid>
    </Grid>
  );
};
