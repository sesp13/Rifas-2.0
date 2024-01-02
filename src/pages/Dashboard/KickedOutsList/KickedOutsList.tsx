import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useAppSelector } from '../../../hooks';

export const KickedOutsList = () => {
  const { kickedOuts, players } = useAppSelector((state) => state.game);
  const kickedOutsTitle =
    kickedOuts.length === 1 ? 'Este turno voló' : 'Este turno volaron';
  return (
    <Grid container aria-label="kicked-outs-panel">
      <Grid item xs={12}>
        <Typography>{kickedOutsTitle}</Typography>
      </Grid>
      <Grid item xs={12}>
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
                <ListItem key={key}>
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
