import { Button, Grid, TextField } from '@mui/material';
import { FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormValidation, useForm } from '../../../hooks/useForm';
import { RootState, setupGame } from '../../../store';
import { isValidNumberAndGreaterThanZero } from '../../../helpers';

interface initialSetUpFormType {
  numberOfPlayers: number;
  entryValue: number;
  kickOutValue: number;
  pointLimit: number;
}

const validations: FormValidation = {
  numberOfPlayers: [
    (value: number) => isValidNumberAndGreaterThanZero(value),
    'El numero de jugadores no es válido',
  ],
  entryValue: [
    (value: number) => isValidNumberAndGreaterThanZero(value),
    'El valor de entrada no es válido',
  ],
  kickOutValue: [
    (value: number) => isValidNumberAndGreaterThanZero(value),
    'El valor de volada no es válido',
  ],
  pointLimit: [
    (value: number) => isValidNumberAndGreaterThanZero(value),
    'El límite de puntos no es válido',
  ],
};

export const SetupForm = () => {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const initialForm: initialSetUpFormType = {
    numberOfPlayers: 2,
    entryValue: gameState.entryValue,
    kickOutValue: gameState.kickOutValue,
    pointLimit: gameState.pointLimit,
  };

  const {
    onInputChange,
    numberOfPlayers,
    kickOutValue,
    entryValue,
    pointLimit,
    isFormValid,
    formValidation,
  } = useForm(initialForm, validations);

  const submitSetupForm = (e: FormEvent) => {
    if (isFormValid) {
      e.preventDefault();
      const action = setupGame({
        entryValue,
        kickOutValue,
        pointLimit,
        numberOfPlayers,
      });
      dispatch(action);
    }
  };

  return (
    <>
      <form aria-label='setup-form' onSubmit={submitSetupForm}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="¿Cuántos jugadores?"
              name="numberOfPlayers"
              onChange={onInputChange}
              type="number"
              value={numberOfPlayers}
              variant="standard"
              error={formValidation['numberOfPlayersValid'] !== null}
              helperText={formValidation['numberOfPlayersValid']}
              aria-label='numberOfPlayers'
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
              error={formValidation['kickOutValueValid'] !== null}
              helperText={formValidation['kickOutValueValid']}
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
              error={formValidation['entryValueValid'] !== null}
              helperText={formValidation['entryValueValid']}
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
              error={formValidation['pointLimitValid'] !== null}
              helperText={formValidation['pointLimitValid']}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              aria-label="submit-btn"
              disabled={!isFormValid}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
