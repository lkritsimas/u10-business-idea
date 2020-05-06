import React, { useState } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Button, Typography, Paper } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { darkTheme, lightTheme } from './theme';
import { ProfileCard } from './components/ProfileCard';
import Nav from './components/Nav';
import Chat from './components/Chat';
import Chats from './components/Chats';
import Profile from './components/Profile';
import Settings from './components/Settings';

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? lightTheme : darkTheme}>
      <Router>
        <Nav />
        <Switch>
          <Route path="/chat" component={Chat} />
          <Route path="/chats" component={Chats} />
          <Route path="/profile" component={Profile} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Router>
      <CssBaseline>
        <ProfileCard />
      </CssBaseline>
    </ThemeProvider>
  );
};
