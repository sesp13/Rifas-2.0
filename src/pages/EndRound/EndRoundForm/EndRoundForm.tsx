import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, startEndRound } from '../../../store';
import { Player } from '../../../interfaces';
import { FormEvent, useState } from 'react';
import { FormValidation, useForm } from '../../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';

interface WinnersFormStructure {
  value: boolean;
  isDisabled: boolean;
}

export const EndRoundForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { players } = useSelector((state: RootState) => state.game);
  const playersArray: Player[] = Object.keys(players).map(
    (key) => players[key]
  );

  const initialForm: Record<string, string> = {};
  const validations: FormValidation = {};
  const initialWinnersForm: Record<string, WinnersFormStructure> = {};

  playersArray.forEach((player) => {
    initialForm[player.id] = '';
    validations[player.id] = [
      (value) => value !== '' && value !== undefined && !isNaN(value),
      'El puntaje del jugador no es válido',
    ];
    initialWinnersForm[player.id] = {
      value: false,
      isDisabled: false,
    };
  });

  const {
    formState,
    isFormValid,
    onInputChange,
    isFormValueValid,
    showFormValueInvalidMessage,
  } = useForm(initialForm, validations);

  const [winnersFormState, setWinnersForm] = useState(initialWinnersForm);

  const onWinnersInputFormChange = (playerId: string = '') => {
    const newWinnersFormState: Record<string, WinnersFormStructure> = {
      ...winnersFormState,
    };
    const isWinnerChecked: boolean = !newWinnersFormState[playerId].value;

    newWinnersFormState[playerId] = {
      value: isWinnerChecked,
      isDisabled: false,
    };

    if (isWinnerChecked) {
      // TODO Set this as a property in the state
      const WINNER_SCORE = -10;
      formState[playerId] = WINNER_SCORE.toString();
    }

    Object.keys(newWinnersFormState)
      .filter((key) => key !== playerId)
      .forEach((key) => {
        newWinnersFormState[key] = {
          ...newWinnersFormState[key],
          isDisabled: isWinnerChecked,
        };
      });

    setWinnersForm(newWinnersFormState);
  };

  const onSubmitEndRoundForm = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      const parsedFormState: Record<string, number> = {};
      Object.keys(formState).forEach((key) => {
        parsedFormState[key] = Number.parseInt(formState[key]);
      });

      dispatch(startEndRound(parsedFormState)).then(({ hasWinner }) => {
        if (hasWinner) {
          navigate('/winner');
        } else {
          navigate('/dashboard');
        }
      });
    }
  };

  return (
    <form aria-label="end-round-form" onSubmit={onSubmitEndRoundForm}>
      <Grid container spacing={2}>
        {playersArray.map((player) => (
          <Grid item xs={6} sm={12} key={player.id}>
            <TextField
              label={`Puntos de ${player.name}`}
              name={player.id}
              value={formState[player.id]}
              type="number"
              fullWidth
              onChange={onInputChange}
              error={isFormValueValid(player.id)}
              helperText={showFormValueInvalidMessage(player.id)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={winnersFormState[player.id].value}
                  disabled={winnersFormState[player.id].isDisabled}
                  name={player.id}
                  onChange={() => onWinnersInputFormChange(player.id)}
                />
              }
              label={`${player.name} ganó la partida`}
            />
          </Grid>
        ))}
        <Grid xs={12} item justifyContent={'center'}>
          <Button
            variant="contained"
            type="submit"
            aria-label="submit-btn"
            disabled={!isFormValid}
          >
            Confirmar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
