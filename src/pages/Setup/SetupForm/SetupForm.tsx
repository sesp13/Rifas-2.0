import { Button, Grid, TextField } from '@mui/material';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { FormValidation, useForm } from '../../../hooks/useForm';
import { setupGame } from '../../../store';
import { isValidNumberAndGreaterThanZero } from '../../../helpers';
import { useNavigate } from 'react-router-dom';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialForm: initialSetUpFormType = {
    numberOfPlayers: 0,
    entryValue: 0,
    kickOutValue: 0,
    pointLimit: 0,
  };

  const {
    onInputChange,
    numberOfPlayers,
    kickOutValue,
    entryValue,
    pointLimit,
    isFormValid,
    isFormValueValid,
    showFormValueInvalidMessage,
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
      navigate('/players');
    }
  };

  return (
    <>
      <form aria-label="setup-form" onSubmit={submitSetupForm}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="¿Cuántos jugadores?"
              name="numberOfPlayers"
              onChange={onInputChange}
              type="number"
              variant="standard"
              error={isFormValueValid('numberOfPlayers')}
              helperText={showFormValueInvalidMessage('numberOfPlayers')}
              aria-label="numberOfPlayers"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Valor por volada"
              name="kickOutValue"
              onChange={onInputChange}
              type="number"
              variant="standard"
              error={isFormValueValid('kickOutValue')}
              helperText={showFormValueInvalidMessage('kickOutValue')}
              aria-label="kickOutValue"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Valor de entrada inicial del juego"
              name="entryValue"
              onChange={onInputChange}
              type="number"
              variant="standard"
              error={isFormValueValid('entryValue')}
              helperText={showFormValueInvalidMessage('entryValue')}
              aria-label="entryValue"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tope de puntos"
              name="pointLimit"
              onChange={onInputChange}
              type="number"
              variant="standard"
              error={isFormValueValid('pointLimit')}
              helperText={showFormValueInvalidMessage('pointLimit')}
              aria-label="pointLimit"
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
