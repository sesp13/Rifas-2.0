import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
                  <ListItemIcon>
                    <CloseIcon />
                  </ListItemIcon>
                  <ListItemText primary={player.name} />
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};
