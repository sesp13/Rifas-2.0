import { Button, Grid, TextField } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import './SetupPage.scss';
import { FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setupGame } from '../../store';

export const SetupPage = () => {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const initialForm = {
    numberOfPlayers: 2,
    entryValue: gameState.entryValue,
    kickOutValue: gameState.kickOutValue,
    pointLimit: gameState.pointLimit,
  };

  const { onInputChange, numberOfPlayers, kickOutValue, entryValue, pointLimit } =
    useForm(initialForm);

  const submitSetupForm = (e: FormEvent) => {
    e.preventDefault();
    const action = setupGame({ entryValue, kickOutValue, pointLimit, numberOfPlayers });
    dispatch(action);
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
              name="numberOfPlayers"
              onChange={onInputChange}
              type="number"
              value={numberOfPlayers}
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
