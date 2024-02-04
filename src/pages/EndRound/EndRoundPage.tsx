import { Grid, Typography } from '@mui/material';
import { EndRoundForm } from './EndRoundForm/EndRoundForm';
import { useParams } from 'react-router-dom';

export const EndRoundPage = () => {
  const params = useParams();
  const isEditMode = params.edit !== null && params.edit !== undefined;
  const pageTitle = isEditMode ? 'Editar último tuno' : 'Fin de turno';

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3" aria-label="end-round-title">
          {pageTitle}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" marginTop={2} textAlign={'left'}>
          Por favor agrega los puntajes obtenidos por los jugadores
        </Typography>
      </Grid>
      <Grid item xs={12} marginTop={2}>
        <EndRoundForm isEditMode={isEditMode} />
      </Grid>
    </Grid>
  );
};
