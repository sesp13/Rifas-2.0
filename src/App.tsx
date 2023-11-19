// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.scss';
import { HeaderComponent } from './components/header/HeaderComponent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppRoutes } from './AppRoutes';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <HeaderComponent />
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
