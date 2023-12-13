import { Grid, Typography } from '@mui/material';
import { DashboardTable } from './DashboardTable/DashboardTable';
import { Player } from '../../interfaces';

const dummieData: Player[] = [
  {
    id: Math.random().toString(16).slice(2),
    name: 'Pablito',
    kickOuts: 0,
    points: 0,
  },
  {
    id: Math.random().toString(16).slice(2),
    name: 'Nico',
    kickOuts: 0,
    points: 0,
  },
  {
    id: Math.random().toString(16).slice(2),
    name: 'Seba',
    kickOuts: 0,
    points: 0,
  },
];

export const DashboardPage = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h4">Este turno reparte: Santiago</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4">Turno 5</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DashboardTable players={dummieData}></DashboardTable>
        </Grid>
      </Grid>
    </>
  );
};
