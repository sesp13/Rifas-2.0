import './SetupPage.scss';
import { SetupForm } from './SetupForm/SetupForm';
import { Grid } from '@mui/material';

export const SetupPage = () => {
  return (
    <>
      <Grid item xs={12}>
        <p className="welcome-label">
          Bienvenido a la Rifa, por favor configura tu juego
        </p>
      </Grid>
      <SetupForm />
    </>
  );
};
