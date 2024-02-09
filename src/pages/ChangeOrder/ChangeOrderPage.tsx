import { Grid } from '@mui/material';
import { ChangeOrderForm } from './ChangeOrderForm/ChangeOrderForm';

export const ChangeOrderPage = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h2>Cambiar el orden de los jugadores</h2>
      </Grid>
      <Grid item xs={12}>
        <ChangeOrderForm />
      </Grid>
    </Grid>
  );
};
