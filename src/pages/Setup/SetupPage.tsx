import { Button, Grid, TextField } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import './SetupPage.scss';
import { FormEvent } from 'react';

const initialForm = {
  players: 0,
  kickOutValue: 1000,
  entryValue: 1000,
  pointLimit: 100,
};

export const SetupPage = () => {
  const {
    onInputChange,
    players,
    kickOutValue,
    entryValue,
    pointLimit,
    formState,
  } = useForm(initialForm);

  const submitSetupForm = (e: FormEvent) => {
    e.preventDefault();
    console.log('SETUP');
    console.log(formState);
  };

  return (
    <>
      <form onSubmit={submitSetupForm}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p className="welcome-label">
              Bienvenido a la Rifa, por favor configura tu juego
            </p>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="¿Cuántos jugadores?"
              name="players"
              onChange={onInputChange}
              type="number"
              value={players}
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Valor por volada"
              name="kickOutValue"
              onChange={onInputChange}
              type="number"
              value={kickOutValue}
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Valor de entrada inicial del juego"
              name="entryValue"
              onChange={onInputChange}
              type="number"
              value={entryValue}
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tope de puntos"
              name="pointLimit"
              onChange={onInputChange}
              type="number"
              value={pointLimit}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
