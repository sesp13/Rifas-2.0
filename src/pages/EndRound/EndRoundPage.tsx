import { Grid, Typography } from '@mui/material';
import { EndRoundForm } from './EndRoundForm/EndRoundForm';

export const EndRoundPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3" aria-label="end-round-title">
          Fin de Turno
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" marginTop={2} textAlign={'left'}>
          Por favor agrega los puntajes obtenidos por los jugadores
        </Typography>
      </Grid>
      <Grid item xs={12} marginTop={2}>
        <EndRoundForm />
      </Grid>
    </Grid>
  );
};
