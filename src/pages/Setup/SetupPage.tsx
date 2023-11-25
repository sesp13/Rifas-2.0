import { Button, Grid, TextField } from '@mui/material';
import { FormValidation, useForm } from '../../hooks/useForm';
import './SetupPage.scss';
import { FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setupGame } from '../../store';

interface initialFormType {
  numberOfPlayers: number;
  entryValue: number;
  kickOutValue: number;
  pointLimit: number;
}

const validNumberAndGreaterThanZero = (value: number) =>
  value !== undefined && value > 0;

const validations: FormValidation = {
  numberOfPlayers: [
    (value: number) => validNumberAndGreaterThanZero(value),
    'El numero de jugadores no es válido',
  ],
  entryValue: [
    (value: number) => validNumberAndGreaterThanZero(value),
    'El valor de entrada no es válido',
  ],
  kickOutValue: [
    (value: number) => validNumberAndGreaterThanZero(value),
    'El valor de volada no es válido',
  ],
  pointLimit: [
    (value: number) => validNumberAndGreaterThanZero(value),
    'El límite de puntos no es válido',
  ],
};

export const SetupPage = () => {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const initialForm: initialFormType = {
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
      <form id="setupForm" onSubmit={submitSetupForm}>
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
              error={formValidation['numberOfPlayersValid'] !== null}
              helperText={formValidation['numberOfPlayersValid']}
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
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
