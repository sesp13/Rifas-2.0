import './App.css';
import { Grid, Button } from '@mui/material';

function App() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Button variant="contained">Hola</Button>
          Rifas
        </Grid>
        <Grid item xs={4}>
          xs=4
        </Grid>
        <Grid item xs={4}>
          xs=4
        </Grid>
        <Grid item xs={8}>
          xs=8
        </Grid>
      </Grid>
    </>
  );
}

export default App;
