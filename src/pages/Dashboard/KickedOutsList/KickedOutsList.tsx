import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useAppSelector } from '../../../hooks';

export const KickedOutsList = () => {
  const { kickedOuts, players } = useAppSelector((state) => state.game);
  return (
    <Grid container aria-label='kicked-outs-panel'>
      <Grid item sm={12}>
        <Typography>Este turno Volaron</Typography>
      </Grid>
      <Grid item sm={12}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <List
            sx={{
              bgcolor: 'background.paper',
              width: 300,
            }}
          >
            {kickedOuts.map((key) => {
              const player = players[key];
              return (
                <ListItem>
                  <ListItemText
                    primary={player.name}
                    sx={{ textAlign: 'center' }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};
