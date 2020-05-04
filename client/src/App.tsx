import React, { useState } from 'react';
import './App.css';
import { Button, Typography, Paper } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme, lightTheme } from './theme';
import Nav from './components/Nav';

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Paper>
        <Typography variant="h3">Hello! </Typography>

        <Button variant="outlined"> Material-UI </Button>
      </Paper>
      <Nav />
    </ThemeProvider>
  );
};

export default App;
