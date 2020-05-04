import React, { useState } from 'react';
import './App.css';

import { Button, Typography, Paper } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { darkTheme, lightTheme } from './theme';
import Nav from './components/Nav';
import Chat from './components/Chat';
import Chats from './components/Chats';
import Profile from './components/Profile';
import Settings from './components/Settings';

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Paper>
        <Typography variant="h3">Hello! </Typography>

        <Button variant="outlined"> Material-UI </Button>
      </Paper>
      <Router>
        <Nav />
        <Switch>
          <Route path="/chat" component={Chat} />
          <Route path="/chats" component={Chats} />
          <Route path="/profile" component={Profile} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
