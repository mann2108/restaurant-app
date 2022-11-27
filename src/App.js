import { createTheme, ThemeProvider } from '@mui/material';

import './style/index.css';
import Routes from './routes';

const darkTheme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 14,
    h2: {
      fontSize: 24,
      fontWeight: 700,
      color: "#ff9016",
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 700,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: "#ff9016",
      contrastText: "#fff"
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
