import { Button, Grid, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Player } from '../../../interfaces';

export const SetupPlayersForm = () => {
  const { players } = useSelector((state: RootState) => state.game);

  return (
    <>
      <form>
        <Grid container spacing={2}>
          {players.map((player, index) => (
            <Grid item xs={6} key={player.id}>
              <TextField
                label={`Jugador ${index + 1}`}
                name={player.id}
                type='text'
                fullWidth
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
