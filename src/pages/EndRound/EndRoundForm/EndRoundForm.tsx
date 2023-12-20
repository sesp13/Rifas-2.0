import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Player } from '../../../interfaces';

export const EndRoundForm = () => {
  const { players } = useSelector((state: RootState) => state.game);
  const playersArray: Player[] = Object.keys(players).map(
    (key) => players[key]
  );

  return (
    <form aria-label="end-round-form">
      <Grid container spacing={2}>
        {playersArray.map((player) => (
          <Grid item xs={6} key={player.id}>
            <TextField
              label={`Puntos de ${player.name}`}
              name={player.id}
              type="number"
              fullWidth
            />
            <FormControlLabel control={<Checkbox />} label={`${player.name} ganó la partida`} />
          </Grid>
        ))}
        <Grid xs={12} item justifyContent={'center'}>
          <Button variant="contained" type="submit" aria-label="submit-btn">
            Confirmar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
