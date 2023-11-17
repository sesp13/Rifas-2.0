import './App.css';
import { Grid, TextField } from '@mui/material';
// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { HeaderComponent } from './components/header/HeaderComponent';

function App() {
  return (
    <>
      <Grid container spacing={2}>
        <HeaderComponent />
        <Grid item xs={12}>
          <p style={{ textAlign: 'left' }}>
            Welcome to the rifas let's setup the game
          </p>
        </Grid>
        <Grid item>
          <TextField label="How many players?" variant="standard" />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
