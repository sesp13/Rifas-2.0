import { Button, Grid, TextField } from '@mui/material';
import { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState, updatePlayers } from '../../../store';
import { useDispatch } from 'react-redux';
import { FormValidation, useForm } from '../../../hooks/useForm';
import { Player } from '../../../interfaces';

export const SetupPlayersForm = () => {
  const dispatch = useDispatch();
  const { players } = useSelector((state: RootState) => state.game);
  const playersArray = Object.keys(players).map((key) => ({ ...players[key] }));

  const initialForm: Record<string, string> = {};
  const validations: FormValidation = {};

  playersArray.forEach((player) => {
    initialForm[player.id] = '';
    validations[player.id] = [
      (value) => value !== '' && value !== undefined,
      'El nombre del jugador no es válido',
    ];
  });

  const {
    formState,
    isFormValid,
    isFormValueValid,
    showFormValueInvalidMessage,
    onInputChange,
  } = useForm(initialForm, validations);

  const submitSetupPlayersForm = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      const playersToDispatch: Record<string, Player> = {};
      playersArray.forEach((player) => {
        playersToDispatch[player.id] = {
          ...players[player.id],
          name: formState[player.id],
        };
      });
      const action = updatePlayers(playersToDispatch);
      dispatch(action);
    }
  };

  return (
    <>
      <form aria-label='setup-players-form' onSubmit={submitSetupPlayersForm}>
        <Grid container spacing={2}>
          {playersArray.map((player, index) => (
            <Grid item xs={6} key={player.id}>
              <TextField
                label={`Jugador ${index + 1}`}
                name={player.id}
                type="text"
                fullWidth
                onChange={onInputChange}
                error={isFormValueValid(player.id)}
                helperText={showFormValueInvalidMessage(player.id)}
              />
            </Grid>
          ))}

          <Grid xs={12} item justifyContent={'center'}>
            <Button
              variant="contained"
              type="submit"
              aria-label="submit-btn"
              // disabled={!isFormValid}
            >
              Confirmar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
